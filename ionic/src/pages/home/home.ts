import { Component } from '@angular/core';
import { GlobalProvider} from "../../providers/global/global";
import { SessionProvider } from "../../providers/session/session";
import { WelcomePage } from "../welcome/welcome";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public gp: GlobalProvider, public sessionProvider: SessionProvider) {

  }
  touchLogout() {
      //no sense to avoid a logoff in case of any kind of error.
      this.sessionProvider.logout(this.gp.user.session.token);
      this.gp.deleteLocalDB('user');
      this.gp.rootPage = WelcomePage;
  }
}
