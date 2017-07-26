import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {HomeGuard} from "./guards/home.guard";


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [ HomeGuard ]},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
