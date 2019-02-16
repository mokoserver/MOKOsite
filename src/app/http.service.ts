import {Injectable} from '@angular/core';
import {User} from './models/users';
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './autentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private baseUri = 'https://moko.by:8443/restapi/v1.1/';
  // private baseUri = 'http://35.157.244.150:5000/restapi/v1.1/';
  private menuitems = 'catalog/menuitems';
  private catalogUser = 'catalog/user';
  private catalogShop = 'catalog/shop';
  private catalogApp = 'catalog/application';
  private catalogMessages = 'catalog/messages';
  private catalogCategory = 'catalog/categories';
  private catalogProducts = 'catalog/products';
  private catalogImage = 'catalog/image';
  private catalogOrders = 'catalog/orders';

  // C - create (http.post)
  // R - read (http.get)
  // U - put (http.put)
  // D - delete (http.delete)
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getMenuItems(login, password): Observable<any> {
    return this.http.get(this.baseUri.concat(this.menuitems), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  /**
   * Получить список пользователей.
   * @returns {Observable<R|T>}
   */
  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUri.concat(this.catalogUser))
        .catch(this.handleError);
  }

  /**
   * Создать пользователя.
   * @param form
   * @returns {Observable<R|T>}
   */
  postUser(form: FormGroup): Observable<User> {
    return this.http.post(this.baseUri.concat(this.catalogUser), form.value)
        .catch(this.handleError);
  }

  /**
   * Обновить пользователя
   * @param id
   * @param form
   * @returns {Observable<R|T>}
   */
  putUser(id, form: FormGroup): Observable<User> {
    return this.http.put(this.baseUri.concat(this.catalogUser + '${id}'), form.value)
        .catch(this.handleError);
  }

  getShop(): Observable<any> {
    return this.http.get(this.baseUri.concat(this.catalogShop), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  postShop(form: FormGroup): Observable<any> {
    return this.http.post(this.baseUri.concat(this.catalogShop), {}, {headers: this.getAuthHeaders(form, true)})
        .catch(this.handleError);
  }

  putShop(form: FormGroup): Observable<any> {
    return this.http.put(this.baseUri
        .concat(this.catalogShop)
        .concat(`/${form.value['_id']}`), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  getApp(): Observable<any> {
    return this.http.get(this.baseUri.concat(this.catalogApp), {headers: this.getAuthHeaders()})
        .catch(this.handleError);
  }

  postApp(form: FormGroup): Observable<any> {
    return this.http.post(this.baseUri.concat(this.catalogApp), {
      colorsheme: 0,
      iconpack: 0,
      layout: 0,
      'menuitems': [
        'Новости',
        'Акции',
        'Галерея'
      ]
    }, {headers: this.getAuthHeaders(form, true)})
        .catch(this.handleError);
  }

  putApp(form: FormGroup): Observable<any> {
    return this.http.put(this.baseUri
        .concat(this.catalogApp)
        .concat(`/${form.value['_id']}`), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  getMessage(message: string): Observable<any> {
    const params = new HttpParams().set('category', message);
    return this.http.get(this.baseUri.concat(this.catalogMessages), {headers: this.getAuthHeaders(), params: params})
        .map(message => {
          const mess = <any>message;
          for (let i = 0; i < mess.length; i++) {
            if (mess[i].images) {
              for (let j = 0; j < mess[i].images.length; j++) {
                mess[i].images[j] = this.getImage(mess[i].images[j].id)
              }
            }
          }
          return mess
        })
        .catch(this.handleError);
  }

  getMessageById(id): Observable<any> {
    return this.http.get(this.baseUri
        .concat(this.catalogMessages)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .map(messageBody => messageBody[0])
        .catch(this.handleError)
  }

  deleteMessage(id): Observable<any> {
    return this.http.delete(this.baseUri
        .concat(this.catalogMessages)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  putMessage(messageBody: FormGroup): Observable<any> {
    return this.http.put(
        this.baseUri
            .concat(this.catalogMessages)
            .concat(`/${messageBody.value['_id']}`), messageBody.value, {
          headers: this.getAuthHeaders(null, true)
        })
        .catch(this.handleError)
  }

  postMessage(messageBody: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogMessages), messageBody.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  getImage(id): Observable<any> {
    return this.http.get(this.baseUri
        .concat(this.catalogImage)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .map(messageBody => messageBody['image'])
        .catch(this.handleError)
  }

  postCategory(form: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogCategory), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  getCategories(): Observable<any> {
    return this.http
        .get(this.baseUri
            .concat(this.catalogCategory), {headers: this.getAuthHeaders()})
        .filter(data => Boolean(data))
        .map(data => {
          for (const item of <any[]>data) {
            if (item.images && item.images.length) { item.images[0] = this.getImage(item.images[0].id) }
          }
          return data
        })
        .catch(this.handleError);
  }

  getCategoryById(id): Observable<any> {
    return this.http
        .get(this.baseUri
            .concat(this.catalogCategory)
            .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .filter(data => Boolean(data))
        .map(data => data[0])
        .map(data => {
          if (data.images && data.images.length) { data.images[0].image = this.getImage(data.images[0].id) }
          return data
        })
        .catch(this.handleError);
  }

  putCategory(form: FormGroup): Observable<any> {
    return this.http.put(
        this.baseUri
            .concat(this.catalogCategory)
            .concat(`/${form.value['_id']}`), form.value, {
          headers: this.getAuthHeaders(null, true)
        })
  }

  deleteCategory(id): Observable<any> {
    return this.http
        .delete(this.baseUri.concat(this.catalogCategory).concat(`/${id}`), {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  postProduct(form: FormGroup): Observable<any> {
    return this.http
        .post(this.baseUri.concat(this.catalogProducts), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  duplicateProduct(form: FormGroup): Observable<any> {
    form.value['_id'] = undefined;
    return this.http
        .post(this.baseUri.concat(this.catalogProducts), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  putProduct(form: FormGroup): Observable<any> {
    return this.http
        .put(this.baseUri
            .concat(this.catalogProducts)
            .concat(`/${form.value['_id']}`), form.value, {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }

  getProducts(category?, page?, pageSize?, filter?): Observable<any[]> {
    let params = new HttpParams();

    if (category) {
      params = params.set('category', category);
    }
    if (filter) {
      params = params.set('filter', `${filter.key}:${filter.value}`);
    }

    if (pageSize) {
      let offset = page * pageSize;
      params = params.set('offset', offset.toString());
      params = params.set('perPage', pageSize.toString());
    }

    console.log(params)
    
    return this.http
      .get(this.baseUri.concat(this.catalogProducts), {headers: this.getAuthHeaders(), params: params})
      .map(items => {
        const item = <any>items;
        for (let i = 0; i < item.length; i++) {
          if (item[i].images) {
            for (let j = 0; j < item[i].images.length; j++) {
              item[i].images[j] = this.getImage(item[i].images[j].id)
            }
          }
        }
        return item
      })
      .catch(this.handleError);
  }

  getProductById(id): Observable<any> {
    return this.http.get(this.baseUri
        .concat(this.catalogProducts)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .map(messageBody => messageBody[0])
        .catch(this.handleError)
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(this.baseUri
        .concat(this.catalogProducts)
        .concat(`/${id}`), {headers: this.getAuthHeaders()})
        .catch(this.handleError)
  }

  getOrders() {
    let params = new HttpParams();
    params = params.set('deviceid', this.auth.getUserUsername());
    return this.http.get(this.baseUri
        .concat(this.catalogOrders), {headers: this.getAuthHeaders(), params: params})
        .catch(this.handleError);
  }

  postNewOrder(productId, quantity) {
    const orderitems = [{
      id: productId,
      quantity: quantity
    }];
    const user = this.auth.getLoginAndPassword();
    const value = {
      deviceid: user.login,
      date: new Date(),
      orderitems: orderitems
    };
    return this.http
        .post(this.baseUri.concat(this.catalogOrders), value,
            {headers: this.getAuthHeaders(null, true)})
        .catch(this.handleError)
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private getAuthHeaders(form?: FormGroup, isPost?: boolean): HttpHeaders {
    let user;
    if (form) {
      user = {login: form.value['login'], password: form.value['password']};
    } else {
      user = this.auth.getLoginAndPassword();
    }
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(user.login + ':' + user.password));
    if (isPost) headers = headers.append('Content-Type', 'application/json');
    if (isPost) headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }
}
