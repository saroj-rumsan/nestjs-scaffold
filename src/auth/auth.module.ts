import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import constants from '../utils/constants';
import { SiweStrategy } from './strategies/siwe.strategy';

@Module({
	controllers: [AuthController],
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: constants?.jwt_secret,
			signOptions: { expiresIn: constants?.jwt_expiration_time },
		}),
	],
	providers: [AuthService, LocalStrategy, SiweStrategy],
	exports: [AuthService],
})
export class AuthModule {}
