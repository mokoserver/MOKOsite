import {Component, Input} from '@angular/core';
import {StoreService} from "../../../store.service";
import {HttpService} from "../../../http.service";
import {AppStore} from "../../../app.store.service";
@Component({
  selector: 'options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  @Input() message: string;
  @Input() id: string;
  @Input() type: string;
  @Input() deleteOptVisible = true;

  constructor(private store: StoreService, private service: HttpService, private appStore: AppStore) { }

  setOptions() {
    if (this.type == 'products') {
      this.store.nextProductAction$('put');
      this.store.nextProductId(this.id);
    } else if (this.type == 'message') {
      this.store.nextMessageStateName$(this.message);
      this.store.nextMessageAction$('put');
      this.store.nextMessageId(this.id);
    } else if (this.type == 'category') {
      this.appStore.setValue('categoryId', this.id);
      this.appStore.setValue('categoryAction', 'put');
    }
  }

  remove() {
    if (this.type == 'products') {
      this.service.deleteProduct(this.id).subscribe(() => {
        this.store.nextRefresh$()
      });
    } else if (this.type == 'message') {
      this.service.deleteMessage(this.id).subscribe(() => {
        this.store.nextRefreshMessages()
      });
    } else if (this.type == 'category') {
      this.service.deleteCategory(this.id).subscribe(() => {
        this.appStore.setValue('refresh', new Date());
      })
    }
  }
}
