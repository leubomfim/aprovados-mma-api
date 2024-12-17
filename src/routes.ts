import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import prismaClient from "./prisma";
// import { ListUsersController } from "./controllers/ListCustomersController";
// import { DeleteUserController } from "./controllers/DeleteUserController";
// import { UpdateUserController } from "./controllers/UpdateUserController";
import { CreateUserController } from "./Controllers/CreateUserController";
// import { CreateProductController } from "./controllers/CreateProductController";
// import { ProductGetController } from "./controllers/ProductsGetController";
import { LoginController } from "./Controllers/LoginController";
import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { GetUsersController } from "./controllers/GetUserController";
import { r2 } from "./lib/cloudflare";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
export async function routes(
  fastify: FastifyInstance,
  option: FastifyPluginOptions
) {
  fastify.get(
    "/",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const ques = await prismaClient.users.findMany()
      reply.code(200).send(ques);
    }
  ),
  fastify.post(
    "/uploads",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: 'bucket-name',
          Key: 'file.mp4',
          ContentType: 'video/mp4'
        }), {
          expiresIn: 300
        }
      )

      return signedUrl
    }
  ),
  fastify.post(
    "/api/createNewUser",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(req, reply);
    }
  ),
  fastify.post(
    "/api/login",
    async (req: FastifyRequest, reply: FastifyReply) => {
      return new LoginController().handle(req, reply);
    }
  );
  // fastify.post(
  //   "/api/createProduct",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new CreateProductController().handle(req, reply);
  //   }
  // );

  // fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
  //   return reply.send({ ok: "OK" });
  // });

  // fastify.get(
  //   "/api/users",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new ListUsersController().handle(req, reply);
  //   }
  // );
  // fastify.get(
  //   "/api/getUserProfile",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new GetUsersController().handle(req, reply);
  //   }
  // );

  // fastify.get(
  //   "/api/products",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new ProductGetController().handle(req, reply);
  //   }
  // );

  // fastify.delete(
  //   "/api/deleteUser",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new DeleteUserController().handle(req, reply);
  //   }
  // );

  // fastify.put(
  //   "/api/updateUser",
  //   async (req: FastifyRequest, reply: FastifyReply) => {
  //     return new UpdateUserController().handle(req, reply);
  //   }
  // );
}
