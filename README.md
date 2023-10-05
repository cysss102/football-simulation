### Running the Application:

```
1. make build (Build the application)
2. make run-server (start the server)
3. make run-controller (start the controller)
4. make run-client (start the clien)
```
Within the `football-controller` container, type the command `START` to initiate the simulation. To stop the simulation, type `STOP`. To restart the simulation, type `RESTART`.

### Description:
```
server.ts: Manages the overall simulation logic.
controller.ts: Controls the simulation within the application by sending commands to the server.
client.ts: Listens to and receives information regarding the simulation.
```