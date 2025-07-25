import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async () => {
        const client = new Redis({
          host: process.env.REDIS_HOST || "srv-captain--redis",
          port: parseInt(process.env.REDIS_PORT || "6379"),
          password: process.env.REDIS_PASSWORD || "redis",
        });

        client.on("error", (err) => {
          console.error("Redis error", err);
        });

        return client;
      },
    },
  ],
  exports: ["REDIS_CLIENT"],
})
export class RedisModule {}
