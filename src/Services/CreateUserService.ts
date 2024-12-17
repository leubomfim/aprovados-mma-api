import { convertPasswordToHash } from "../lib/hash";
import prismaClient from "../prisma";
interface CreateCustomerProps {
  name: string;
  email: string;
  password: string;
  photo: string;
  cpf: string;
  phoneNumber: string
}
class CreateUserService {
  async execute({ name, email, password, photo, cpf, phoneNumber }: CreateCustomerProps) {
    if (name.length <= 0 || email.length <= 0 || password.length <= 0) {
      throw new Error("Preencha todos os campos!");
    }

    const user = await prismaClient.users.create({
      data: {
        name,
        email,
        photo,
        password: await convertPasswordToHash(password),
        session: '',
        role: 'SuperMegaAprAdmin',
        cpf,
        credits: 0,
        phoneNumber,
        plan: 'default'
      },
    });
    return user;
  }
}

export { CreateUserService };
