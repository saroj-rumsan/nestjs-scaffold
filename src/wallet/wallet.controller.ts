import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('wallet')
export class WalletController {
	constructor(private readonly walletService: WalletService) {}

	@Get()
	@Public()
	async getBalance() {
		return this.walletService.getBalance();
	}

	@Post()
	async setTransfer(
		@Body('toWallet') toWallet: string,
		@Body('value') value: number,
	) {
		return this.walletService.setTransfer(toWallet, value);
	}
}
