import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {TableComponent} from './table/table.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {MapsComponent} from './maps/maps.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {ApplicationInfoComponent} from "./application-info/application-info.component";
import {ShopInfoComponent} from "./shop-info/shop-info.component";
import {AuthGuard} from "./auth-guard.guard";
import {NewsComponent} from "./news/news.component";
import {CategoriesComponent} from "./categories/categories.component";
import {ProductsComponent} from "./products/products.component";
import {CommentsComponent} from "./comments/comments.component";
import {BasketComponent} from "./basket/basket.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {SalesComponent} from "./sales/sales.component";
import {PushStoryComponent} from "./push-story/push-story.component";
import {AdminComponent} from "./admin.component";
import {NgModule} from "@angular/core";

export const AdminRoutes: Routes = [{
    path: '', component: AdminComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: 'app-info', canActivate: [AuthGuard], component: ApplicationInfoComponent, pathMatch: 'full'},
      {path: 'shop-info', canActivate: [AuthGuard], component: ShopInfoComponent, pathMatch: 'full'},
      {path: 'table', component: TableComponent, pathMatch: 'full'},
      {path: 'typography', canActivate: [AuthGuard], component: TypographyComponent, pathMatch: 'full'},
      {path: 'icons', component: IconsComponent, pathMatch: 'full'},
      {path: 'maps', canActivate: [AuthGuard], component: MapsComponent, pathMatch: 'full'},
      {path: 'notifications', canActivate: [AuthGuard], component: NotificationsComponent, pathMatch: 'full'},
      {path: 'news', canActivate: [AuthGuard], component: NewsComponent, pathMatch: 'full'},
      {path: 'sales', canActivate: [AuthGuard], component: SalesComponent, pathMatch: 'full'},
      {path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent, pathMatch: 'full'},
      {path: 'products', canActivate: [AuthGuard], component: ProductsComponent, pathMatch: 'full'},
      {path: 'comments/:comments', canActivate: [AuthGuard], component: CommentsComponent, pathMatch: 'full'},
      {path: 'basket', canActivate: [AuthGuard], component: BasketComponent, pathMatch: 'full'},
      {path: 'gallery', canActivate: [AuthGuard], component: GalleryComponent, pathMatch: 'full'},
      {path: 'push-story', canActivate: [AuthGuard], component: PushStoryComponent, pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
