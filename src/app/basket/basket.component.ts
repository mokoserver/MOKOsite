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
  orders$: Observable<any>;
  constructor(private httpService: HttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.orders$ = this.httpService.getOrders();
  }

  openDialog(order) {
    const dialog = this.dialog.open(WatchProductsModalComponent, {data: {orderitems: order.orderitems}});
  }

}
