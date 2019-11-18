import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { MEAT_API } from 'src/app/app.api';
import { Customer } from './customer.model';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService {

    customer: Customer;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.pipe(filter(e => e instanceof NavigationEnd))
        // aqui eu filtro apenas o tipo que eu quero depois converto ele no subscribe pra poder acessar a propriedade que eu quero
        .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    isLoggedIn(): boolean {
        return this.customer !== undefined;
    }

    login(userEmail: string, userAccessKey: string): Observable<Customer> {
        return this.http.post<Customer>(`${MEAT_API}/login`, {email: userEmail, accessKey: userAccessKey})
        .pipe(tap(customer => this.customer = customer));
    }

    logout() {
        this.customer = undefined;
    }

    handleLogin(path: string = this.lastUrl) {
      this.router.navigate(['/login', btoa(path)]);
    }
}
