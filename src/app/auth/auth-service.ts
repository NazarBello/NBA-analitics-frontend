import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private cookie = inject(CookieService);

  private readonly baseUrl = 'http://localhost:8080/auth/';

  /** Достаём токен из cookie при создании сервиса */
  accessToken: string | null = this.cookie.get('accessToken') || null;
  refreshToken: string | null = this.cookie.get('refreshToken') || null;

  /** Один источник истины: проверяем существование токена в cookie */
  get isLoggedIn(): boolean {
    return this.cookie.check('accessToken');
  }

  login(payload: { username: string; password: string }) {
    return this.http.post<TokenResponse>(`${this.baseUrl}login`, payload)
      .pipe(tap(res => {
        this.cookie.set('accessToken',  res.accessToken);
        this.cookie.set('refreshToken', res.refreshToken);

        this.accessToken  = res.accessToken;
        this.refreshToken = res.refreshToken;
      }));
  }
}

