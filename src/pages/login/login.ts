import { AuthManager } from './../../providers/AuthManager';
import { AuthService } from './../../providers/auth-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: 'admin',
    password: 'admin'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public alertController: AlertController,
    public menuCtrl: MenuController,    
    public auth: AuthManager) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
  doLogin() {

    console.log(JSON.stringify(this.account));
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (error) => {
      //this.navCtrl.push(MainPage);
      console.log(<any>error);
     // console.log(data);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  onLogin(form) {
    
    
    
      this.auth.LoadingControllerShow();
      this.auth.login(this.account).subscribe(result=>{
        this.auth.LoadingControllerDismiss();
        //this.navCtrl.push(MainPage);
        this.navCtrl.setRoot(MainPage, { pageReferrer: 'Expense' });
      }, (error) => {
        //this.navCtrl.push(MainPage);
        console.log(<any>error);
       // console.log(data);
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        
      });
    
  }

  LoginSuccess() {
    setTimeout(() => {
      this.navCtrl.push(MainPage, {}, {animate: true, direction: 'forward'});
    }, 1000);
  }

  LoginError(error) {
    let alert = this.alertController.create({
      title: 'Login Failed',
      subTitle: 'Please check your email and/or password and try again',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            //do handler stuff here
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }
}
