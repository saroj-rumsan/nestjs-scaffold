import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interface';

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	intercept(
		_context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> | Promise<Observable<Response<T>>> {
		return next.handle().pipe(map((data) => ({ data })));
	}
}
