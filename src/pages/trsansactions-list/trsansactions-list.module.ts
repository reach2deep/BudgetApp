// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

// This Module's Components
import { TrsansactionsListPage } from './trsansactions-list';

@NgModule({
    declarations: [
        TrsansactionsListPage,
    ],
    imports: [
        IonicPageModule.forChild(TrsansactionsListPage),
        TranslateModule.forChild()
    ],    
    exports: [
        TrsansactionsListPage,
    ]
})
export class TrsansactionsListModule { }
