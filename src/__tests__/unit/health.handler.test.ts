import { describe, expect, it, mock, beforeEach } from 'bun:test';
import { Request, Response } from 'express';
import { HealthHandler } from '../../handlers/health.handler.js';
import { HealthCheckQuery } from '../../schemas/health.schema.js';

describe('HealthHandler', () => {
  describe('check', () => {
    const mockJson = mock(() => {});
    const mockRes = {
      json: mockJson,
    } as unknown as Response;

    beforeEach(() => {
      mockJson.mockClear();
    });

    it('should return basic health status when no includeDetails provided', () => {
      const mockReq = {
        validatedQuery: undefined,
      } as unknown as Request;

      HealthHandler.check(mockReq, mockRes);

      expect(mockJson).toHaveBeenCalledWith({
        status: 'ok',
        message: 'Server is healthy',
      });
    });

    it('should return basic health status when includeDetails is false', () => {
      const mockReq = {
        validatedQuery: {
          includeDetails: false,
        } as HealthCheckQuery,
      } as unknown as Request;

      HealthHandler.check(mockReq, mockRes);

      expect(mockJson).toHaveBeenCalledWith({
        status: 'ok',
        message: 'Server is healthy',
      });
    });

    it('should return detailed health status when includeDetails is true', () => {
      const mockReq = {
        validatedQuery: {
          includeDetails: true,
        } as HealthCheckQuery,
      } as unknown as Request;

      HealthHandler.check(mockReq, mockRes);

      const response = mockJson.mock.calls[0][0];
      expect(response).toMatchObject({
        status: 'ok',
        message: 'Server is healthy',
        timestamp: expect.any(String),
        uptime: expect.any(Number),
      });
    });
  });
});
