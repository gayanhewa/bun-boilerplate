import { describe, expect, it } from 'bun:test';
import { Request, Response } from 'express';

describe('Health Route', () => {
  it('should return health status', () => {
    const mockReq = {} as Request;
    const mockRes = {
      json: (data: any) => {
        expect(data).toEqual({
          status: 'ok',
          message: 'Server is healthy'
        });
      }
    } as Response;

    // Import the route handler directly
    const { default: app } = require('../../index');
    const healthRoute = app._router.stack.find((layer: any) => layer.route?.path === '/api/health');
    healthRoute.route.stack[0].handle(mockReq, mockRes);
  });
}); 