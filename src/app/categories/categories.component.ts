import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpService} from "../http.service";
import {Subscription} from "rxjs/Subscription";
import {AppStore} from "../app.store.service";
import {MatDialog} from "@angular/material";
import {CategoriesModalComponent} from "../modals/categories-modal/categories-modal.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit, OnDestroy {
  categories$: Observable<any>;
  constructor(private http: HttpService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.http.getCategories();
  }

  openDialog(id?) {
    const dialog = this.dialog.open(CategoriesModalComponent, {data: {id: id}});
    dialog.afterClosed().filter(data => Boolean(data)).subscribe(modalValue => this.getCategories());
  }

  deleteItem(id) {
    this.http.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }

  ngOnDestroy(){
  }

}
