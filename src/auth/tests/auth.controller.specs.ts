import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { SiweStrategy } from '../strategies/siwe.strategy';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import constants from '../../utils/constants';
import { PrismaModule } from '../../prisma/prisma.module';
import { ethers } from 'ethers';
import { SiweGuard } from '../guards/siwe.guard';

describe('AuthController', () => {
	let controller: AuthController;
	let siweStrategy: SiweStrategy;
	const mockWallet = async () => {
		const provider = new ethers.providers.JsonRpcProvider(
			constants?.infura_url,
		);
		const wallet = new ethers.Wallet(constants?.private_key, provider);
		return wallet.getAddress();
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService, LocalStrategy, SiweStrategy],
			imports: [
				UsersModule,
				PassportModule,
				JwtModule.register({
					secret: constants?.jwt_secret,
					signOptions: { expiresIn: constants?.jwt_expiration_time },
				}),
				PrismaModule,
			],
		})
			.overrideGuard(SiweGuard)
			.useValue({
				canActivate: jest.fn().mockReturnValue(true),
			})
			.compile();

		controller = await module.get<AuthController>(AuthController);
		siweStrategy = await module.get<SiweStrategy>(SiweStrategy);
	});

	it('should ensure the JwtAuthGuard is applied to the user method', async () => {
		const guards = Reflect.getMetadata(
			'__guards__',
			AuthController.prototype.walletLogin,
		);
		const guard = new guards[0]();

		expect(guard).toBeInstanceOf(SiweGuard);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should be defined', () => {
		expect(siweStrategy).toBeDefined();
	});

	it('Wallet Address', async () => {
		const walletAddress = await mockWallet();
		const result = await controller.walletLogin(walletAddress);
		expect(walletAddress).toBe('0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06');
	});

	// it('Login with Wallet', async () => {

	// 	expect(await controller.walletLogin()).;
	// })

	describe('login', () => {
		it('should return the login result when authentication is successful', async () => {
			jest
				.spyOn(controller['authsService'], 'login')
				.mockResolvedValue({ access_token: 'mockAccessToken' });
			const mockRequest = { user: { id: 1, username: 'testUser' } };

			const result = await controller.login(mockRequest);
			console.log({ result });
			expect(result).toEqual({ access_token: 'mockAccessToken' });
		});
	});

	describe('WalletLogin', () => {
		it('should return the wallet login when authentication is successful', async () => {
			const mockRequest = {};
			jest
				.spyOn(controller['authsService'], 'walletLogin')
				.mockResolvedValue({ accessToken: 'mockAccessToken' });
			const result = await controller.walletLogin(mockRequest);
			console.log('this', { result });
			expect(result).toEqual({ accessToken: 'mockAccessToken' });
		});
	});
});
