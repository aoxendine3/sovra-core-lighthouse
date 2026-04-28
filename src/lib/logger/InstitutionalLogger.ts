import winston from 'winston';
import path from 'path';

/**
 * INSTITUTIONAL_LOGGER (v1.0_APEX)
 * ─────────────────────────────────────────────────────────────
 * MISSION: PROVIDE ABSOLUTE AUDIT INTEGRITY
 * Purpose: Centralized, verifiably grounded log distribution.
 */

const logDir = path.resolve(process.cwd(), 'logs');

export const InstitutionalLogger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'apex-sovereign-core' },
  transports: [
    // 1. Production Error Log (Persistent)
    new winston.transports.File({ 
        filename: path.join(logDir, 'error.log'), 
        level: 'error',
        maxsize: 10485760, // 10MB
        maxFiles: 30
    }),
    // 2. Full Audit Trail (Institutional Standard)
    new winston.transports.File({ 
        filename: path.join(logDir, 'audit.log'),
        maxsize: 20971520, // 20MB
        maxFiles: 90 // 90-day retention baseline
    }),
  ],
});

// 3. Command Core Console Output (Local Inference Overlay)
if (process.env.NODE_ENV !== 'production') {
  InstitutionalLogger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

/**
 * audit: Grounded event logging with standard metadata.
 */
export const audit = (level: string, activity: string, metadata: any = {}) => {
  InstitutionalLogger.log(level, activity, {
    ...metadata,
    timestamp: new Date().toISOString(),
    trace: 'v2026.11_APEX'
  });
};

export default InstitutionalLogger;
