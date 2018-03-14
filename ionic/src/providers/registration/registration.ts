import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from "../global/global";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {  ResSendSMS,
          ResCheckAvailability,
          ResGetReady, ReqRegister,
          ReqConfirmSMS, ResRegister,
          ResConfirmSMS} from "../../interfaces/registration";
@Injectable()
export class RegistrationProvider {
  constructor(public http: HttpClient, public gp: GlobalProvider) {

  }
  getReady(): Observable<ResGetReady> {
    let url = this.gp.backendServer + this.gp.backend.endpoints.registration.getReady;
    console.log(url);
    return this.http.get(url)
      .map(res => <ResGetReady> res)
      .do(dataReceived => console.log(dataReceived));
  }
  sendSMS(mobileNumber: string): Observable<ResSendSMS> {
    let url = this.gp.backendServer + this.gp.backend.endpoints.registration.sendSMS;
    return this.http.post(url, {mobileNumber: mobileNumber})
      .map(res => <ResSendSMS> res)
      .do(dataReceived => console.log(dataReceived));
  }
  confirmSMS(body: ReqConfirmSMS): Observable<ResConfirmSMS> {
    let url = this.gp.backendServer + this.gp.backend.endpoints.registration.confirmSMS;
    return this.http.post(url, body)
      .map(res => <ResConfirmSMS> res)
      .do(dataReceived => console.log(dataReceived));
  }
  checkAvailability(endPoint: string, context: string, data: string): Observable<ResCheckAvailability> {
    let url = this.gp.backendServer + this.gp.backend.endpoints.registration[endPoint];
    let params = new HttpParams();
    params = params.append(context, data);
    return this.http.get(url,{params: params})
      .map(res => <ResCheckAvailability> res)
      .do(dataReceived => console.log(dataReceived))
  }
  register(body: ReqRegister): Observable<ResRegister> {
    let url = this.gp.backendServer + this.gp.backend.endpoints.registration.register;
    return this.http.post(url, body)
      .map(res => <ResRegister> res)
      .do(dataReceived => console.log(dataReceived));
  }
}
