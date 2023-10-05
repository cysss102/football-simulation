import config from "../config";
import { Match } from "../types";
import WebSocket from "ws";

export class MatchSimulator {
  private interval: NodeJS.Timeout | null = null;
  private currentTime: number = 0;
  private matches: Match[] = this.createInitialMatches();
  private wss: WebSocket.Server;

  constructor(wss: WebSocket.Server) {
    this.wss = wss;
  }

  private createInitialMatches(): Match[] {
    return [
      {
        homeTeam: "Germany",
        awayTeam: "Poland",
        currentTime: 0,
        competition: "Friendly",
        score: { home: 0, away: 0 },
      },
      {
        homeTeam: "Brazil",
        awayTeam: "Mexico",
        currentTime: 0,
        competition: "Friendly",
        score: { home: 0, away: 0 },
      },
      {
        homeTeam: "Argentina",
        awayTeam: "Uruguay",
        currentTime: 0,
        competition: "Friendly",
        score: { home: 0, away: 0 },
      },
    ];
  }

  public start() {
    if (this.interval) clearInterval(this.interval);

    this.currentTime = 0;
    this.matches = this.createInitialMatches();

    this.interval = setInterval(() => {
      this.currentTime += config.TIME_UPDATE_MIN;
      const matchIndex = Math.floor(Math.random() * this.matches.length);
      const goalFor = Math.random() < 0.5 ? "home" : "away";

      this.matches[matchIndex].score[goalFor]++;
      this.matches[matchIndex].currentTime = this.currentTime;

      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(this.matches[matchIndex]));
        }
      });

      if (this.currentTime >= config.MAX_GAME_TIME_MIN) {
        this.stop();
      }
    }, config.SIMULATION_INTERVAL_MS);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  public restart() {
    this.stop();
    this.start();
  }
}
