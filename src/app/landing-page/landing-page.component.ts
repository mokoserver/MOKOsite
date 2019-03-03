import { Component, OnInit } from '@angular/core';
import construct = Reflect.construct;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }
  modalImage1 = true;
  modalImage2 = false;
  modalImage3 = false;
  modalImage4 = false;
  modalImage5 = false;
  modalImage6 = false;
  modalImage7 = false;
  modalImage8 = false;

  isMenuOpen = true;
  isSubMemuOpen = true;
  isModalWindow = true;
  ngOnInit() {
  }

  ModalWindow(modal){
    if(modal == 1 ){
      this.modalImage1 = true;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 2){
      this.modalImage1 = false;
      this.modalImage2 = true;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 3){
      this.modalImage1 = false;
      this.modalImage2 =  false;
      this.modalImage3 =true;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 4){
      this.modalImage1 = false;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = true;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 5){
      this.modalImage1 = false;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = true;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 6){
      this.modalImage1 = false;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 =true;
      this.modalImage7= false;
      this.modalImage8= false;
    }
    if(modal == 7){
      this.modalImage1 = false;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= true;
      this.modalImage8= false;
    }
    if(modal == 8){
      this.modalImage1 = false;
      this.modalImage2 = false;
      this.modalImage3 = false;
      this.modalImage4 = false;
      this.modalImage5 = false;
      this.modalImage6 = false;
      this.modalImage7= false;
      this.modalImage8= true;
    }


  }
  changeMenuState() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeSubMenuState(){
    this.isSubMemuOpen=!this.isSubMemuOpen;
  }
}
