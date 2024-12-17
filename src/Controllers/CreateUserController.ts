import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserService } from "../Services/CreateUserService";
import prismaClient from "../prisma";
const CRYPTO_SECRET: any = process.env.CRYPTO_SECRET;
class CreateUserController {
  async handle(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, cpf, phoneNumber } = req.body as {
      name: string;
      email: string;
      password: string;
      cpf: string;
      phoneNumber: string;
    };

    const userFind = await prismaClient.users.findUnique({
      where: {
        email: email,
      },
    });

    if (userFind) {
      return reply.code(401).send({ message: "Invalid Credentials!" });
    }

    const userService = new CreateUserService();
    const user = await userService.execute({
      name,
      email,
      password,
      photo: '',
      cpf,
      phoneNumber
    });

    reply.send(user);
  }
}

export { CreateUserController };
