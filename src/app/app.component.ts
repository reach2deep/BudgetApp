import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { AuthManager } from '../providers/AuthManager';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  pages: Array<{title: string, component: any, icon: string, color: string, showloader: boolean}>;
  logoutpages: Array<{title: string, component: any, icon: string, color: string}>;

  @ViewChild(Nav) nav: Nav;

  // pages: any[] = [
  //   { title: 'Expense', component: 'TutorialPage' },
  //   { title: 'Income', component: 'WelcomePage' },
  //   { title: 'Accounts', component: 'TabsPage' },
  //   { title: 'Payee', component: 'TrsansactionsListPage' },
  //   { title: 'Category', component: 'ContentPage' },
  //   { title: 'Reports', component: 'SignupPage' },
  //   { title: 'Log-Out', component: 'LoginPage' }
  // ]



  constructor(private translate: TranslateService, 
    platform: Platform, 
    settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,   
    public alertCtrl: AlertController,
    public auth: AuthManager) {

 // App menu navigation
  this.pages = [
    { title: 'Dashboard', component: 'TabsPage', icon: 'ios-browsers-outline', color: '', showloader: false },
    { title: 'Expense', component: 'TrsansactionsListPage', icon: 'ios-browsers-outline', color: '', showloader: false },
    { title: 'Income', component: 'TrsansactionsListPage', icon: 'ios-color-wand-outline', color: '', showloader: false  },
   // { title: 'Account', component: 'ContentPage', icon: 'ios-attach-outline', color: '', showloader: true  },
    { title: 'Payees', component: 'PayeeListPage', icon: 'ios-contacts-outline', color: '', showloader: true  },
    { title: 'Categories', component: 'CategoryListPage', icon: 'ios-sync-outline', color: '', showloader: false  },
  //  { title: 'Reports', component: 'ContentPage', icon: 'ios-trending-up-outline', color: '', showloader: false  },
  //  { title: 'Settings', component: 'ContentPage', icon: 'ios-settings-outline', color: '', showloader: false  },
  ];
  this.logoutpages = [
    { title: 'Logout', component: 'LogoutPage', icon: 'md-log-out', color: '#f53d3d', }
  ];

  platform.ready().then(() => {
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });
  this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component , { pageReferrer: page.title });
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            try {
              this.auth.logout();
            } catch(error){
              console.log(error);
            }            
            this.nav.setRoot('LoginPage', {}, {animate: true, direction: 'forward'});
          }
        }
      ]
    });
    alert.present();
  }
}
