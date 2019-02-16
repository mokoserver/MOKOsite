// '@angular/platform-browser-dynamic'
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SidebarModule} from './navigation/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {NguiMapModule} from '@ngui/map';
import {TableComponent} from './table/table.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationInfoComponent} from './application-info/application-info.component';
import {ShopInfoComponent} from './shop-info/shop-info.component';
import {AuthGuard} from "./auth-guard.guard";
import {AuthenticationService} from "./autentication.service";
import {NewsComponent} from './news/news.component';
import {SalesComponent} from './sales/sales.component';
import {GalleryComponent} from './gallery/gallery.component';
import {BasketComponent} from './basket/basket.component';
import {ProductsComponent} from "./products/products.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductsModalComponent} from './modals/products-modal/products-modal.component';
import {CommentsComponent} from './comments/comments.component';
import {GalleryModalComponent} from './modals/gallery-modal/gallery-modal.component';
import {PipesModule} from "./shared/pipes/pipes.module";
import {SalesModalComponent} from "./modals/sales-modal/sales-modal.component";
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";
import {OptionsComponent} from "./shared/components/options/options.component";
import {MessageModalComponent} from "./modals/message-modal/message-modal.component";
import {StoreService} from "./store.service";
import {AddMessageComponent} from "./shared/components/add-message/add-message.component";
import {TemplateComponent} from './application-info/template/template.component';
import {PushStoryComponent} from "./push-story/push-story.component";
import {AppStore} from "./app.store.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatPaginatorModule, MatSelectModule, MatDialogModule, MatPaginatorIntl} from "@angular/material";
import {ChooseProductModalComponent} from './modals/choose-product-modal/choose-product-modal.component';
import {FormService} from "./form-service";
import {CommonModule} from "@angular/common";
import {CommentsModalComponent} from "./modals/comments-modal/comments-modal.component";
import { WatchProductsModalComponent } from './modals/watch-products-modal/watch-products-modal.component';
import { CategoriesModalComponent } from './modals/categories-modal/categories-modal.component';
import {AdminComponent} from "./admin.component";
import {AdminRoutes, AdminRoutingModule} from "./admin.routing.module";
import {MaterialaginatorIntl} from "./shared/classes/material-pager-intl";

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    ApplicationInfoComponent,
    ShopInfoComponent,
    NewsComponent,
    SalesComponent,
    GalleryComponent,
    BasketComponent,
    ProductsComponent,
    CategoriesComponent,
    ProductsModalComponent,
    CommentsComponent,
    GalleryModalComponent,
    SalesModalComponent,
    OptionsComponent,
    MessageModalComponent,
    AddMessageComponent,
    TemplateComponent,
    PushStoryComponent,
    ChooseProductModalComponent,
    CommentsModalComponent,
    WatchProductsModalComponent,
    CategoriesModalComponent
  ],
  providers: [AuthGuard, AuthenticationService, FormService, HttpService, StoreService, AppStore, {provide: MatPaginatorIntl, useClass: MaterialaginatorIntl}],
  imports: [
    CommonModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    AdminRoutingModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule
  ],
  entryComponents: [
    WatchProductsModalComponent,
    ChooseProductModalComponent,
    CommentsModalComponent,
    CategoriesModalComponent
  ]
})
export class AdminModule {
}
