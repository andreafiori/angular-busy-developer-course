import { ErrorHandler } from "@angular/core";

export default class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    alert('Unexpected error occurred');
    console.log(error);
  }

}
