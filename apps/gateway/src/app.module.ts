import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true,
        context: ({ req }) => {
          return { headers: req.headers };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "purchases",
              url: process.env.PURCHASES_URL,
            },
            {
              name: "classrooms",
              url: process.env.CLASSROOMS_URL,
            },
          ],
        }),
        buildService: ({ url }) => {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set(
                "authorization",
                context?.["headers"]?.["authorization"]
              );
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
