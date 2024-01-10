import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<string[]>(Roles, context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context?.switchToHttp().getRequest();
		const userRoles = request?.body?.role;
		return !this.matchRoles(roles, userRoles);
	}

	private matchRoles(roles: string[], userRoles: string): boolean {
		console.log(roles.includes(userRoles));
		return !roles.includes(userRoles);
	}
}
