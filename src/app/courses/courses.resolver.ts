import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { pipe } from "rxjs";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./courses.actions";

@Injectable()
//Router resolve es un servicio especial que se ejecuta antes de que el router termine si trancicion
export class CoursesResolver implements Resolve<any> {
    loading = false
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      pipe(
        tap(() => {
            // El is loading es para evitar que se ejecute dos veces el dispatch de la accion
            if(!this.loading){
                this.loading= true
                this.store.dispatch(loadAllCourses());

            }
        }),
        //First completa la subscripcion cuando el observable emita algún valor.
        first(),
        finalize(() => this.loading = false)
      )
    );
  }
}
