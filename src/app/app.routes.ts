// app.routes.ts (Angular standalone routing)
import { Routes } from '@angular/router';
// Note: If you have a typo 'access.quard', it should ideally be 'access.guard'.
// I'm keeping your provided import path for now.
import { canActivate } from './auth/access.quard';

export const routes: Routes = [

  // 1. Публичный логин
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component')
        .then(m => m.LoginPageComponent)
  },

  // --- NEW: Add the dynamic player route here ---
  // This route should come before the static 'players' route for clarity,
  // although with lazy loading and distinct paths, order might be less critical than with direct component loading.
  {
    path: 'players/:playerName', // This is the route that captures the player's name
    loadComponent: () =>
      import('./pages/player-page/player-page.component')
        .then(m => m.PlayerPageComponent),
    canActivate: [canActivate] // Keep your guard
  },
  // --- END NEW ---

  // 2. Existing Protected Routes (now with dynamic player route first)
  {
    path: 'players', // This is for the base /players route if you had a list of players, for example
    loadComponent: () =>
      import('./pages/player-page/player-page.component')
        .then(m => m.PlayerPageComponent),
    canActivate: [canActivate]
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component')
        .then(m => m.HomePageComponent),
    canActivate: [canActivate]
  },
  {
    path: 'teams',
    loadComponent: () =>
      import('./pages/teams-page/teams-page.component')
        .then(m => m.TeamsPageComponent),
    canActivate: [canActivate]
  },
  {
    path: 'data', // This is what I previously referred to as 'glossary'
    loadComponent: () =>
      import('./pages/data-glossary-page/data-glossary-page.component')
        .then(m => m.DataGlossaryPageComponent),
    canActivate: [canActivate]
  },

  // 3. Корневой путь → home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 4. Все неизвестные URL → home (или 404‑компонент)
  { path: '**', redirectTo: 'home' }
];
