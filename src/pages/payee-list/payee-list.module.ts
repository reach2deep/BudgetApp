// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PayeeListPage } from './payee-list';



@NgModule({
    imports: [
        IonicPageModule.forChild(PayeeListPage),
        TranslateModule.forChild()
    ],
    declarations: [
        PayeeListPage,
    ],
    exports: [
        PayeeListPage,
    ]
})
export class TransactionPageModule {

}
