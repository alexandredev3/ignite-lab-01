import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '@ignite/auth';

import { Product } from 'http/graphql/models/product';

import { ProductsService } from 'services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {

  }

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }
  
  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput 
  ) {
    return this.productsService.createOneProduct(data);
  }
}
