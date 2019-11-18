import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {} // referência ao mecanismo de injeção de dependência do angular

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService); // injeta o LoginService manualmente

    if (loginService.isLoggedIn()) {
      // realizo o clone por que o objeto http é imutável
      const authRequest = req.clone({setHeaders: {Authorization: `Bearer ${loginService.customer.accessToken}`}});
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}
