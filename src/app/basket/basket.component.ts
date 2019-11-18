import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http.service";
import {MatDialog} from "@angular/material";
import {WatchProductsModalComponent} from "../modals/watch-products-modal/watch-products-modal.component";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  private filter: any;

  public orderStatuses = [
    { name: 'Активен',        key:"status",value: 'active'},
    { name: 'Обрабатывается', key:"status",value: 'processing'},
    { name: 'Отложен',        key:"status",value: 'postponed'},
    { name: 'Выполнен',       key:"status",value: 'completed'},
    { name: 'Отменен',        key:"status",value: 'canceled'}
  ]

  orders$: Observable<any>;
  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.filter = {
      name:"Активен",
      key:"status",
      value:"active"
    };

    this.getOrders();
  }

  openDialog(order) {
    const dialog = this.dialog.open(WatchProductsModalComponent, {data: {orderitems: order.orderitems, order: order}});
  }

  selectOrderChange(data?){
  this.filter = data.value;
  this.getOrders();
  }

  selectChange(data?) {
    this.filter = data.value;
    //this.setPaginatorDefaults();
    this.getOrders();
  }

  getOrders() {
    this.orders$ = this.httpService.getOrders(this.filter);
  }


}
