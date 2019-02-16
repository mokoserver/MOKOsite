import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../http.service";
import {StoreService} from "../store.service";
import {MatDialog} from "@angular/material/dialog";
import {ChooseProductModalComponent} from "../modals/choose-product-modal/choose-product-modal.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<any>;
  categories$: Observable<any>;
  subProducts$: Subscription;
  paginatorPageSize: any = 10;
  paginatorPage: any = 0;
  filter: any;
  form: FormGroup;

  constructor(private service: HttpService, private store: StoreService) {
    this.form = new FormGroup({
      search: new FormControl
    })
  }

  ngOnInit() {
    this.form.valueChanges.debounceTime(400).switchMap(observer => {
      console.log(observer)
      const filter = {
        key: 'title',
        value: observer.search
      };
      return this.service.getProducts(null, null, null, filter);
    })
      .subscribe(data => {
        console.log(data)
      })
    this.getProducts();

    this.subProducts$ = this.store.obsRefresh$().subscribe(() => {
      this.setPaginatorDefaults();
      this.getProducts();
    });

    this.categories$ = this.service.getCategories();

  }

  selectChange(data?) {
    this.filter = data.value;
    this.setPaginatorDefaults();
    this.getProducts();
  }

  getPaginatorOptions(options) {
    this.paginatorPage = options.pageIndex;
    this.paginatorPageSize = options.pageSize;
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subProducts$.unsubscribe()
  }

  setPaginatorDefaults() {
    this.paginatorPage = 0;
  }

  getProducts() {
    this.products$ = this.service.getProducts(this.filter, this.paginatorPage, this.paginatorPageSize);
  }



}
