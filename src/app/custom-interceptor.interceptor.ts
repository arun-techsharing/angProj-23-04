import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr:ToastrService) { }



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tkn = localStorage.getItem('token');
    console.log('in custom interceptor', request);
    let headerInfo = new HttpHeaders();
    headerInfo = headerInfo.append('content-type', 'application/json');
    headerInfo = headerInfo.append('Accept-Language', 'en-gb');
    headerInfo = headerInfo.append('Authorization', 'Basic ' + tkn);

    request = request.clone({ headers: headerInfo })

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        alert(error.status)
        if (error.status == 401) {
          this.toastr.error('You are not authorized to access the resource')
         // alert('You are not authorized to access the resource')
          this.router.navigateByUrl('/login');
        }
        else if (error.status == 404) {
         //alert('Resource not found - pls try again later')
          this.toastr.error('Resource not found - pls try again later')
          errorMsg= error.status.toString();
        }
        else {
          this.toastr.error('Server response failed')
          //alert('Server response failed')
        }
        return throwError(() => (error));
      })
    );
  }

  errorHandler() {

  }
}
