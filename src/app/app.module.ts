import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChildComponent } from './child.component';
import { TargetDirective } from './target.directive';
import { ModalComponent } from './demo_components/modal.component';

@NgModule({
  declarations: [
    ChildComponent,
    TargetDirective,
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ModalComponent
  ]
})
export class AppModule { }
