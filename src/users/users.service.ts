import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Coin } from '@prisma/client';

@Injectable()
export class UserService {
  getAllUsers():
    | {
        id: number;
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
        balance: number;
      }[]
    | PromiseLike<
        {
          id: number;
          username: string;
          phoneNumber: string;
          email: string;
          password: string;
          balance: number;
        }[]
      > {
    throw new Error('Method not implemented.');
  }
  getUserById(arg0: number):
    | {
        id: number;
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
        balance: number;
      }
    | PromiseLike<{
        id: number;
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
        balance: number;
      }> {
    throw new Error('Method not implemented.');
  }
  createUser(UserDto: any):
    | {
        id: number;
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
        balance: number;
      }
    | PromiseLike<{
        id: number;
        username: string;
        phoneNumber: string;
        email: string;
        password: string;
        balance: number;
      }> {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  // Métodos del servicio aquí...

  async sendCoin(
    senderId: number,
    receiverId: number,
    message: string,
    amount: number,
  ): Promise<Coin> {
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
    });
    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!sender || !receiver) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (sender.balance < amount) {
      throw new Error('Saldo insuficiente');
    }

    const coin = await this.prisma.coin.create({
      data: {
        message,
        amount,
        senderId,
        receiverId,
      },
    });

    await this.prisma.user.update({
      where: { id: senderId },
      data: { balance: { decrement: amount } },
    });

    await this.prisma.user.update({
      where: { id: receiverId },
      data: { balance: { increment: amount } },
    });

    return coin;
  }

  async getCoinsByUserId(userId: number): Promise<Coin[]> {
    return this.prisma.coin.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    });
  }
}
