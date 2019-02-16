import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  isMenuOpen = true;
  isSubMemuOpen = true;
  ngOnInit() {
  }

  changeMenuState() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeSubMenuState(){
    this.isSubMemuOpen=!this.isSubMemuOpen;
  }
}
