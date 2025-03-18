import express from 'express';
import { validate } from './middleware/validate.js';
import { healthCheckSchema } from './schemas/health.schema.js';
import { HealthHandler } from './handlers/health.handler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Test route with validation
app.get('/api/health', validate(healthCheckSchema), HealthHandler.check);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
