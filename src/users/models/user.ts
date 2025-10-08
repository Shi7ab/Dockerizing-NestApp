// src/users/models/user.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: string;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
