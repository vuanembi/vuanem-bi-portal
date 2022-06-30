import { ApiProperty } from '@nestjs/swagger';

export class CreateTableExportDto {
    @ApiProperty()
    dataset: string;

    @ApiProperty()
    table: string;
}
