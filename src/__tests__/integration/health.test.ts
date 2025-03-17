import { describe, expect, it, beforeAll, afterAll } from 'bun:test';
import supertest from 'supertest';
import app from '../../index';

describe('Health API Integration', () => {
  const request = supertest(app);

  it('should return basic health status', async () => {
    const response = await request.get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'Server is healthy'
    });
  });

  it('should return detailed health status when includeDetails is true', async () => {
    const response = await request.get('/api/health?includeDetails=true');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'ok',
      message: 'Server is healthy',
      timestamp: expect.any(String),
      uptime: expect.any(Number)
    });
  });

  it('should return 400 when includeDetails is not a boolean', async () => {
    const response = await request.get('/api/health?includeDetails=invalid');
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: 'error',
      message: 'Validation failed',
      errors: expect.arrayContaining([
        expect.objectContaining({
          field: 'query.includeDetails',
          message: expect.any(String)
        })
      ])
    });
  });
}); 