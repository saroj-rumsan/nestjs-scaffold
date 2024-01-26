import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BigNumber, Wallet, utils } from 'ethers';
@Injectable()
export class EthersService {
	constructor(@Inject('Ethers') private readonly ethers: Wallet) {}

	async getBalance() {
		try {
			const balanceInWei: BigNumber = await this.ethers.getBalance();
			const balanceInEther: string = utils.formatEther(balanceInWei);
			return balanceInEther;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async transfer(toWallet: string, value: number) {
		try {
			if (!utils.isAddress(toWallet)) {
				throw new Error('Invalid Ethereum Address');
			}
			const transaction = {
				to: toWallet,
				value: utils.parseEther(value.toString()),
			};
			const signedTransaction = await this.ethers.sendTransaction(transaction);
			await signedTransaction.wait();

			console.log('Transaction Hash:', signedTransaction.hash);
			return { msg: 'Transaction Successful' };
		} catch (error) {
			console.error('Error During Transfer', error.message);
			throw new BadRequestException();
		}
	}
}
