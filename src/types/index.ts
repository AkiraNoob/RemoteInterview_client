export interface User {
  id: string;
  name: string;
}

export interface Transport {
  id: string;
  direction: "send" | "receive";
  transport: any;
}

export interface Producer {
  id: string;
  kind: "audio" | "video";
  producer: any;
}

export interface Consumer {
  id: string;
  producerId: string;
  userId: string;
  kind: "audio" | "video";
  consumer: any;
}
