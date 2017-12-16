import { LoadingController } from 'ionic-angular';
import { Api } from './api/api';
import { User } from './user/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class AuthManager {
    
    utility: User;
    private loading: any;

    constructor(utility: User,public api: Api,public loadingCtrl: LoadingController) {        
        this.utility = utility;
    }

    isAuthenticated() {
        if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
            return false;
        } else {
            return true;
        }
    }

    getAuthToken() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user"))._id;
        } else {
            return null;
        }
    }

    getUserEmail() {
        if (localStorage.getItem("user")) {
            return JSON.parse(localStorage.getItem("user")).email;
        } else {
            return null;
        }
    }

    login(accountInfo: any) {
        // return new Promise((resolve, reject) => {
        //     this.utility.login("/api/user/login", [email, password]).then((result) => {
        //         if(result) {
        //             localStorage.setItem("user", JSON.stringify(result));
        //             resolve(result);
        //         } else {
        //             reject("User not found");
        //         }
        //     }, (error) => {
        //         reject(error);
        //     });
        // });

        let seq = this.api.post('user/login', accountInfo).share();
   
        seq.subscribe((res: any) => {         
          if (res.success == true) {
            console.log('success');
            localStorage.setItem("user", JSON.stringify(res));           
          } else {
            err => {
              console.error('ERROR SERVICE login', res.statusText);
            }
          }
        }, err => {
          console.error('ERROR SERVICE', JSON.stringify(err));
        });
    
        return seq;
    }

    logout() {
        localStorage.clear();
    }

    LoadingControllerShow() {
        this.loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Please wait...',
        });
        this.loading.present();
      }
    
      LoadingControllerDismiss() {
        this.loading.dismiss();
      }
}
