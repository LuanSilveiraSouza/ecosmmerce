import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  @IsNumber()
  readonly ticket_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly qtd: number;
}
