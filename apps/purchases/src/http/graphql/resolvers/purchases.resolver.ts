import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AuthorizationGuard, AuthUser, CurrentUser } from 'auth';

import { Purchase } from '../models/purchase';
import { Product } from '../models/product';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { PurchasesService } from 'services/purchases.service';
import { ProductsService } from 'services/products.service';
import { CustomersService } from 'services/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    const { productId } = purchase;

    return this.productsService.getProductById(productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    const { productId } = data;

    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createOnePurchase({
      customerId: customer.id,
      productId,
    });
  }
}
