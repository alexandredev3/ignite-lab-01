import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

import { Purchase } from "./purchase";

// When we have different entities we need to do that to say 
// what is the same information in these entities.
@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];
}