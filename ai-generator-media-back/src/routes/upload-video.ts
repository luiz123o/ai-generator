import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import fastifyMultipart from "@fastify/multipart";
import path from "node:path";
import fs from "node:fs";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 10_000_000 * 25, //25mb
    },
  });
  app.post("/videos", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ message: "No file uploaded" });
    }
    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return reply.status(400).send({ message: "Invalid file type" });
    }

    const fileBaseName = path.basename(data.filename, extension);

    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

    const uploadDestination = path.resolve(
      __dirname,
      "../../tmp",
      fileUploadName
    );
    await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    });

    return {
      video,
    };
  });
}
