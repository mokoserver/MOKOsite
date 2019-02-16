/**
 * Created by Konstantin on 19.08.2017.
 */

import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";


@Injectable()
export class FormService {

  constructor(private fb: FormBuilder) {
  }

  addControl(body?): FormGroup {
    return this.fb.group(body);
  }

  addControlWithBool(name?: string, value?: boolean): FormGroup {
    return this.fb.group({
      name: name,
      inbound: value
    });
  }

}
