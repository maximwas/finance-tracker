import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { PrismaService } from '../prisma/prisma.service';
import { UserInput } from './dto/user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
}
