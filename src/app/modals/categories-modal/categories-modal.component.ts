import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material";
import {WorkWithImages} from "../../shared/classes/work-with-images";
import {NoImageBase64} from "../../shared/base64images/noimage.base64";
import {FormControl, Validators, FormGroup} from "@angular/forms";
import {HttpService} from "../../http.service";

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css']
})
export class CategoriesModalComponent {
  bgResult: string;
  nophoto = NoImageBase64.noimage;
  public form: FormGroup;
  constructor(public dialogRef: MatDialogRef<CategoriesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpService) {
    this.form = new FormGroup({
      category: new FormControl('', Validators.required),
      description: new FormControl(''),
      images: new FormControl(''),
      _id: new FormControl('')
    });

    if (data.id) {
      this.http.getCategoryById(data.id)
        .subscribe(data => {
          if (data.images) {
            data.images[0].image.subscribe(res => {
              data.images[0].image = res;
              this.form.patchValue(data);
            })
          } else {
            this.form.patchValue(data);
          }
        })
    }
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground(
        (result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);
  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
    const image = [{
      image: result
    }];
    this.form.patchValue({images: image});
  }

  submit() {
    console.log(this.form.value)
    if (this.form.value._id) {
      this.http.putCategory(this.form).subscribe();
    } else {
      this.http.postCategory(this.form).subscribe();
    }
    this.dialogRef.close(true);
  }
}
