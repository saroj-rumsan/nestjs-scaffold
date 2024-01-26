import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from '../../common/decorators/role.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

export function Auth(roles: Array<string>) {
	return applyDecorators(Roles(roles), UseGuards(AuthGuard, RoleGuard));
}
