import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.store';
import { Observable } from 'rxjs';
import { select_isloggedin$, login_action, login_success_action } from './core/login/auth.store';
import { GlobalService } from './services/global.service';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'training';

  showProgress = false;
  isLoggedIn$: Observable<boolean>;
  showWaitScreen$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private gs: GlobalService,
    private router: Router
  ) {

    this.showWaitScreen$ = this.gs.waitScreen$;
    this.isLoggedIn$ = this.store.pipe(select(select_isloggedin$));
    this.checkEvents();

  }

  ngOnInit() {

    

    var token = localStorage.getItem("token");
    if (token) {
      var user = JSON.parse(token);
      this.store.dispatch(login_success_action({ user: user }));
    }

  }

  checkEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.showProgress = true;
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
        this.showProgress = false;
    });
  }

}
