import { DateTime } from 'ionic-angular/components/datetime/datetime';
export interface ITransaction {
    _id: string;
    transactionDate: string;
    transactionType: string;
    category: string;
    categoryid: string;   
    amount: string;
    account: string; 
    accountId: string; 
    payee: string;
    payeeid: string;
    notes: string;   
    photos;
    createdby: string;
    createdAt: string;
    modifiedby: string;
    modifiedAt: string;
    approvedby: string;
    approvedAt: string;
    iscleared: boolean;
    isphoto: boolean;    
  }
  

  export class Transaction implements ITransaction {
  
    public _id: string = '';
    public transactionDate: string;
    public transactionType: string = '';
    public category: string = '';
    public categoryid: string = '';
    public amount: string;
    public account: string = '';
    public accountId: string = '';
    public payee: string = '';
    public payeeid: string = '';
    public notes: string = '';
    public photos = [] ;
    public createdby: string = '';
    public createdAt: string = '';
    public modifiedby:string = '';
    public modifiedAt: string = '';
    public approvedby: string = '';
    public approvedAt: string = '';
    public iscleared: boolean = false;
    public isphoto: boolean = false;    
  
    constructor() {}
  
    fromData(transaction?: ITransaction) {
     // this._id = (transaction._id == undefined)? '' : transaction._id;    
      this.transactionDate =  transaction.transactionDate;    
      this.transactionType = (transaction.transactionType == undefined)? '' : transaction.transactionType;
      this.category = (transaction.category == undefined)? '' : transaction.category;
      this.categoryid = (transaction.categoryid == undefined)? '' : transaction.categoryid;
      this.amount =  (transaction.amount == undefined)? '' : transaction.amount;
      this.account = (transaction.account == undefined)? '' : transaction.account;
      this.accountId = (transaction.accountId == undefined)? '' : transaction.accountId;
      this.payee = (transaction.payee == undefined)? '' : transaction.payee;
      this.payeeid = (transaction.payeeid == undefined)? '' : transaction.payeeid;
      this.notes = (transaction.notes == undefined)? '' : transaction.notes;
      this.photos =  transaction.photos;
      this.createdby = (transaction.createdby == undefined)? '' : transaction.createdby;
      this.createdAt = (transaction.createdAt == undefined)? '' : transaction.createdAt;
      this.modifiedby = (transaction.modifiedby == undefined)? '' : transaction.modifiedby;
      this.modifiedAt = (transaction.modifiedAt == undefined)? '' : transaction.modifiedAt;
      this.approvedby = (transaction.approvedby == undefined)? '' : transaction.approvedby;
      this.approvedAt = (transaction.approvedAt == undefined)? '' : transaction.approvedAt;
      this.iscleared  = (transaction.iscleared == undefined)? false : transaction.iscleared;
      this.isphoto = (transaction.isphoto == undefined)? false : transaction.isphoto;   
    }
  
    toString() {
      let trans = {  
        '_id' : this._id,    
        'transactionDate': this.transactionDate,
        'transactionType': this.transactionType,
        'category': this.category,
        'categoryid': this.categoryid,
        'amount': this.amount,
        'account':this.account,
        'accountId':this.accountId,
        'payee': this.payee,
        'payeeid': this.payeeid,
        'notes': this.notes,   
        'photos': this.photos,
        'createdby': this.createdby,
        'createdAt': this.createdAt,
        'modifiedby': this.modifiedby,
        'modifiedAt': this.modifiedAt,
        'approvedby': this.approvedby,
        'approvedAt': this.approvedAt,
        'iscleared': this.iscleared,
        'isphoto': this.isphoto,  
      }
      return trans;
    }

    // reset(transaction?: ITransaction) {
    //   this._id ='';
    //   this.transactionDate ;    
    //   this.transactionType ='';
    //   this.category ='';
    //   this.categoryid = '';
    //   this.amount = '';
    //   this.account = '';
    //   this.payee = '';
    //   this.payeeid = '';
    //   this.notes ='';
    //   this.photo = '';
    //   this.createdby = '';
    //   this.createdAt = '';
    //   this.modifiedby = '';
    //   this.modifiedAt = '';
    //   this.approvedby = '';
    //   this.approvedAt = '';
    //   this.iscleared  = false;
    //   this.isphoto = false;   
    // }
     
  }