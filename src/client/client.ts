import config from "../config";
import WebSocket from "ws";
import { Match } from "../types";

const ws = new WebSocket(`${config.WS_SERVER_URL}:${config.WS_SERVER_PORT}`);

ws.on("open", () => {
  console.log("[CLIENT] Connected to the server.");
});

ws.on("message", (data: WebSocket.Data) => {
  const matchData = JSON.parse(data.toString()) as Match;
  
  console.log(matchData); // For example: save data to map, database etc.
  console.log(
    `[CLIENT] Received data for match ${matchData.homeTeam} vs ${matchData.awayTeam}`
  );
  console.log(`Current Time: ${matchData.currentTime} minutes`);
  console.log(`Score: ${matchData.score.home} - ${matchData.score.away}`);
  console.log("-------------------------------------");
});
