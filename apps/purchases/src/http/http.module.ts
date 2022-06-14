import path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { DatabaseModule } from 'database/database.module';
import { MessagingModule } from 'messaging/messaging.module';

import { ProductsResolver } from 'http/graphql/resolvers/products.resolver';
import { PurchasesResolver } from 'http/graphql/resolvers/purchases.resolver';
import { CustomersResolver } from 'http/graphql/resolvers/customers.resolver';

import { ProductsService } from 'services/products.service';
import { PurchasesService } from 'services/purchases.service';
import { CustomersService } from 'services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
  ], // it reads the .env
  providers: [
    ProductsResolver,
    PurchasesResolver,
    CustomersResolver,

    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
