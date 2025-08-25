import { PrismaClient } from '@prisma/client';

declare global {
  // 開発中に PrismaClient が再生成されるのを防ぐ
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
