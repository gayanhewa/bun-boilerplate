import { describe, expect, it } from 'bun:test';
import { Request, Response } from 'express';
import app from '../../index';

describe('Health Route', () => {
  it('should return health status', () => {
    const mockReq = {} as Request;
    const mockRes = {
      json: (data: Record<string, unknown>) => {
        expect(data).toEqual({
          status: 'ok',
          message: 'Server is healthy',
        });
      },
    } as Response;

    // Get the route handler directly
    const healthRoute = app._router.stack.find(
      (layer: { route?: { path: string } }) => layer.route?.path === '/api/health'
    );
    healthRoute.route.stack[0].handle(mockReq, mockRes);
  });
});
