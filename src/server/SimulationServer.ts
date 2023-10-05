import WebSocket from "ws";
import { MatchSimulator } from "./MatchSimulator";
import WebSocketServerSingleton from "./WebSocketServerSingleton";

export class SimulationServer {
  private wss: WebSocket.Server;
  private simulator: MatchSimulator;
  private simulationStatus: "IDLE" | "RUNNING" | "STOPPED" = "IDLE";

  private commands: { [key: string]: () => void } = {
    START: this.startSimulation.bind(this),
    STOP: this.stopSimulation.bind(this),
    RESTART: this.restartSimulation.bind(this),
  };

  constructor() {
    this.wss = WebSocketServerSingleton.getInstance();
    this.simulator = new MatchSimulator(this.wss);
    this.wss.on("connection", this.handleClientConnection.bind(this));
  }

  private handleClientConnection(ws: WebSocket) {
    console.log("[SIMULATION SERVER] New connection established.");

    ws.on("message", (data: WebSocket.Data) => {
      const message = data.toString().toUpperCase();
      this.handleCommand(message, ws);
      console.log(
        `[SIMULATION SERVER] Current Status: ${this.simulationStatus}`
      );
    });
  }

  private handleCommand(message: string, ws: WebSocket) {
    if (this.commands[message]) {
      this.commands[message]();
    } else {
      ws.send("Error: Unknown command.");

      console.log(`[SIMULATION SERVER] Unknown command received: ${message}`);
    }
  }

  private startSimulation() {
    if (this.isCommandValid("START")) {
      this.simulator.start();
      this.simulationStatus = "RUNNING";

      console.log("[SIMULATION SERVER] Simulation started.");
    }
  }

  private stopSimulation() {
    if (this.isCommandValid("STOP")) {
      this.simulator.stop();
      this.simulationStatus = "STOPPED";

      console.log("[SIMULATION SERVER] Simulation stopped.");
    }
  }

  private restartSimulation() {
    if (this.isCommandValid("RESTART")) {
      this.simulator.restart();
      this.simulationStatus = "RUNNING";

      console.log("[SIMULATION SERVER] Simulation restarted.");
    }
  }

  private isCommandValid(command: string): boolean {
    const errors: { [key: string]: string } = {
      START: "Error: Simulation is already running. Cannot use START again.",
      STOP: "Error: Only the RESTART command is allowed after STOP.",
      RESTART: "Error: Only the START command is allowed.",
    };

    if (
      (this.simulationStatus === "IDLE" && command !== "START") ||
      (this.simulationStatus === "RUNNING" && command === "START") ||
      (this.simulationStatus === "STOPPED" && command !== "RESTART")
    ) {
      console.log(errors[command]);

      return false;
    }

    return true;
  }
}

export default SimulationServer;
