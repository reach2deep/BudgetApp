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

  storageSetLanguage(lang) {
    this.storageLang = lang;
    this.storage.set('option0', lang);
  }
  storageSet(isenabled, pwd, email) {
    this.storageTouchid = isenabled;
    this.storagePwd = pwd;
    this.storageEmail = email;
    this.storage.set('ml1', isenabled);
    this.storage.set('ml2', pwd);
    this.storage.set('ml3', email);
  }
  storageSetEmail(email) {
    this.storageEmail = email;
    this.storage.set('ml3', email);
  }
  storageClean() {
    this.storageTouchid = false;
    this.storagePwd = '';
    this.storageEmail = '';
    this.storage.set('ml1', false);
    this.storage.set('ml2', '');
    this.storage.set('ml3', '');
  }

}