import {Component, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material";

interface ModalValue {
  productId?: any;
  quantity?: number;
}

@Component({
  selector: 'app-choose-product-modal',
  templateUrl: './choose-product-modal.component.html',
  styleUrls: ['./choose-product-modal.component.css']
})

export class ChooseProductModalComponent {
  counter: number;
  value: ModalValue = {};

  constructor(public dialogRef: MatDialogRef<ChooseProductModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModalValue) {
    this.counter = 1;
    this.value.productId = data.productId;
  }

  count(num) {
    if (this.counter > 0 || num > 0) {
      this.counter += num;
    }
  }

  confirmSelection() {
    this.value.quantity = this.counter;
    this.dialogRef.close(this.value);
  }

  // openDialog(productId) {
  //   const dialog = this.dialog.open(WatchProductsModalComponent, {data: {productId: productId}});
  //
  //   dialog.afterClosed()
  //       .subscribe(modalValue => {
  //         if (modalValue) {
  //           this.service.postNewOrder(modalValue.productId, modalValue.quantity).subscribe(() => {});
  //         }
  //       });
  // }

}
