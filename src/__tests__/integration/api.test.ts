import { describe, expect, it } from 'bun:test';
import supertest from 'supertest';
import app from '../../index.js';

interface TestInput {
  value: string | boolean;
  shouldIncludeDetails: boolean;
}

describe('API Integration Tests', () => {
  const request = supertest(app);

  describe('GET /api/health', () => {
    const validInputs: TestInput[] = [
      { value: 'true', shouldIncludeDetails: true },
      { value: 'false', shouldIncludeDetails: false },
      { value: '1', shouldIncludeDetails: true },
      { value: '0', shouldIncludeDetails: false },
      { value: true, shouldIncludeDetails: true },
      { value: false, shouldIncludeDetails: false },
    ];

    it.each(validInputs)(
      'should handle includeDetails=$value correctly',
      async ({ value, shouldIncludeDetails }: TestInput) => {
        const response = await request.get(`/api/health?includeDetails=${value}`);
        expect(response.status).toBe(200);

        const expectedResponse = {
          status: 'ok',
          message: 'Server is healthy',
        };

        if (shouldIncludeDetails) {
          Object.assign(expectedResponse, {
            timestamp: expect.any(String),
            uptime: expect.any(Number),
          });
        }

        expect(response.body).toMatchObject(expectedResponse);
      }
    );

    const invalidInputs: string[] = ['invalid', '2', 'yes', 'no', 'on', 'off'];

    it.each(invalidInputs)('should reject invalid includeDetails=$value', async (value: string) => {
      const response = await request.get(`/api/health?includeDetails=${value}`);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({
        status: 'error',
        message: 'Validation failed',
        errors: expect.arrayContaining([
          expect.objectContaining({
            field: 'query.includeDetails',
            message: 'includeDetails must be true, false, 1, 0, "true", or "false"',
          }),
        ]),
      });
    });

    it('should return basic health status when no includeDetails provided', async () => {
      const response = await request.get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'ok',
        message: 'Server is healthy',
      });
    });

    it('should handle multiple query parameters correctly', async () => {
      const response = await request.get('/api/health?includeDetails=true&other=value');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'ok',
        message: 'Server is healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
      });
    });

    // TODO: Fix this test
    it.skip('should handle URL-encoded values correctly', async () => {
      const response = await request.get('/api/health?includeDetails=%22true%22');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        status: 'ok',
        message: 'Server is healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
      });
    });
  });
});
