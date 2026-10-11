import app from "./app.js";
import { PORT } from "./config/index.js";
import prisma from "./lib/prisma.js";

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const shutdown = async (signal: NodeJS.Signals) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

  setTimeout(async () => {
    console.error("Graceful shutdown timeout reached. Forcing exit.");
    await prisma.$disconnect();
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
