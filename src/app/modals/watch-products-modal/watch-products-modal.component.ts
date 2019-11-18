import {Component, OnInit, Inject} from '@angular/core';
//import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from "@angular/material";
import {HttpService} from "../../http.service";
import 'rxjs/add/operator/map'




interface ModalValue {
  productId?: any;
  quantity?: number;
}

@Component({
  selector: 'app-watch-products-modal',
  templateUrl: './watch-products-modal.component.html',
  styleUrls: ['./watch-products-modal.component.css']
})
export class WatchProductsModalComponent {
  counter: number;
  value: ModalValue = {};
  products$ = [];
  order: any;
  public orderStatuses = [
    { name: 'Активен',        key:"status",value: 'active'},
    { name: 'Обрабатывается', key:"status",value: 'processing'},
    { name: 'Отложен',        key:"status",value: 'postponed'},
    { name: 'Выполнен',       key:"status",value: 'completed'},
    { name: 'Отменен',        key:"status",value: 'canceled'}
  ]

  constructor(public dialogRef: MatDialogRef<WatchProductsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private service: HttpService) {
                console.log("то что приходит с сервера в конструкторе",data)
    this.order = data;

    console.log("то что приходит записываеться в переменную",this.order)
    data.orderitems.map(items => {
      this.service.getProductById(items._id)
          .subscribe(data => {
            if (data.images.length) {
              for (let i = 0; i < data.images.length; i++) {
                data.images[i] = this.service.getImage(data.images[i].id)
              }
            }
            data.quantity = items.quantity
            this.products$.push(data)
          });
    })
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

  selectOrderChange(status) {
   // if (status && status.value && status.value.name) {
      console.log("out ID",this.order['_id'])
      console.log("out ID",this.order.order._id)
      console.log("out status",status.value)
      this.service.updateOrder(this.order.order._id, status.value).subscribe(() => {});
    //}
  }
}
