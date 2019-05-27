import { ErrorHandler } from '@angular/core';
import { NotFoundError } from './NotFoundError';
import { BadInputError } from './badInputError';

export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: any) {

        console.log(error);
        if (error instanceof NotFoundError) {
            alert("No such resource ");
        }
        else if (error instanceof BadInputError) {
            alert("Bad Input ");
        }
        else {
            alert("an unexcpectaed error occoured");
        }
    }

}