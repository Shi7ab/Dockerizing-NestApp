import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetUsersArgs {
  @Field(() => [String], { nullable: true })
  userIds?: string[];
}
