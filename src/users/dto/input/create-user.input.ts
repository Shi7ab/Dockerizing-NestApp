import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
