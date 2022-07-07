import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';

import { TypeORMError, EntityNotFoundError } from 'typeorm';

@Catch(TypeORMError)
export class OrmFilter implements ExceptionFilter {
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();

        switch (exception.constructor) {
            case EntityNotFoundError:
                response
                    .status(HttpStatus.NOT_FOUND)
                    .json({ message: exception.message });
                throw new NotFoundException();
            default:
                throw new InternalServerErrorException();
        }
    }
}
