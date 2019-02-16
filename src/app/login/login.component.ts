import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {RouteInformation} from "../RouteInfo";
import {Router} from "@angular/router";
import {AuthenticationService} from "../autentication.service";
import {AppStore} from "../app.store.service";
import {HttpService} from "../http.service";

@Component({
  selector: 'dashboard-cmp',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private routes: RouteInformation, private router: Router,
              private autenticationService: AuthenticationService,
              private store: AppStore, private httpService: HttpService) {
  };

  onFormSubmit(): void {
    let login = this.form.get('login').value;
    let password = this.form.get('password').value;

    switch (login) {
      case 'admin': {
        this.routes.deleteRoutes();
        this.router.navigate(['admin/table']);
        this.autenticationService.setUserUsername('admin');
        break;
      }
      default: {
        this.autenticationService.setUserLoginAndPassword(login, password);
        this.httpService.getMenuItems(login, password)
            .subscribe(data => {
                  this.routes.deleteRoutes();
                  this.router.navigate(['admin/app-info']);
                },
                error => console.log(error)
            )

        break;
      }
    }
  }

  ngOnInit() {
    this.routes.setDefault();
  }
}
