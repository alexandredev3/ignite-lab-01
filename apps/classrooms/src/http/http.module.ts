import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { DatabaseModule } from 'database/database.module';

import { CoursesResolver } from 'http/graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from 'http/graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from 'http/graphql/resolvers/students.resolver';

import { CoursesService } from 'services/courses.service';
import { EnrollmentsService } from 'services/enrollments.service';
import { StudentsService } from 'services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: '../schema.gql',
      driver: ApolloFederationDriver,
    }),
  ], // it reads the .env
  providers: [
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
