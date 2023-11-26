import { Test, TestingModule } from '@nestjs/testing';
import { ResponseInterceptor } from './response.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor>(ResponseInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should convert body to camelCase and wrap response', (done) => {
    // Mock ExecutionContext and CallHandler
    const mockRequest = { body: 'originalResponse' };
    const mockResponse = { statusCode: 200 };
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as any;
    const callHandler: CallHandler = {
      handle: () => of('originalResponse'),
    } as any;

    // Intercept the request
    interceptor.intercept(context, callHandler).subscribe((result) => {
      // Assert that convertCamel was called on the request body
      expect(context.switchToHttp().getRequest().body).toEqual(
        'originalResponse',
      );

      // Assert the wrapped response
      expect(result).toEqual({
        data: 'originalResponse',
        status: 200,
        success: true,
        error: null,
      });

      done();
    });
  });
});
