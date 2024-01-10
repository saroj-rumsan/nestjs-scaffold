import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		return this.validateRequest(request);
	}

	private validateRequest(request: any): boolean {
		if (request) {
			return true;
		}
	}
}
