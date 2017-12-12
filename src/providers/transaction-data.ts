import { DateTime } from "ionic-angular/components/datetime/datetime";

export class TransactionData {

  referrer: string;
  _id: string;
  transactionDate: DateTime;
  transactionType: string;
  category: string;
  categoryid: string;
  amount:number;
  account: string;
  payee: string;
  payeeid: string;
  notes: string;
  photo: string;
  createdby: string;
  createdAt: string;
  modifiedby: string;
  modifiedAt: string;
  approvedby: string;
  approvedAt: string;
  iscleared: boolean;
  isphoto: boolean;
  photodisplay: any;
  ismodified: boolean = false;

  constructor() {}

    // Referrer
    // ---------------------------------
    setReferrer(referrer: string) {
      this.referrer = referrer;
  }
  getReferrer(): string {
      return this.referrer;
  }  
  
  // transactionDate
  // ---------------------------------
  setTransactionDate(transactionDate: DateTime) {
    this.transactionDate = transactionDate;
  }
  getTransactionDate(): DateTime {
    return this.transactionDate;
  }

   // transactionType
  // ---------------------------------
  setTransactionType(transactionType: string) {
    this.transactionType = transactionType;
  }
  getTransactionType(): string {
    return this.transactionType;
  }

   // category
  // ---------------------------------
  setCategory(category: string) {
    this.category = category;
  }
  getCategory(): string {
    return this.category;
  }

  // categoryid
  // ---------------------------------
  setCategoryId(categoryid: string) {
    this.categoryid = categoryid;
  }
  getCategoryId(): string {
    return this.categoryid;
  }

   // amount
  // ---------------------------------
  setAmount(amount: number) {
    this.amount = amount;
  }
  getAmount(): number {
    return this.amount;
  }

  
  // account
  // ---------------------------------
  setAccount(account: string) {
    this.account = account;
  }
  getAccount(): string {
    return this.account;
  }

  // payee
  // ---------------------------------
  setPayee(payee: string) {
    this.payee = payee;
  }
  getPayee(): string {
    return this.payee;
  }

  // payeeid
  // ---------------------------------
  setPayeeId(payeeid: string) {
    this.payeeid = payeeid;
  }
  getPayeeId(): string {
    return this.payeeid;
  }

  // notes
  // ---------------------------------
  setNotes(notes: string) {
    this.notes = notes;
  }
  getNotes(): string {
    return this.notes;
  }

  // Photo
  // ---------------------------------
    setPhoto(photo: any) {
      this.photo = photo;
  }
  getPhoto() {
      return this.photo;
  }
  setPhotoDisplay(photodisplay: any) {
      this.photodisplay = photodisplay;
  }
  getPhotoDisplay() {
      return this.photodisplay;
  }

  // createdby
  // ---------------------------------
  setCreatedby(createdby: string) {
    this.createdby = createdby;
  }
  getCreatedby(): string {
    return this.createdby;
  }

   // createdAt
  // ---------------------------------
  setCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
  }
  getCreatedAt(): string {
    return this.createdAt;
  }

   // modifiedby
  // ---------------------------------
  setModifiedby(modifiedby: string) {
    this.modifiedby = modifiedby;
  }
  getModifiedby(): string {
    return this.modifiedby;
  }

  
   // modifiedAt
  // ---------------------------------
  setModifiedAt(modifiedAt: string) {
    this.modifiedAt = modifiedAt;
  }
  getModifiedAt(): string {
    return this.modifiedAt;
  }

   // approvedby
  // ---------------------------------
  setApprovedby(approvedby: string) {
    this.approvedby = approvedby;
  }
  getApprovedby(): string {
    return this.approvedby;
  }

    // approvedAt
  // ---------------------------------
  setApprovedAt(approvedAt: string) {
    this.approvedAt = approvedAt;
  }
  getApprovedAt(): string {
    return this.approvedAt;
  }

  reset() {
    this._id = '';
    this.transactionDate;
    this.transactionType = '';
    this.category = '';
    this.categoryid = '';
    this.amount ;
    this.account = '';
    this.payee = '';
    this.payeeid = '';
    this.notes = '';
    this.photo = '';
    this.createdby = '';
    this.createdAt = '';
    this.modifiedby = '';
    this.modifiedAt = '';
    this.approvedby = '';
    this.approvedAt = '';
    this.iscleared = false;
    this.isphoto = false;
    this.photodisplay = '';
    this.ismodified =false;
  }
}
