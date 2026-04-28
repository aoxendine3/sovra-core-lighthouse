// src/lib/core/Logger.ts
/**
 * Central logging utility used across the core components.
 * Uses console for simplicity; can be swapped for winston or pino later.
 */

export class Logger {
  static info(message: string, ...meta: any[]) {
    console.info(`[INFO] ${message}`, ...meta);
  }

  static warn(message: string, ...meta: any[]) {
    console.warn(`[WARN] ${message}`, ...meta);
  }

  static error(message: string, ...meta: any[]) {
    console.error(`[ERROR] ${message}`, ...meta);
  }

  static debug(message: string, ...meta: any[]) {
    console.debug(`[DEBUG] ${message}`, ...meta);
  }
}
