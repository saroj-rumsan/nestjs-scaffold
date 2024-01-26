import { Test, TestingModule } from '@nestjs/testing';
import { SiweGuard } from '../guards/siwe.guard';
import { ContextType, ExecutionContext, Type } from '@nestjs/common';
import {
	HttpArgumentsHost,
	RpcArgumentsHost,
	WsArgumentsHost,
} from '@nestjs/common/interfaces';

class MockHttpContext implements HttpArgumentsHost {
	constructor(private readonly request: any) {}

	getRequest<T = any>() {
		return this.request as T;
		console.log(this.request);
	}

	getResponse<T = any>() {
		// Implement if needed
		return {} as T;
	}

	switchToWs() {
		// Implement if needed
	}

	getNext<T = any>() {
		// Implement if needed
		return {} as T;
	}
}

class MockExecutionContext implements ExecutionContext {
	constructor(private readonly request: any) {}
	getClass<T = any>(): Type<T> {
		throw new Error('Method not implemented.');
	}
	// eslint-disable-next-line @typescript-eslint/ban-types
	getHandler(): Function {
		throw new Error('Method not implemented.');
	}
	getArgs<T extends any[] = any[]>(): T {
		throw new Error('Method not implemented.');
	}
	getArgByIndex<T = any>(): T {
		throw new Error('Method not implemented.');
	}
	switchToRpc(): RpcArgumentsHost {
		throw new Error('Method not implemented.');
	}
	switchToWs(): WsArgumentsHost {
		throw new Error('Method not implemented.');
	}
	getType<TContext extends string = ContextType>(): TContext {
		throw new Error('Method not implemented.');
	}

	switchToHttp() {
		return new MockHttpContext(this.request);
	}
}

describe('SiweGuard', () => {
	let guard: SiweGuard;
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			providers: [SiweGuard],
		}).compile();

		guard = moduleFixture.get<SiweGuard>(SiweGuard);
	});

	it('Should be Defined', () => {
		expect(guard).toBeDefined();
	});

	it('Should return true for valid Authentication', () => {
		const MockRequest = {
			address: '0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06',
		};
		const mockExecutionContext = new MockExecutionContext(MockRequest);
		console.log(mockExecutionContext);
		expect(guard.canActivate(mockExecutionContext)).toEqual(true);
	});
});
