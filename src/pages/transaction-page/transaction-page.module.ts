// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';


// This Module's Components
import { TransactionPage } from './transaction-page';

@NgModule({
    imports: [
        IonicPageModule.forChild(TransactionPage),
        TranslateModule.forChild()
    ],
    declarations: [
        TransactionPage,
    ],
    exports: [
        TransactionPage,
    ]
})
export class TransactionPageModule {

}
