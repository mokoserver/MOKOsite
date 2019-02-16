import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkWithImages} from "../../shared/classes/work-with-images";
import {NoImageBase64} from "../../shared/base64images/noimage.base64";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../http.service";
import {StoreService} from "../../store.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {FormService} from "../../form-service";

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit, OnDestroy {

  categories$: Observable<any>;
  bgResult: string;
  action: string;
  productImage: string;
  productState$: Subscription;
  nophoto: string = NoImageBase64.noimage;
  form: FormGroup;


  constructor(private store: StoreService, private service: HttpService,
              private fb: FormBuilder, private formService: FormService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      category: [''],
      description: [''],
      price: ['', [Validators.required]],
      _id: [''],
      images: ['', [Validators.required]],
      product_options: this.fb.array([
      ]),
      links: this.fb.array([
      ]),
    });

    this.productState$ = this.store.obsProductAction$()
        .subscribe(state => {
          this.action = state;
          this.form.reset();
          const product_options = <FormArray>this.form.controls['product_options'];
          let length = product_options.length;
          for (let i = 0; i < length; i++) {
            product_options.removeAt(0);
          }
          const links = <FormArray>this.form.controls['links'];
          length = links.length;
          for (let i = 0; i < length; i++) {
            links.removeAt(0);
          }
          this.getProduct(this.action);
          this.categories$ = this.service.getCategories();
        })
  }

  getProduct(action) {
    if (action == 'put') {
      const subscription = this.store.obsProductId$().subscribe(id => {
        this.service.getProductById(id).subscribe(form => {
          this.form.patchValue({
            title: form.title,
            category: form.category,
            description: form.description,
            price: form.price,
            _id: form._id
          });
          if (form.images.length) {
            this.service.getImage(form.images[0].id).subscribe(img => {
              this.productImage = img;
              this.setImageIntoProduct(img);
              subscription.unsubscribe();
            });
          }
          if (form.product_options) {
            for (const item of form.product_options) {
              const control = <FormArray>this.form.controls['product_options'];
              control.push(this.formService.addControl({name: item.name, value: item.value}));
            }
          }
          if (form.links) {
            for (const item of form.links) {
              const control = <FormArray>this.form.controls['links'];
              control.push(this.formService.addControl({name: item.name, url: item.url, link_type: item.link_type}));
            }
          }
        });
      });
    }
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);
  }

  addOption(optionName) {
    const control = <FormArray>this.form.controls[optionName];
    let body;
    if (optionName === 'links') {
      body = {name: [''], url: [''], link_type: ['']}
    } else if (optionName === 'product_options') {
      body = {name: [''], value: ['']}
    }
    control.push(this.formService.addControl(body));
  }

  deleteOption(i, name) {
    const control = <FormArray>this.form.controls[name];
    control.removeAt(i);
  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
    this.setImageIntoProduct(result);
  }

  setImageIntoProduct(img) {
    const image = [{ image: img }];
    this.form.patchValue({images: image});
  }

  buttonAccept() {
    if (this.action == 'put') {
      this.service.putProduct(this.form).subscribe(() => {
        this.store.nextRefresh$();
      });
    } else if (this.action == 'post') {
      this.form.patchValue({date: new Date()});
      this.service.postProduct(this.form).subscribe(() => {
        this.store.nextRefresh$();
      });
    }
  }

  buttonDuplicate() {
    this.service.duplicateProduct(this.form).subscribe(() => {
      this.store.nextRefresh$();
    });
  }

  ngOnDestroy(): void {
    this.productState$.unsubscribe();
  }
}
