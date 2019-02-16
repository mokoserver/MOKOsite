import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {HttpService} from "../../http.service";

interface ModalValue {
  id?: string;
  commentsType?: string;
}

@Component({
  selector: 'app-comments-modal',
  templateUrl: 'comments-modal.component.html',
  styleUrls: ['comments-modal.component.css']
})

export class CommentsModalComponent implements OnInit {
  value: ModalValue = {};
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CommentsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModalValue,
              private httpService: HttpService) {
    this.value = data;
    this.form = new FormGroup({
      body: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      category: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      date: new FormControl(''),
      _id: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.value.id) {
      this.httpService.getMessageById(this.value.id).subscribe(form => this.form.patchValue(form))
    }
  }

  confirmSelection() {
    this.form.patchValue({
      category: this.value.commentsType,
      date: new Date()
    });
    if (this.value.id) {
      this.httpService.putMessage(this.form).subscribe(() => {});
    } else if (this.value.commentsType) {
      this.httpService.postMessage(this.form).subscribe(() => {});
    }
    this.dialogRef.close(true);
  }

}
