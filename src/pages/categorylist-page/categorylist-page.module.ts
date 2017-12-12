// Angular Imports
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { TreeviewModule } from 'ngx-treeview/src';


// This Module's Components
import { CategoryListPage } from './categorylist-page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        IonicPageModule.forChild(CategoryListPage),
        TranslateModule.forChild(),
        TreeviewModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        CategoryListPage,
    ],
    exports: [
        CategoryListPage,
    ]
})
export class CategoryListPageModule {

}
