import {Component, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignInPage } from "../sign-in/sign-in";
import { TextViewPage } from "../text-view/text-view";
import { GlobalProvider } from "../../providers/global/global";
import { SignUpPage } from "../sign-up/sign-up";
import { RegistrationProvider} from "../../providers/registration/registration";
import { SessionProvider } from "../../providers/session/session";
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage implements OnInit {
  retry: boolean = false;
  loginMode = false;
  login = {
    username: "",
    password: ""
  };
  displayLogin: boolean = false;
  hideFooter: boolean = false;
  @ViewChild('usernameInput') usernameInput;
  @ViewChild('passwordInput') passwordInput;
  constructor(public navCtrl: NavController, public navParams: NavParams, public gp: GlobalProvider,
              public registrationProvider: RegistrationProvider,
              public sessionProvider: SessionProvider, private keyboard: Keyboard,
              public platform: Platform) {
  }
  ngOnInit() {
    this.registrationProvider.getReady()
      .subscribe( res => {
        if(this.retry) {
          this.gp.dismissLoader();
        }
          this.retry = false;
          this.gp.app = {
            countries : res.data.countries,
            services : res.data.services,
            texts :  res.data.texts,
            privacyOptions: res.data.privacyOptions
          }
        },
        (error) =>{
          console.log(error.error);
          if(!this.retry) {
            this.retry = true;
            this.gp.presentLoader("Our systems are facing difficulties. Please wait or come back later...");
          }
          setTimeout(() =>{
            this.ngOnInit();
          },10 * 1000);
        });
  }
  touchLogin(){
    this.loginMode = true;
    setTimeout(() =>{
      this.usernameInput.setFocus();
      this.displayLogin = true;
    },500);
  }
  touchSignUp(){
    this.navCtrl.push(TextViewPage, {
      title: 'Terms',
      button: 'I agree',
      buttonFunction : () => {
        this.gp.rootPage = SignUpPage;
      },
      text : this.gp.app.texts.tos
    });
  }
  touchFaq() {
    this.navCtrl.push(TextViewPage, {
      title: 'F.A.Q.',
      button: '',
      text : 'Silvio Santos Ipsum mah roda a roduamm. O arriscam tuduam, valendo um milhão de reaisuam. Wellintaaammmmmmmmm. Ha haeeee. Hi hi. Valendo um milhão de reaisammm. Eu não queria perguntar isso publicamente, ma vou perguntar. Carla, você tem o ensino fundamentauam? É bom ou não éam? O Raul Gil é gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil é gayamm! Ma vejam só, vejam só.\n' +
      '\n' +
      ' Você veio da caravana de ondeammm? Boca sujuam... sem vergonhuamm. Eu não queria perguntar isso publicamente, ma vou perguntar. Carla, você tem o ensino fundamentauam? Ma quem quer dinheiroam? Ha hai. Bem boladoam, bem boladoam. Bem gozadoam. Patríciaaammmm... Luiz Ricardouaaammmmmm. É com você Lombardiam. Ma! Ao adquirir o carnê do Baú, você estará concorrendo a um prêmio de cem mil reaisam. O prêmio é em barras de ouro, que vale mais que dinheiroam.\n' +
      '\n' +
      ' Ma vejam só, vejam só. Mah roda a roduamm. Ha haeeee. Hi hi. É dinheiro ou não éam? Ma vale dérreaisam? O Raul Gil é gayam! ... Maa O Ah Ae! Ih Ih! O Raul Gil é gayamm! É bom ou não éam? O arriscam tuduam, valendo um milhão de reaisuam. É namoro ou amizadeemm? Eu só acreditoammmm.... Vendoammmm. Ma tem ou não tem o celular do milhãouamm? Ma quem quer dinheiroam?\n' +
      '\n' +
      ' Mah é a porta da esperançaam. Ma o Silvio Santos Ipsum é muitoam interesanteam. Com ele ma você vai gerar textuans ha haae. Mah você não consegue né Moisés? Você não consegueam. É bom ou não éam? Boca sujuam... sem vergonhuamm. Ha haeeee. Hi hi. O prêmio é em barras de ouro, que vale mais que dinheiroam. É bom ou não éam? Mah você mora com o papai ou com a mamãem?\n' +
      '\n' +
      ' Ma o Silvio Santos Ipsum é muitoam interesanteam. Com ele ma você vai gerar textuans ha haae. Eu não queria perguntar isso publicamente, ma vou perguntar. Carla, você tem o ensino fundamentauam? Patríciaaammmm... Luiz Ricardouaaammmmmm. Qual é a musicamm? Ma não existem mulher feiam, existem mulher que não conhece os produtos Jequitiamm. Mah ooooee vem pra cá. Vem pra cá. Ma tem ou não tem o celular do milhãouamm? Vem pra lá, mah você vai pra cá. Agora vai, agora vem pra láamm. Você veio da caravana de ondeammm? Valendo um milhão de reaisammm. Ma vejam só, vejam só.'
    });
  }
  touchLogMeIn(){

  }
  touchCancelLogin() {
    this.displayLogin = false;
    setTimeout(() =>{
      this.loginMode = false;
      this.hideFooter = false

    },500);
  }
}
