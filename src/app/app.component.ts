import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { Observable } from 'rxjs';
import { select_isloggedin$, login_action } from './core/login/auth.store';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'training';

  isLoggedIn$: Observable<boolean>;
  showWaitScreen$ : Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private gs : GlobalService
  ) {


    this.isLoggedIn$ = this.store.select(select_isloggedin$);
    this.showWaitScreen$ = this.gs.waitScreen$;

    var token = sessionStorage.getItem("token");
    if (token) {
      var user = JSON.parse(sessionStorage.getItem("token"));
      this.store.dispatch(login_action({ user: user }));
    }
  }
}
