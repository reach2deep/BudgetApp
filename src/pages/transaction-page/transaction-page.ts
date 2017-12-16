import { AuthManager } from './../../providers/AuthManager';

import { HttpClient,HttpResponse } from '@angular/common/http';
import { TransactionService } from './../../providers/TransactionService';
import { User } from './../../providers/user/user';
import { TransactionData } from './../../providers/transaction-data';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../providers/auth-service';
import { Transaction } from './../../models/transaction.model';
import { Component } from '@angular/core';
import { IonicPage, ActionSheetController,ModalController, NavController, ToastController, ItemSliding, NavParams,Platform } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';


import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { CategoryListPage } from '../categorylist-page/categorylist-page';
import { Response } from '@angular/http/src/static_response';

declare var cordova: any;

@IonicPage()
@Component({
    moduleId: 'module.id',
    selector: 'transaction-page',
    templateUrl: 'transaction-page.html',
    styleUrls: ['/transaction-page.scss']
})
export class TransactionPage {
    validationMessage: string;
    showValidationMessage: boolean = false;
    title: string;
    transaction: Transaction;
    displaydate;
    displaytime;
    mode;
    transactionType;
    lastImage: string = null;

    url: string = 'http://localhost:3000/api'; //'https://v-farm.herokuapp.com/api/';

    

    constructor(
        public nav: NavController,
        public modalController: ModalController,
        public navParams: NavParams,
        public auth: AuthManager,
        public transactionData: TransactionData,
        public user: User,
        private camera: Camera,
        public actionSheetCtrl: ActionSheetController, 
        private transfer: Transfer, 
        private file: File, 
        private filePath: FilePath,
        private platform: Platform,
        public toastCtrl: ToastController,
      public transactionService : TransactionService
      ) {    
          
        
  
     
      //New/Edit
      this.mode = this.navParams.data.paramMode;
      //Expense/Income
      this.transactionType=this.navParams.data.paramTransactionType

     
      if (this.mode === 'New') {
        console.log('MODE NEW : '+this.mode);
       
        this.transaction = new Transaction();
        this.title =  this.mode + ' ' + this.transactionType;
        this.transaction.transactionType=this.transactionType;
        //this.transaction.
        this.transaction.transactionDate= moment().format(); 
        this.transaction.createdAt = moment().format();
        this.transaction.createdby = this.user._user
        
       this.transactionData.reset();

      } else {
        console.log('MODE EDIT: '+this.mode);

        this.transaction = new Transaction();
        this.title =  this.mode + ' ' + this.transactionType;   
        this.transaction.fromData(this.navParams.data.paramTransaction);
        
      // Determine typedisplay if missing: Income / Expense
          if (this.transaction.transactionType === '') {
            this.transaction.transactionType = this.transaction.transactionType
          }
          console.log(this.transactionType);
        //Prepare services
        this.transactionData.setTransactionType(this.transaction.transactionType);
        this.transactionData.setPayee(this.transaction.payee);
        this.transactionData.setPayeeId(this.transaction.payeeid);
        this.transactionData.setCategory(this.transaction.category);
        this.transactionData.setCategoryId(this.transaction.categoryid);
        this.transactionData.setAmount(this.transaction.amount);
        this.transactionData.setNotes(this.transaction.notes);
      }
    }

   

    ionViewDidLoad() {
        console.log('ionViewDidLoad');
      }
     
      submitForm(value: any):void{
        console.log('Form submitted!')
        console.log(value);
      }	
  
    ionViewWillEnter() {
  
      let referrer = this.transactionData.getReferrer();
      switch (referrer) {
        case 'TransactionsPage': {
          break;
        }
        case 'PickCategoryPage': {
          // Payee
          this.transaction.category = this.transactionData.getCategory();
          this.transaction.categoryid = this.transactionData.getCategoryId();          
          break;
        }
        case 'PickPayeePage': {
          // Payee
          this.transaction.payee = this.transactionData.getPayee();
          this.transaction.payeeid = this.transactionData.getPayeeId();          
          break;
        }
      }
    }

    addMedia(){

      let actionSheet = this.actionSheetCtrl.create({
        title: 'Select Image Source',
        buttons: [
          {
            text: 'Load from Library',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

    public takePicture(sourceType) {
      // Create options for the Camera Dialog
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };
     
      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
      }, (err) => {
        this.presentToast('Error while selecting image.');
      });
    
    }

    // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
    //this.transaction.photos.push(this.file.readAsDataURL(this.lastImage));
  }, error => {
    this.presentToast('Error while storing file.');
     console.log(JSON.stringify(error));
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}

public pickCategory() { 
  
  this.auth.LoadingControllerShow();
  console.log(JSON.stringify(this.transaction));
  this.nav.push('CategoryListPage');
}

public pickPayee() {  
  this.auth.LoadingControllerShow();
  console.log(JSON.stringify(this.transaction));
  this.nav.push('PayeeListPage');
}



// public myCallbackFunction = (_params) => {
//   console.log('myCallbackFunction');
//   return new Promise((resolve, reject) => {
//      JSON.stringify(this.transactionData);
//       resolve();
//   });
//  }


    //   console.log('addMedia');

    //   const options: CameraOptions = {
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE
    //   }
      
    //   this.camera.getPicture(options).then((imageData) => {
    //    // imageData is either a base64 encoded string or a file URI
    //    // If it's base64:
    //    let base64Image = 'data:image/jpeg;base64,' + imageData;
        
    //    console.log(base64Image);
    //    this.transaction.photos.push(base64Image);
    //   }, (err) => {
    //    // Handle error
    //   });

    // }

    deletePhoto(index){
      this.transaction.photos.splice(index, 1);
   }


  
    save() {

      this.showValidationMessage = false;
      console.log('submitting form');

      console.log('this.transaction.amount ' , this.transaction.amount);
      // if (this.transaction.amount === undefined || this.transaction.amount === '') 
      //   {
      //     console.log('TRUES  ');
      //   }
      

   
      
  
      // Validate form data
      if (this.transaction.transactionType === 'undefined' || this.transaction.transactionType === '') {
        this.showValidationMessage = true;
        this.validationMessage = "Please select Transaction Type"
        return;
      }
      if (this.transaction.amount === undefined || this.transaction.amount === '') {
        this.showValidationMessage = true;
        this.validationMessage = "Please enter an amount for this transaction"
        return;
      }
      if (this.transaction.category === 'undefined' || this.transaction.category === '') {
        this.showValidationMessage = true;
        this.validationMessage = "Please select a Category"
        return;
      }
      if (this.transaction.payee === 'undefined' || this.transaction.payee === '') {
        this.showValidationMessage = true;
        this.validationMessage = "Please select a Payee"
        return;
      }
     

      console.log(JSON.stringify(this.transaction));
  
    //   // Format date and time in epoch time
    //   let dtDateISO = moment(this.displaydate, moment.ISO_8601);
    //   let dtHour;
    //   let dtMinutes;
    //   if (this.mode === 'New') {
    //     dtHour = moment(this.displaytime, 'HH:mm').format("HH");
    //     dtMinutes = moment(this.displaytime, 'HH:mm').format("mm");
    //   } else {
    //     dtHour = moment(this.displaytime, moment.ISO_8601).format("HH");
    //     dtMinutes = moment(this.displaytime, moment.ISO_8601).format("mm");
    //   }
    //   let iHour = parseInt(dtHour);
    //   let iMinute = parseInt(dtMinutes);
    //   let dt = dtDateISO.hour(iHour).minutes(iMinute);
    //   let dtTran = moment(dt, 'MMMM D, YYYY hh:mm a').valueOf();
    //   this.transaction.date = dtTran;
      
    //   //console.log(this.displaydate);
    //   //console.log(this.displaytime);
    //   //console.log(dtDateISO);
    //   //console.log(dtHour, dtMinutes);
    //   //console.log(dtTran);
  
    //   // Handle Who
    //   this.transaction.addedby = this.auth.user.nickname;
  
    //   //
    //   // Handle transaction type for Transfers
    //   //
    //   if (this.transaction.typedisplay === "Transfer" && this.account.$key === this.transaction.accountToId) {
    //     this.transaction.type = 'Income';
    //     this.transaction.istransfer = true;
    //   } else if (this.transaction.typedisplay === "Transfer" && this.account.$key !== this.transaction.accountToId) {
    //     this.transaction.type = 'Expense';
    //     this.transaction.istransfer = true;
    //   } else {
    //     this.transaction.accountFrom = '';
    //     this.transaction.accountFromId = '';
    //     this.transaction.accountTo = '';
    //     this.transaction.accountToId = '';
    //     this.transaction.type = this.transaction.typedisplay;
    //     this.transaction.istransfer = false;
    //   }
  
      if (this.mode === 'New') {
        this.auth.LoadingControllerShow();
        //
        // Create New Transaction
        //
//this.transactionService.getExpenseList().

        this.transactionService.add(this.transaction,this.transactionType).subscribe(response=>
          {
            console.log('In-Page' ,JSON.stringify(response));
            if (response.status === 201) {
              this.presentToast('Expense added succesfully');
              this.transactionData.setReferrer(this.transactionType);
              this.transactionData.ismodified = true;
              this.auth.LoadingControllerDismiss();
              this.nav.pop();
            }
          });
      }
      // else {
    //     //
    //     // Update Existing Transaction
    //     //
    //     this.auth.updateTransaction(this.transaction, this.account);
    //   }
    //   this.transactionData.setReferrer('TransactionPage');
    //   this.transactionData.ismodified = true;
    //   this.nav.pop();
    }
  

  }
