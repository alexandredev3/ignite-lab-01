import { Injectable } from "@nestjs/common";

import { PrismaService } from "database/prisma/prisma.service";
import { KafkaService } from "messaging/kafka.service";

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

  listAllPurchases() {
    return this.prisma.purchases.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  listAllPurchasesFromUser(customerId: string) {
    return this.prisma.purchases.findMany({
      where: {
        customerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async createOnePurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    const purchase = await this.prisma.purchases.create({
      data: {
        customerId,
        productId
      }
    });

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId
      }
    })

    this.kafka.emit('purchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId, // we have to send some data so that other services can identify what customer.
        product: {
          id: product.id,
          title: product.title,
          slug: product.slug
        }
      }
    });

    return purchase;
  }
}