"use client";

import { use, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Device } from "mediasoup-client";
import { Consumer, Producer, Transport, User } from "@/types";
import { useSearchParams } from "next/navigation";
import { RtpCapabilities, RtpCodecCapability } from "mediasoup-client/types";

export default function Room({
  params,
}: {
  params: Promise<{
    roomId: string;
    userId: string;
    userName: string;
  }>;
}) {
  const { roomId } = use(params);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName");

  const [socket, setSocket] = useState<Socket | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [consumers, setConsumers] = useState<Consumer[]>([]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [streams, setStreams] = useState<{ [key: string]: MediaStream }>({});

  useEffect(() => {
    console.log(transports);
  }, [transports]);

  // Connect to socket server when component mounts
  useEffect(() => {
    if (!roomId || !userId || !userName) return;

    const socketIo = io("http://localhost:3000");
    setSocket(socketIo);

    // Socket event handlers
    socketIo.on("connect", () => {
      console.log("Connected to socket server");
      joinRoom(socketIo);
    });

    socketIo.on("userJoined", (data: { userId: string; name: string }) => {
      console.log(`User joined: ${data.name}`);
      setRoomUsers((prev) => [...prev, { id: data.userId, name: data.name }]);
    });

    socketIo.on("userLeft", (data: { userId: string }) => {
      console.log(`User left: ${data.userId}`);
      setRoomUsers((prev) => prev.filter((user) => user.id !== data.userId));

      // Remove any consumers associated with this user
      setConsumers((prev) => {
        const filtered = prev.filter(
          (consumer) => consumer.userId !== data.userId
        );
        return filtered;
      });

      // Update streams
      setStreams((prev) => {
        const newStreams = { ...prev };
        delete newStreams[data.userId];
        return newStreams;
      });
    });

    socketIo.on(
      "newProducer",
      async (data: {
        producerId: string;
        userId: string;
        kind: "audio" | "video";
        appData: any;
      }) => {
        console.log(
          `New producer: ${data.producerId} kind: ${data.kind} from user: ${data.userId}`
        );
        if (data.userId === userId) return; // Skip if it's our own producer
        consumeTrack(socketIo, data.producerId, data.userId, data.kind);
      }
    );

    socketIo.on(
      "producerPaused",
      (data: { producerId: string; userId: string }) => {
        console.log(`Producer paused: ${data.producerId}`);
        // Handle producer paused - could update UI to show muted state
      }
    );

    socketIo.on(
      "producerResumed",
      (data: { producerId: string; userId: string }) => {
        console.log(`Producer resumed: ${data.producerId}`);
        // Handle producer resumed - could update UI to show unmuted state
      }
    );

    socketIo.on("consumerClosed", (data: { consumerId: string }) => {
      console.log(`Consumer closed: ${data.consumerId}`);
      setConsumers((prev) =>
        prev.filter((consumer) => consumer.id !== data.consumerId)
      );
    });

    return () => {
      // Clean up on component unmount
      producers.forEach((p) => p.producer.close());
      consumers.forEach((c) => c.consumer.close());
      transports.forEach((t) => t.transport.close());
      socketIo.disconnect();
    };
  }, [roomId, userId, userName]);

  // Join room function
  const joinRoom = async (socketIo: Socket) => {
    socketIo.emit(
      "joinRoom",
      {
        roomId,
        userId,
        name: userName,
      },
      async (response: {
        roomId: string;
        users: {
          id: string;
          name: string;
        }[];
        routerRtpCapabilities: RtpCapabilities;
        error?: string;
      }) => {
        if (response.error) {
          console.error("Error joining room:", response.error);
          return;
        }

        console.log("Joined room:", response);
        setRoomUsers(response.users || []);

        // Initialize mediasoup device
        await initializeDevice(socketIo, response.routerRtpCapabilities);
      }
    );
  };

  // Initialize mediasoup device
  const initializeDevice = async (
    socketIo: Socket,
    routerRtpCapabilities: any
  ) => {
    try {
      // Create a new mediasoup device
      const newDevice = new Device();

      // Load the device with router's RTP capabilities
      await newDevice.load({ routerRtpCapabilities });
      setDevice(newDevice);

      // Create send and receive transports
      await createSendTransport(socketIo, newDevice);
      await createReceiveTransport(socketIo, newDevice);

      setIsConnected(true);
    } catch (error) {
      console.error("Error initializing device:", error);
    }
  };

  // Create send transport
  const createSendTransport = async (socketIo: Socket, device: Device) => {
    socketIo.emit(
      "createTransport",
      {
        direction: "send",
        userId,
        roomId,
      },
      async (response: any) => {
        if (response.error) {
          console.error("Error creating send transport:", response.error);
          return;
        }

        try {
          const sendTransport = device!.createSendTransport({
            id: response.transportId,
            iceParameters: response.iceParameters,
            iceCandidates: response.iceCandidates,
            dtlsParameters: response.dtlsParameters,
            iceServers: [],
          });

          // Store transport
          setTransports((prev) => [
            ...prev,
            {
              id: response.transportId,
              direction: "send",
              transport: sendTransport,
            },
          ]);

          console.log("send", sendTransport);

          // Handle transport connection events
          sendTransport.on(
            "connect",
            ({ dtlsParameters }, callback, errback) => {
              socketIo.emit(
                "connectTransport",
                {
                  transportId: sendTransport.id,
                  dtlsParameters,
                  userId,
                },
                (response: any) => {
                  if (response.error) {
                    errback(response.error);
                    return;
                  }
                  callback();
                }
              );
            }
          );

          sendTransport.on(
            "produce",
            async ({ kind, rtpParameters, appData }, callback, errback) => {
              socketIo.emit(
                "produceTrack",
                {
                  transportId: sendTransport.id,
                  kind,
                  rtpParameters,
                  appData,
                  userId,
                },
                (response: any) => {
                  if (response.error) {
                    errback(response.error);
                    return;
                  }
                  callback({ id: response.producerId });
                }
              );
            }
          );

          // Automatically get user media and produce tracks
          await getLocalMediaAndProduce(sendTransport);
        } catch (error) {
          console.error("Error setting up send transport:", error);
        }
      }
    );
  };

  // Create receive transport
  const createReceiveTransport = async (socketIo: Socket, device: Device) => {
    socketIo.emit(
      "createTransport",
      {
        direction: "receive",
        userId,
        roomId,
      },
      async (response: any) => {
        if (response.error) {
          console.error("Error creating receive transport:", response.error);
          return;
        }

        try {
          const receiveTransport = device!.createRecvTransport({
            id: response.transportId,
            iceParameters: response.iceParameters,
            iceCandidates: response.iceCandidates,
            dtlsParameters: response.dtlsParameters,
            iceServers: [],
          });

          // Store transport
          setTransports((prev) => [
            ...prev,
            {
              id: response.transportId,
              direction: "receive",
              transport: receiveTransport,
            },
          ]);

          console.log("receive", receiveTransport);

          // Handle transport connection events
          receiveTransport.on(
            "connect",
            ({ dtlsParameters }, callback, errback) => {
              socketIo.emit(
                "connectTransport",
                {
                  transportId: receiveTransport.id,
                  dtlsParameters,
                  userId,
                },
                (response: any) => {
                  if (response.error) {
                    errback(response.error);
                    return;
                  }
                  callback();
                }
              );
            }
          );
        } catch (error) {
          console.error("Error setting up receive transport:", error);
        }
      }
    );
  };

  // Get user media and produce tracks
  const getLocalMediaAndProduce = async (sendTransport: any) => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // Display local video
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Get tracks
      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];

      // Produce audio
      if (audioTrack) {
        const audioProducer = await sendTransport.produce({
          track: audioTrack,
          codecOptions: {
            opusStereo: true,
            opusDtx: true,
          },
          appData: {
            mediaTag: "audio",
          },
        });

        setProducers((prev) => [
          ...prev,
          { id: audioProducer.id, kind: "audio", producer: audioProducer },
        ]);

        audioProducer.on("transportclose", () => {
          console.log("Audio producer transport closed");
        });
      }

      // Produce video
      if (videoTrack) {
        const videoProducer = await sendTransport.produce({
          track: videoTrack,
          codecOptions: {
            videoGoogleStartBitrate: 1000,
          },
          appData: {
            mediaTag: "video",
          },
        });

        setProducers((prev) => [
          ...prev,
          { id: videoProducer.id, kind: "video", producer: videoProducer },
        ]);

        videoProducer.on("transportclose", () => {
          console.log("Video producer transport closed");
        });
      }
    } catch (error) {
      console.error("Error getting user media or producing tracks:", error);
    }
  };

  // Consume track from another user
  const consumeTrack = async (
    socketIo: Socket,
    producerId: string,
    producerUserId: string,
    kind: "audio" | "video"
  ) => {
    console.log(transports);

    // Find receive transport
    const receiveTransport = transports.find(
      (t) => t.direction === "receive"
    )?.transport;
    if (!receiveTransport) {
      console.error("No receive transport found");
      return;
    }

    // Request to consume the track
    socketIo.emit(
      "consumeTrack",
      {
        producerId,
        rtpCapabilities: device!.rtpCapabilities,
        userId,
        roomId,
      },
      async (response: any) => {
        if (response.error) {
          console.error("Error consuming track:", response.error);
          return;
        }

        try {
          // Create consumer
          const consumer = await receiveTransport.consume({
            id: response.consumerId,
            producerId: response.producerId,
            kind: response.kind,
            rtpParameters: response.rtpParameters,
          });

          // Store consumer
          setConsumers((prev) => [
            ...prev,
            {
              id: response.consumerId,
              producerId: response.producerId,
              userId: producerUserId,
              kind: response.kind,
              consumer,
            },
          ]);

          // Create a new MediaStream and add the consumer's track to it
          const stream = new MediaStream([consumer.track]);

          // Update streams state
          setStreams((prev) => ({
            ...prev,
            [producerUserId]: prev[producerUserId]
              ? new MediaStream([
                  ...prev[producerUserId].getTracks(),
                  consumer.track,
                ])
              : stream,
          }));

          // Resume consumer
          socketIo.emit("resumeConsumer", {
            consumerId: consumer.id,
            userId,
          });
        } catch (error) {
          console.error("Error creating consumer:", error);
        }
      }
    );
  };

  // Toggle mute audio
  const toggleAudio = () => {
    const audioProducer = producers.find((p) => p.kind === "audio");
    if (!audioProducer) return;

    if (audioProducer.producer.paused) {
      socket?.emit(
        "resumeProducer",
        {
          producerId: audioProducer.id,
          userId,
        },
        () => {
          audioProducer.producer.resume();
        }
      );
    } else {
      socket?.emit(
        "pauseProducer",
        {
          producerId: audioProducer.id,
          userId,
        },
        () => {
          audioProducer.producer.pause();
        }
      );
    }
  };

  // Toggle mute video
  const toggleVideo = () => {
    const videoProducer = producers.find((p) => p.kind === "video");
    if (!videoProducer) return;

    if (videoProducer.producer.paused) {
      socket?.emit(
        "resumeProducer",
        {
          producerId: videoProducer.id,
          userId,
        },
        () => {
          videoProducer.producer.resume();
        }
      );
    } else {
      socket?.emit(
        "pauseProducer",
        {
          producerId: videoProducer.id,
          userId,
        },
        () => {
          videoProducer.producer.pause();
        }
      );
    }
  };

  // Remote user video component
  const RemoteVideo = ({
    stream,
    userName,
  }: {
    stream: MediaStream;
    userName: string;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }, [stream]);

    return (
      <div>
        <video ref={videoRef} autoPlay playsInline />
        <div>{userName}</div>
      </div>
    );
  };

  if (!isConnected) {
    return <div>Connecting to room...</div>;
  }

  return (
    <div>
      <h1>Room: {roomId}</h1>

      <div>
        <h2>Your Video</h2>
        <video ref={localVideoRef} autoPlay playsInline muted />
        <div>
          <button onClick={toggleAudio}>Toggle Audio</button>
          <button onClick={toggleVideo}>Toggle Video</button>
        </div>
      </div>

      <div>
        <h2>Participants ({roomUsers.length})</h2>
        {roomUsers.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            {streams[user.id] && (
              <RemoteVideo stream={streams[user.id]} userName={user.name} />
            )}
          </div>
        ))}
      </div>

      {/* <button onClick={() => router.push("/")}>Leave Room</button> */}
    </div>
  );
}
