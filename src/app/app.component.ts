import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { Observable } from 'rxjs';
import { select_isloggedin$, login_action } from './core/login/auth.store';
import { GlobalService } from './services/global.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'training';

  showProgress: boolean;

  isLoggedIn$: Observable<boolean>;
  showWaitScreen$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private gs: GlobalService,
    private router: Router
  ) {

    this.checkEvents();
    this.isLoggedIn$ = this.store.select(select_isloggedin$);
    this.showWaitScreen$ = this.gs.waitScreen$;

    var token = sessionStorage.getItem("token");
    if (token) {
      var user = JSON.parse(sessionStorage.getItem("token"));
      this.store.dispatch(login_action({ user: user }));
    }
  }

  checkEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.showProgress = true;
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)

        setTimeout(() => {
          this.showProgress = false;
        }, 250);

    });
  }


  ngOnInit() {
  }
}
