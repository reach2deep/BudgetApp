import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  
  private authState;
  private userauth;
  private userdata;
  private housedata;
  private profilepicdata;
  private housepicdata;
  private loading: any;
  
  public user;
  public storageLang: string;
  public storageTouchid: boolean = false;
  public storageEmail: string;
  public storagePwd: string;
  public referrer: string;
  public pwdNotes: string;
  pages: Array<{id: string, title: string, component: any, icon: string, color: string}>;

  constructor(
    public storage: Storage,   
    public loadingCtrl: LoadingController) {
    
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