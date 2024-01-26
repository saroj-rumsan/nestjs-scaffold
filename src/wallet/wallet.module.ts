import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { EthersModule } from '../shared/ethers/ethers.module';

@Module({
	controllers: [WalletController],
	providers: [WalletService],
	imports: [EthersModule],
})
export class WalletModule {}
