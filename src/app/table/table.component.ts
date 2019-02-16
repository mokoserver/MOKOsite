import {Component} from '@angular/core';
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
import {User} from "../models/users";

@Component({
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent  {
    users$: Observable<User[]>;

    form = new FormGroup({
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        createddate: new FormControl('')
    });

    constructor(public service: HttpService) {
        this.users$ = this.service.getUsers();
    }

    onFormSubmit() {
        this.form.patchValue({createddate: new Date()});
        this.service.postUser(this.form).subscribe(() => {
            this.users$ = this.service.getUsers();
            this.service.postShop(this.form).subscribe();
            this.service.postApp(this.form).subscribe();
        })
    }
}
