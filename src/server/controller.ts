import config from "../config";
import WebSocket from "ws";

const ws = new WebSocket(`${config.WS_SERVER_URL}:${config.WS_SERVER_PORT}`);

ws.on("open", () => {
  console.log("[CONTROLLER] Connected to the server.");

  process.stdin.on("data", (data) => {
    const command = data.toString().trim();
    
    ws.send(command);
  });
});

console.log("Enter commands: START, STOP, RESTART");
