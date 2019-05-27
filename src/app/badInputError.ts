import { AppError } from './appError';

export class BadInputError extends AppError {
    constructor(error: any) {
        super(error);
    }


}