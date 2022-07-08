import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
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
            default:
                response
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(exception);
        }
    }
}
