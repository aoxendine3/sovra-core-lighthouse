// src/lib/core/CircuitBreaker.ts
import { Logger } from './Logger';

export enum State {
  CLOSED,
  OPEN,
  HALF_OPEN,
}

export class CircuitBreaker {
  private state: State = State.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime?: number;
  private readonly threshold: number;
  private readonly timeout: number;

  constructor(threshold: number = 5, timeout: number = 10000) {
    this.threshold = threshold;
    this.timeout = timeout;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === State.OPEN) {
      if (Date.now() - (this.lastFailureTime || 0) > this.timeout) {
        this.state = State.HALF_OPEN;
        Logger.info('CircuitBreaker: HALF_OPEN');
      } else {
        throw new Error('CircuitBreaker: OPEN');
      }
    }

    try {
      const result = await fn();
      if (this.state === State.HALF_OPEN) {
        this.success();
      }
      return result;
    } catch (error) {
      this.fail();
      throw error;
    }
  }

  private success() {
    this.state = State.CLOSED;
    this.failureCount = 0;
    Logger.info('CircuitBreaker: CLOSED');
  }

  private fail() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.threshold) {
      this.state = State.OPEN;
      Logger.warn('CircuitBreaker: OPEN');
    }
  }
}
