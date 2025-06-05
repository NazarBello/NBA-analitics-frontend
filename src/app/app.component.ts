// src/app/app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { filter, fromEvent, Subject } from 'rxjs';
import { NgIf } from '@angular/common';
import { GlobalPlayerSearchComponent } from './pages/global-player-search/global-player-search.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgIf, GlobalPlayerSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'nba-analitics-frontend';

  showSidebar: boolean = true; // Still used for login page visibility if desired
  showGlobalSearch: boolean = true;

  isSidebarOpen: boolean = false; // Controls the mobile sidebar's 'open' class for sliding

  private destroy$ = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        const isLoginPage = url.startsWith('/login');

        this.showSidebar = !isLoginPage; // If not login, sidebar component exists
        this.showGlobalSearch = !isLoginPage;

        if (!isLoginPage && this.isSidebarOpen) {
          this.isSidebarOpen = false;
          document.body.style.overflow = '';
        }
      });

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onWindowResize());

    this.onWindowResize(); // Initial check
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (this.isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      const currentUrl = this.router.url;
      const isLoginPage = currentUrl.startsWith('/login');
      if (!isLoginPage) {
        document.body.style.overflow = '';
      }
    }
  }

  private onWindowResize(): void {
    const desktopBreakpoint = 992;
    const isDesktop = window.innerWidth > desktopBreakpoint;

    // This handles closing the mobile sidebar if resizing to desktop
    if (isDesktop && this.isSidebarOpen) {
      this.isSidebarOpen = false;
      document.body.style.overflow = '';
    }
    // No longer trying to set showSidebar for responsive display here.
  }

  handleGlobalPlayerSelection(playerName: string): void {
    console.log('AppComponent: Received playerSelected event. Navigating to:', playerName);
    const encodedPlayerName = encodeURIComponent(playerName.replace(/ /g, '-'));
    this.router.navigate(['/players', encodedPlayerName]);
    console.log(`AppComponent: Attempting to navigate to /players/${encodedPlayerName}`);
  }
}
