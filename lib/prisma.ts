import { Prisma, PrismaClient } from '@prisma/client';

type GlobalWithPrisma = {
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!(global as GlobalWithPrisma).prisma) {
        (global as GlobalWithPrisma).prisma = new PrismaClient();
    }
    prisma = (global as GlobalWithPrisma).prisma as typeof prisma;
}

export default prisma;
