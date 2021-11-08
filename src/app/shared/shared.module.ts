import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RightPaneComponent } from './components/right-pane/right-pane.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RightPaneComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    RightPaneComponent
  ]
})
export class SharedModule { }
