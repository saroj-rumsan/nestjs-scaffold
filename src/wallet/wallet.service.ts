import { Injectable } from '@nestjs/common';
import { EthersService } from '../shared/ethers/ethers.service';

@Injectable()
export class WalletService {
	constructor(private readonly ethers: EthersService) {}

	async getBalance() {
		return this.ethers.getBalance();
	}

	async setTransfer(toWallet: string, value: number) {
		return this.ethers.transfer(toWallet, value);
	}
}
