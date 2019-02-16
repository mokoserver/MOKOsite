import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [

    AppComponent,
    LandingPageComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
