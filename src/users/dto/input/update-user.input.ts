import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"

@InputType()
export class UpdatedUserInput {
    @Field()
    @IsNotEmpty()
    userid: string

    @Field()
    @IsOptional()
    @IsNotEmpty()
    age: number 

    @Field()
    @IsNotEmpty()
    @IsOptional()
    IsSubscribed: boolean
}