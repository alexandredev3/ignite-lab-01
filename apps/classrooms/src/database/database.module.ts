import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService] // now others modules can use PrismaSerices.
})
export class DatabaseModule {}
