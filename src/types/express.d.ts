import { HealthCheckQuery } from '../schemas/health.schema.js';

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: HealthCheckQuery;
    }
  }
}

export {};
