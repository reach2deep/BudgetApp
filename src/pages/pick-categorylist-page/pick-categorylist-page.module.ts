// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TreeviewModule } from 'ngx-treeview/src';


// This Module's Components
import { PickCategoryListPage } from './pick-categorylist-page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        IonicPageModule.forChild(PickCategoryListPage),
        TranslateModule.forChild(),
        TreeviewModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        PickCategoryListPage,
    ],
    exports: [
        PickCategoryListPage,
    ]
})
export class PickCategoryListPageModule {

}
