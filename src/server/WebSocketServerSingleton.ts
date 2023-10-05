import WebSocket from "ws";
import config from "../config";

class WebSocketServerSingleton {
  private static instance: WebSocket.Server;

  private constructor() {}

  public static getInstance(): WebSocket.Server {
    if (!WebSocketServerSingleton.instance) {
      WebSocketServerSingleton.instance = new WebSocket.Server({
        port: config.WS_SERVER_PORT,
      });

      console.log(
        `[SIMULATION SERVER] Server is running on ${config.WS_SERVER_URL}:${config.WS_SERVER_PORT}`
      );
    }
    return WebSocketServerSingleton.instance;
  }
}

export default WebSocketServerSingleton;
