import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class StoreService {
  private messageStateName$ = new Subject();
  private productStateName$ = new Subject();
  private messageAction$ = new Subject();
  private productAction$ = new Subject();
  private messageId$ = new Subject();
  private productId$ = new Subject();
  private refreshMessages = new Subject();
  private refresh$ = new Subject();

  obsMessageStateName$(): Observable<any> {
    return this.messageStateName$.asObservable();
  }

  obsProductStateName$(): Observable<any> {
    return this.productStateName$.asObservable();
  }

  obsMessageAction$(): Observable<any> {
    return this.messageAction$.asObservable();
  }

  obsProductAction$(): Observable<any> {
    return this.productAction$.asObservable();
  }

  obsMessageId(): Observable<any> {
    return this.messageId$.asObservable();
  }

  obsProductId$(): Observable<any> {
    return this.productId$.asObservable();
  }

  obsRefreshMessages(): Observable<any> {
    return this.refreshMessages.asObservable();
  }

  obsRefresh$(): Observable<any> {
    return this.refresh$.asObservable();
  }

  nextMessageStateName$(name: any) {
    this.messageStateName$.next(name);
  }

  nextProductStateName$(name: any) {
    this.productStateName$.next(name);
  }

  nextMessageAction$(action: any) {
    this.messageAction$.next(action);
  }

  nextProductAction$(action: any) {
    this.productAction$.next(action);
  }

  nextMessageId(id) {
    this.messageId$.next(id);
  }

  nextProductId(id) {
    this.productId$.next(id);
  }

  nextRefreshMessages() {
    this.refreshMessages.next();
  }

  nextRefresh$() {
    this.refresh$.next();
  }

}
