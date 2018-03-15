import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { GlobalProvider } from "../global/global";
import { ReqLogin, ResLogin, ResLogout } from "../../interfaces/session";

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {

  constructor(public http: HttpClient, public gp: GlobalProvider) {
    console.log('Hello SessionProvider Provider');
  }
    login(loginInfo: ReqLogin): Observable<ResLogin> {
        let url = this.gp.backendServer + this.gp.backend.endpoints.session.login;
        return this.http.post(url, loginInfo)
            .map(res => <ResLogin> res)
            .do(dataReceived => console.log(dataReceived));
    }
    logout(uuid: string): Observable<ResLogout> {
        let url = this.gp.backendServer + this.gp.backend.endpoints.session.logout;
        url += '/' + uuid;
        return this.http.get(url)
            .map(res => <ResLogout> res)
            .do(dataReceived => console.log(dataReceived));
    }
}
