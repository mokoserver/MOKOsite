import {Component, Input} from '@angular/core';
import {StoreService} from "../../../store.service";
import {AppStore} from "../../../app.store.service";

@Component({
  selector: 'add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent {
  @Input() message: string;
  @Input() type: string;
  constructor(private store: StoreService, private appStore: AppStore) { }

  setOptions() {
    if (this.type == 'products') {
      this.store.nextProductAction$('post');
    } else if (this.type == 'message') {
      this.store.nextMessageStateName$(this.message);
      this.store.nextMessageAction$('post');
    } else if (this.type == 'category') {
      this.appStore.setValue('categoryAction', 'post')
    }
  }

}
