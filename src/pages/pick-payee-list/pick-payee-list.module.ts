// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { PickPayeeListPage } from './pick-payee-list';



@NgModule({
    imports: [
        IonicPageModule.forChild(PickPayeeListPage),
        TranslateModule.forChild()
    ],
    declarations: [
        PickPayeeListPage,
    ],
    exports: [
        PickPayeeListPage,
    ]
})
export class PickPayeeListPageModule {

}
