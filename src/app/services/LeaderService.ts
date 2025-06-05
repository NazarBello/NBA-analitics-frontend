// src/app/services/leader.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leader }     from '../models/Leader';
import {CookieService} from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LeaderService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  /**
   * GET /api/leaders/{season}/{statKey}
   * returns Observable<Leader[]>
   */
  getLeaders(season: number, statKey: string): Observable<Leader[]> {
    const token = this.cookieService.get('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });


    return this.http.get<Leader[]>(
      `http://localhost:8080/api/leaders/${season}/${statKey}`,
      {
        headers,
        responseType: 'json'
      }
    );
  }
}
