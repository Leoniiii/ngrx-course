import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { AppState } from "./reducers";
import { authFeatureKey } from "./auth/reducers";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { AuthActions } from "./auth/action-types";
import { login } from "./auth/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    const userProfle = localStorage.getItem("user");
    if (userProfle) {
      this.store.dispatch(login({ user: JSON.parse(userProfle) }));
    }
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.isLoggedIn$ = this.store.pipe(
      //use select from "@ngrx/store" instad of map to avoid repeate stream if there is not change
      select(isLoggedIn)
    );
    this.isLoggedOut$ = this.store.pipe(
      //use select from "@ngrx/store" instad of map to avoid repeate stream if there is not change
      select(isLoggedOut)
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
