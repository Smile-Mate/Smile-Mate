// import { HumeClient } from 'hume';
// import { StreamSocket } from 'hume/wrapper/expressionMeasurement/streaming/StreamSocket';
import { NextRequest, NextResponse } from 'next/server';

// 싱글톤 패턴을 사용하여 웹소켓 연결 관리
// class HumeSocketManager {
//   private static instance: HumeSocketManager;
//   private humeClient: HumeClient;
//   private socket?: StreamSocket; // 실제 타입은 StreamSocket 등으로 지정할 수 있습니다
//   private isConnected: boolean = false;

//   private constructor() {
//     this.humeClient = new HumeClient({
//       apiKey: process.env.NEXT_PUBLIC_HUME_API_KEY!,
//     });
//   }

//   public static getInstance(): HumeSocketManager {
//     if (!HumeSocketManager.instance) {
//       HumeSocketManager.instance = new HumeSocketManager();
//     }
//     return HumeSocketManager.instance;
//   }

//   public async getSocket() {
//     if (!this.isConnected || !this.socket) {
//       this.socket = this.humeClient.expressionMeasurement.stream.connect({
//         config: {
//           facemesh: {},
//         },
//       });
//       this.isConnected = true;
//     }
//     return this.socket;
//   }

//   public async sendFacemesh(landmarks: number[][][]) {
//     const socket = await this.getSocket();
//     const result = await socket.sendFacemesh({ landmarks: landmarks, config: { facemesh: {} } });
//     return result;
//   }
// }

export async function POST(req: NextRequest) {
  // NOTE HumeAI의 sendFacemesh 함수가 아직 미완성인것 같다. 도큐먼트에도 없고.. client에서 batch 로 시도해보자
  try {
    // const { message } = await req.json();
    // console.log('message:', JSON.stringify(message));
    // console.log('message:', message);

    // const socketManager = HumeSocketManager?.getInstance();
    // const humeResponse = await socketManager.sendFacemesh(message);
    console.log('req:', req);

    return NextResponse.json({});
    // return NextResponse.json({ humeResponse });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
