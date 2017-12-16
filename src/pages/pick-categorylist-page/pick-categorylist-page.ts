import { AuthManager } from './../../providers/AuthManager';
import { AuthService } from './../../providers/auth-service';
import { TransactionData } from './../../providers/transaction-data';
import { Component } from '@angular/core';

import { NavController, IonicPage } from 'ionic-angular';
import { CategoryService } from '../../providers/CategoryService';

@IonicPage()
@Component({
  moduleId: 'module.id',
  selector: 'pick-categorylist-page',
  templateUrl: 'pick-categorylist-page.html',
  styleUrls: ['/pick-categorylist-page.scss']
})
export class PickCategoryListPage {



  searchTerm: string = '';
  transaction;
  categoryList: any;
  loadedCategoryList: any;
  incomeCategories: {};
  expenseCategories: {};
  type: string;


  constructor(  public nav: NavController,
    public categoryService: CategoryService,
    public auth: AuthManager,
    public transactionData: TransactionData) { 
      //this.auth.LoadingControllerShow();
    }

  ionViewDidLoad() {

  
    
    this.type = 'Expense';//this.transactionData.getTransactionType();
    
    console.log(this.type);
    let result ;
    this.categoryService.getCategoryList(this.type).subscribe(
      data => {
        result=data;
        console.log('CategoryListPage ' + JSON.stringify(result));

            let rawList= [];
            result.forEach(function(cat, key){
       // var cat = spanshot.val();
        rawList.push({
          $key: cat._id,
          categoryname: cat.name,
          categorytype: cat.type,
          categoryparent: cat.parent,
          categorysort: cat.parent+":"+cat.name,
          
        });
      });
      this.expenseCategories = rawList;
      this.auth.LoadingControllerDismiss();
      console.log('CategoryListPage ' + JSON.stringify(this.expenseCategories ));
      
     });


     //this.auth.LoadingControllerDismiss();

    //this.auth.LoadingControllerDismiss();
  

  }

  selectCategory(category) {
    this.transactionData.setReferrer('PickCategoryPage');
    this.transactionData.setCategory(category.categoryname);
    this.transactionData.setCategoryId(category.$key);

    console.log(this.transactionData.category);
      console.log(this.transactionData.categoryid);
    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

}