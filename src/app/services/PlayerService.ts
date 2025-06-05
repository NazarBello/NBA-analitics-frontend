import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerSeasonTotal } from '../models/PlayerSeasonTotal'; // Adjust this path if your model is in a different location

@Injectable({
  providedIn: 'root' // This makes the service a singleton and available throughout your app
})
export class PlayerService {
  // IMPORTANT:
  // Adjust this URL to match the address and port where your Spring Boot backend is running.
  // By default, Spring Boot runs on http://localhost:8080.
  private apiUrl = 'http://localhost:8080/api/players';

  constructor(private http: HttpClient) { }

  /**
   * Searches for player season totals based on a partial or full player name.
   * This corresponds to your Spring Boot GET /api/players/search endpoint.
   *
   * @param name The partial player name to search for.
   * @returns An Observable that emits an array of PlayerSeasonTotal objects.
   */
  searchPlayers(name: string): Observable<PlayerSeasonTotal[]> {
    // Create HttpParams to safely add the 'name' query parameter
    let params = new HttpParams().set('name', name);
    return this.http.get<PlayerSeasonTotal[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Searches for player season totals by player name and a specific season.
   * This corresponds to your Spring Boot GET /api/players/search-by-season endpoint.
   *
   * @param name The player name (or partial name) to search for.
   * @param season The specific season to filter by.
   * @returns An Observable that emits an array of PlayerSeasonTotal objects.
   */
  searchPlayersBySeason(name: string, season: number): Observable<PlayerSeasonTotal[]> {
    let params = new HttpParams()
      .set('name', name)
      .set('season', season.toString()); // Convert number to string for HttpParams
    return this.http.get<PlayerSeasonTotal[]>(`${this.apiUrl}/search-by-season`, { params });
  }

  /**
   * Retrieves a list of all distinct player names from the backend.
   * This corresponds to your Spring Boot GET /api/players/names endpoint.
   *
   * @returns An Observable that emits an array of strings (player names).
   */
  getAllPlayerNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/names`);
  }
}
