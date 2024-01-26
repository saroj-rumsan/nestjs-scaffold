import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
	imports: [PassportModule],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService],
})
export class UsersModule {}
