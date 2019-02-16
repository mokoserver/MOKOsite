import {Component, OnInit} from "@angular/core";
import {WorkWithImages} from "../shared/classes/work-with-images";
import {HttpService} from "../http.service";
import {FormGroup, Validators, FormArray, FormBuilder} from "@angular/forms";
import {FormService} from "../form-service";

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})


export class ApplicationInfoComponent implements OnInit {
  hoveredBG: boolean;
  hoveredIcon: boolean;
  iconResult: string;
  bgResult: string;
  colorArray = ['assets/img/colors/AquaFinal.png', 'assets/img/colors/InLoveToadFinal.png', 'assets/img/colors/InternationalOrangeFinal.png', 'assets/img/colors/LightCherryFinal.png', 'assets/img/colors/PurpleGreyFinal.png'];
  templateArray = ['assets/img/design/FL_LOGOTYPE_ICONS.jpg', 'assets/img/design/LOGOTYPE_CATEGORIES.jpg', 'assets/img/design/LOGOTYPE_INFORMATION.jpg', 'assets/img/design/NEWS_CATEGORIES.jpg', 'assets/img/design/SALE_CATEGORIES.jpg'];
  iconArray = ['assets/img/icons/CLASSIC.png', 'assets/img/icons/LIGHT.png', 'assets/img/icons/MATERIAL.png'];
  colorNames = ['Аква', 'Влюбленная жаба', 'Международный оранжевый', 'Светлая вишня', 'Фиолетовый и серый'];
  templateNames = ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4', 'Вариант 5'];
  iconNames = ['Классические', 'Светлые', 'Современные'];
  public form: FormGroup;

  constructor(private service: HttpService, private fb: FormBuilder, private formService: FormService) {
  }

  addOption(inbound: boolean) {
    const control = <FormArray>this.form.controls['menuitems'];
    control.push(this.formService.addControlWithBool('', inbound));
    console.log(this.form['controls']['menuitems']['controls'])
  }

  deleteOption(i: number) {
    const control = <FormArray>this.form.controls['menuitems'];
    control.removeAt(i);
  }

  ngOnInit() {
    this.form = this.fb.group({
      backgroud: [''],
      store: [''],
      logo: [''],
      currency: ['', [Validators.required]],
      email: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      _id: [''],
      layout: [''],
      iconpack: [''],
      colorscheme: [''],
      phone: ['', [Validators.required]],
      title: ['', [Validators.required]],
      menuitems: this.fb.array([])
    });

    this.service.getApp().map(res => res[0])
        .subscribe(form => {
          this.form.patchValue({
            backgroud: form.backgroud,
            store: form.store,
            logo: form.logo,
            currency: form.currency,
            email: form.email,
            firstname: form.firstname,
            lastname: form.lastname,
            _id: form._id,
            layout: form.layout,
            iconpack: form.iconpack,
            colorscheme: form.colorscheme,
            phone: form.phone,
            title: form.title
          });
          if (form.menuitems) {
            for (let item of form.menuitems) {
              const control = <FormArray>this.form.controls['menuitems'];
              control.push(this.formService.addControlWithBool(item.name, item.inbound));
            }
          }
        });

    this.form.valueChanges
        .debounceTime(1000)
        .distinctUntilChanged()
        .subscribe(() => {
      // console.log('ИЗМЕНЕНИЯ!!!')
    })
  }

  onFormSubmit() {
    this.service.putApp(this.form).subscribe();
  }

  upLoadBackground(readerEvt, iconOrBg) {
    WorkWithImages.upLoadBackground((result, iconOrBg) => this.setPicture(result, iconOrBg), readerEvt, iconOrBg);
  }

  setPicture(result, iconOrBg) {
    this[iconOrBg] = result;
    if (iconOrBg == 'bgResult') {
      this.form.patchValue({backgroud: result});
    } else {
      this.form.patchValue({logo: result});
    }
  }

  hovered(hovered, iconOrBg) {
    this[iconOrBg] = hovered;
  };

}
