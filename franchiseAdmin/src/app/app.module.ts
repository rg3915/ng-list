import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModuleModule } from './forms-module/forms-module.module';
import { AddItemComponent } from './add-item/add-item.component';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
        declarations: [
                AppComponent,
                AddItemComponent,
                ListItemComponent
        ],
        imports: [ 
                BrowserModule, 
                HttpClientModule, 
                AppRoutingModule,
                FormsModuleModule,
                FormsModule
        ],
        providers: [],
        bootstrap: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
