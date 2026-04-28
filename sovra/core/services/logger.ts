import winston from 'winston';

/**
 * logger (Institutional Telemetry Engine)
 * Mandate: Absolute transparency in agent maneuvers.
 * Standard: v2026.11_APEX
 */

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Institutional Audit Trail
    new winston.transports.File({ filename: 'logs/sovereign_audit.log' })
  ]
});

export default logger;
