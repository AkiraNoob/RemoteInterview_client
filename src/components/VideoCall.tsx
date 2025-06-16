"use client";

import React from "react";
import useStreamingHook from "~/hook/useStreamingHook";

const VideoCall: React.FC = () => {
  const {
    roomId,
    setRoomId,
    isConnected,
    isInRoom,
    isMicMuted,
    isCameraOff,
    connectionId,
    isScreenSharing,
    localVideoRef,
    remoteStreams,
    getRemoteVideoRef,
    handleJoinRoom,
    handleLeaveRoom,
    toggleMic,
    toggleCamera,
    getScreenMedia,
  } = useStreamingHook();

  // --- Rendering Logic ---
  const remoteUserIds = Object.keys(remoteStreams);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-400">
        WebRTC Video Call
      </h1>
      {/* Controls */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            disabled={isInRoom}
            className="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            aria-label="Room ID"
          />
          {!isInRoom ? (
            <button
              onClick={handleJoinRoom}
              disabled={!roomId || !isConnected}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Room
            </button>
          ) : (
            <button
              onClick={handleLeaveRoom}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold"
            >
              Leave Room
            </button>
          )}
        </div>
        <p
          className="text-center text-sm text-gray-400 mb-2"
          aria-live="polite"
        >
          Status:{" "}
          {isConnected
            ? isInRoom
              ? `In Room: ${roomId} (ID: ${roomId?.substring(0, 6)}...)`
              : `Connected (ID: ${connectionId?.substring(0, 6)}...)`
            : "Disconnected"}
        </p>
        {/* Media Controls */}
        {isConnected && (
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={toggleMic}
              className={`px-4 py-2 rounded-md font-semibold ${
                isMicMuted
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              aria-pressed={isMicMuted}
            >
              {isMicMuted ? "Unmute Mic" : "Mute Mic"}
            </button>
            <button
              onClick={toggleCamera}
              disabled={isScreenSharing}
              className={`px-4 py-2 rounded-md font-semibold ${
                isCameraOff
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } disabled:opacity-50`}
              aria-pressed={isCameraOff}
            >
              {isCameraOff ? "Cam On" : "Cam Off"}
            </button>
            <button
              onClick={getScreenMedia}
              disabled={isCameraOff}
              className={`px-4 py-2 rounded-md font-semibold ${
                isScreenSharing
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-purple-600 hover:bg-purple-700"
              } disabled:opacity-50`}
              aria-pressed={isScreenSharing}
            >
              {isScreenSharing ? "Stop Share" : "Share Screen"}
            </button>
          </div>
        )}
      </div>
      {/* Video Grid */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Local Video */}
        <div className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg aspect-video">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${
              isCameraOff && !isScreenSharing ? "hidden" : ""
            }`}
          />
          {isCameraOff && !isScreenSharing && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-600">
              <span className="text-gray-400">Camera Off</span>
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <span>You</span> {isMicMuted && <span>(Mic Muted)</span>}{" "}
            {isCameraOff && !isScreenSharing && <span>(Cam Off)</span>}
          </div>
          {isScreenSharing && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
              Sharing Screen
            </div>
          )}
        </div>
        {/* Remote Videos */}
        {remoteUserIds.map((socketId) => (
          <div
            key={socketId}
            className="relative bg-gray-700 rounded-lg overflow-hidden shadow-lg aspect-video"
          >
            <video
              ref={getRemoteVideoRef(socketId)}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onError={(e) =>
                console.error(
                  `Video Error ${socketId}`,
                  (e.target as any)?.error
                )
              }
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              User ({socketId.substring(0, 6)}...)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
