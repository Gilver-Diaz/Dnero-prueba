import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { User as UserModel, Coin as CoinModel } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint para crear un usuario
  @Post()
  async createUser(@Body() UserDto): Promise<UserModel> {
    return this.userService.createUser(UserDto);
  }

  // Endpoint para obtener un usuario por ID
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.getUserById(Number(id));
  }

  // Endpoint para listar todos los usuarios
  @Get()
  async getAllUsers(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  // Endpoint para enviar una moneda de un usuario a otro
  @Post('send-coin')
  async sendCoin(
    @Body('senderId') senderId: number,
    @Body('receiverId') receiverId: number,
    @Body('message') message: string,
    @Body('amount') amount: number,
  ): Promise<CoinModel> {
    return this.userService.sendCoin(senderId, receiverId, message, amount);
  }

  // Endpoint para listar todas las monedas de un usuario
  @Get(':id/coins')
  async getCoinsByUserId(@Param('id') userId: string): Promise<CoinModel[]> {
    return this.userService.getCoinsByUserId(Number(userId));
  }
}
