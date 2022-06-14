import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver, ResolveReference } from '@nestjs/graphql';

import { AuthorizationGuard } from 'http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'http/auth/current-user';

import { CustomersService } from 'services/customers.service';
import { PurchasesService } from 'services/purchases.service';

import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    const { id } = customer;

    return this.purchasesService.listAllPurchasesFromUser(id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    const { authUserId } = reference;

    return this.customersService.getCustomerByAuthUserId(authUserId);
  }
}
