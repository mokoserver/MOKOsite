import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http.service";
import {WorkWithImages} from "../shared/classes/work-with-images";

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  form = new FormGroup({
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    images: new FormControl(''),
    phone: new FormControl(''),
    description: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    sharetext: new FormControl('', Validators.required),
    uri: new FormControl(''),
    zip: new FormControl(''),
    _id: new FormControl(''),
  });

  constructor(private service: HttpService) {
  }

  ngOnInit() {
    this.service.getShop().subscribe(res => this.form.patchValue(res[0]));
  }

  onFormSubmit() {
    this.service.putShop(this.form).subscribe();
  }

  upLoadBackground(readerEvt) {
    WorkWithImages.upLoadBackground((result) => this.setImageIntoProduct(result), readerEvt);
  }

  setImageIntoProduct(img) {
    const image = [{
      image: img
    }];
    this.form.patchValue({images: image});
  }
}
