import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SiweGuard extends AuthGuard('ethereum') {}
