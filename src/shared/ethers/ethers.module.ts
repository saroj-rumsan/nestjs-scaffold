import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { EthersService } from './ethers.service';

@Module({
	providers: [
		{
			provide: 'Ethers',
			useFactory: (configService: ConfigService) => {
				const provider = new ethers.providers.JsonRpcProvider(
					configService.get('INFURA_URL'),
				);
				const signer = new ethers.Wallet(
					configService.get('PRIVATE_KEY'),
					provider,
				);
				return signer;
			},
			inject: [ConfigService],
		},
		EthersService,
	],

	exports: [EthersService],
})
export class EthersModule {}
