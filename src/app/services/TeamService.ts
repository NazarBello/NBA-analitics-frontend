// src/app/services/team.service.ts
import { Injectable }       from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable }       from 'rxjs';
import { TeamStanding }     from '../models/TeamStanding';
import { CookieService }    from 'ngx-cookie-service';
import {TeamSummary} from '../models/TeamSummary';

@Injectable({ providedIn: 'root' })
export class TeamService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  /** Fetch the standings for a given season, sending the JWT from the cookie */
  getStandings(season: number): Observable<TeamStanding[]> {
    // 1) read the token from your cookie
    const token = this.cookieService.get('accessToken');

    // 2) build Angular HttpHeaders
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // 3) call the API with the headers, specifying JSON response
    return this.http.get<TeamStanding[]>(
      `http://localhost:8080/api/teams/standings/${season}`,
      {
        headers,
        responseType: 'json'  // ensures TS picks the correct overload
      }
    );
  }

  getBySeason(season: number): Observable<TeamSummary[]> {
    const token = this.cookieService.get('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<TeamSummary[]>(
      `http://localhost:8080/api/teams/${season}`,
      { headers }
    );
  }
}
