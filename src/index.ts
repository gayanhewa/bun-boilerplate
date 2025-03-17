import express, { Request, Response } from 'express';
import { validate } from './middleware/validate.js';
import { healthCheckSchema, type HealthCheckQuery } from './schemas/health.schema.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Test route with validation
app.get('/api/health', validate(healthCheckSchema), (req: Request<{}, {}, {}, HealthCheckQuery>, res: Response) => {
  const response = {
    status: 'ok',
    message: 'Server is healthy'
  };

  if (req.query.includeDetails) {
    Object.assign(response, {
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  }

  res.json(response);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; 