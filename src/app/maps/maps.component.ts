import { Component,OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../http.service";

declare var google: any;

@Component({
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
  center;
  constructor(private service: HttpService){};
  public form = new FormGroup({
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    _id: new FormControl(''),
  });

  ngOnInit() {
    this.service.getShop().subscribe(res => {
      this.form.patchValue(res[0]);
      this.center = `${this.form.value.latitude},${this.form.value.longitude}`;
    });
  }

  onFormSubmit() {
    this.service.putShop(this.form).subscribe(() => alert('Изменения вступят после перезагрузки раздела!'));
  }

}
