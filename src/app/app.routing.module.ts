import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'admin', loadChildren: './admin.module#AdminModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
