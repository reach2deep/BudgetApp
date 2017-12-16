import { TransactionService } from './../../providers/TransactionService';

import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: any;

  constructor(public navCtrl: NavController, 
    public expenseService: TransactionService, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,) {
    this.currentItems = this.loadItems() ;//this.expenseService.getItemsList();
    
    console.log('RES' , JSON.stringify(this.currentItems ));
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.expenseService.add(item,'rer');
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.expenseService.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

    // Attempt to login in through our User service
    loadItems() {
      
          
      this.expenseService.getItemsList().subscribe((resp) => {
            console.log(JSON.stringify(resp));
            this.currentItems = resp;
          }, (err) => {
            //this.navCtrl.push(MainPage);
            // Unable to log in
            let toast = this.toastCtrl.create({
              message: err,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
        }
}
