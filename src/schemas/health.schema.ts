import { z } from 'zod';

export const healthCheckSchema = z.object({
  query: z.object({
    includeDetails: z.boolean().optional()
  })
});

export type HealthCheckQuery = z.infer<typeof healthCheckSchema>['query']; 