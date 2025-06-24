import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, Min } from "class-validator";

export enum LookbackType {
  COUNT = 'count',
  DAYS  = 'days',
}

export class GameQueryDto {
    @Transform(({ value }) => value.split(','))
    @IsArray()
    @ArrayNotEmpty()
    ids: string[];

    @IsEnum(LookbackType)
    type: LookbackType;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    value: number;
}