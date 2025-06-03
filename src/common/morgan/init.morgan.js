import chalk from "chalk";
import morgan from "morgan";
import { NODE_ENV, HTTP_METHODS, STATUS_RANGES, FLAG_ICONS } from "../constant/app.constant";

const isDev = NODE_ENV === "development";
const useColors = isDev && process.stdout.isTTY;

/**
 * Color HTTP method based on type
 * @param {string} method - HTTP method
 * @returns {string} Colored method string
 */
const colorMethod = (method) => {
  if (!useColors) return method;

  const colorFn = HTTP_METHODS[method?.toUpperCase()] || chalk.gray;
  return colorFn(method);
};

/**
 * Color status code based on HTTP status ranges
 * @param {string|number} code - HTTP status code
 * @returns {string} Colored status code
 */
const colorCode = (code) => {
  if (!useColors) return code;

  const statusCode = parseInt(code);
  if (isNaN(statusCode)) return chalk.bgGray.white(code);

  for (const [threshold, colorFn] of STATUS_RANGES) {
    if (statusCode >= threshold) {
      return colorFn(` ${code} `);
    }
  }
  return chalk.bgGray.white(` ${code} `);
};

/**
 * Format response size with appropriate units
 * @param {string} size - Response size in bytes
 * @returns {string} Formatted size string
 */
const formatSize = (size) => {
  if (!size || size === "-") return "-";

  const bytes = parseInt(size);
  if (isNaN(bytes)) return size;

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`;
  }
  return `${bytes}B`;
};

/**
 * Generate flags string based on request properties
 * @param {Object} req - Express request object
 * @returns {string} Formatted flags string
 */
const generateFlags = (req) => {
  const flags = [];

  if (req.isProtect) flags.push(`${FLAG_ICONS.protect} protect`);
  if (req.isCheckPermission) flags.push(`${FLAG_ICONS.permission} permission`);
  if (req.isAdmin) flags.push(`${FLAG_ICONS.admin} admin`);
  if (req.fromCache) flags.push(`${FLAG_ICONS.cache} cached`);
  if (req.rateLimited) flags.push(`${FLAG_ICONS.rateLimit} limited`);

  if (flags.length === 0) return "";

  const flagStr = flags.join(" | ");
  return useColors ? chalk.magenta(`[${flagStr}]`) : `[${flagStr}]`;
};

/**
 * Format timestamp
 * @returns {string} Formatted timestamp
 */
const formatTimestamp = () => {
  const now = new Date();
  if (isDev) {
    return now.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
  return now.toISOString();
};

/**
 * Format response time with color coding
 * @param {string} time - Response time in ms
 * @returns {string} Colored response time
 */
const formatResponseTime = (time) => {
  if (!time) return "-";

  const ms = parseFloat(time);
  if (isNaN(ms)) return time;

  if (!useColors) return `${time}ms`;

  if (ms > 1000) return chalk.red(`${time}ms`);
  if (ms > 500) return chalk.yellow(`${time}ms`);
  if (ms > 100) return chalk.blue(`${time}ms`);
  return chalk.green(`${time}ms`);
};

const logApi = morgan((tokens, req, res) => {
  const timestamp = formatTimestamp();
  const method = colorMethod(tokens.method(req, res));
  const status = colorCode(tokens.status(req, res));
  const url = tokens.url(req, res);
  const size = formatSize(tokens.res(req, res, "content-length"));
  const responseTime = formatResponseTime(tokens["response-time"](req, res));
  const flags = generateFlags(req);
  const userAgent = tokens["user-agent"](req, res);

  const parts = [
    useColors ? chalk.gray(timestamp) : timestamp,
    method,
    status,
    url,
    size,
    "-",
    responseTime,
  ];

  if (flags) parts.push(flags);

  if (isDev && userAgent && userAgent.length < 50) {
    parts.push(useColors ? chalk.dim(`"${userAgent}"`) : `"${userAgent}"`);
  }

  return parts.join(" ");
});

logApi.skip = (req, res) => {
  if (req.url === "/health" || req.url === "/ping") return true;

  if (
    !isDev &&
    /\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/i.test(req.url)
  ) {
    return true;
  }

  return false;
};

export default logApi;
