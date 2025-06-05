import "dotenv/config";
import chalk from "chalk";

export const DATABASE_URL = process.env.DATABASE_URL;

export const NODE_ENV = process.env.NODE_ENV;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const HTTP_METHODS = {
  GET: chalk.green,
  POST: chalk.yellow,
  PUT: chalk.blue,
  PATCH: chalk.purple,
  DELETE: chalk.red,
  HEAD: chalk.cyan,
  OPTIONS: chalk.magenta,
};

export const STATUS_RANGES = [
  [500, chalk.bgRed.white],
  [400, chalk.bgYellow.black],
  [300, chalk.bgCyan.black],
  [200, chalk.bgGreen.black],
  [100, chalk.bgBlue.white],
  [0, chalk.bgGray.white],
];

export const FLAG_ICONS = {
  protect: "🔒",
  permission: "👤",
  admin: "👑",
  cache: "💾",
  rateLimit: "⏱️",
};

console.log({
  DATABASE_URL,
  NODE_ENV,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  HTTP_METHODS,
  STATUS_RANGES,
  FLAG_ICONS,
});
