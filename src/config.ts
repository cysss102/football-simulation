import dotenv from 'dotenv';

dotenv.config();

interface Config {
    WS_SERVER_URL: string;
    WS_SERVER_PORT: number;
    SIMULATION_INTERVAL_MS: number;
    MAX_GAME_TIME_MIN: number;
    TIME_UPDATE_MIN: number;
}

const config: Config = {
    WS_SERVER_URL: process.env.WS_SERVER_URL || 'ws://localhost',
    WS_SERVER_PORT: parseInt(process.env.WS_SERVER_PORT || '8080', 10),
    SIMULATION_INTERVAL_MS: parseInt(process.env.SIMULATION_INTERVAL_MS || '10000', 10),
    MAX_GAME_TIME_MIN: parseInt(process.env.MAX_GAME_TIME_MIN || '90', 10),
    TIME_UPDATE_MIN: parseInt(process.env.TIME_UPDATE_MIN || '10', 10),
};

export default config;
