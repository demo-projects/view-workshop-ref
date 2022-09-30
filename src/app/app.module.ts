import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChildComponent } from './child.component';
import { TargetDirective } from './target.directive';

@NgModule({
  declarations: [
    ChildComponent,
    TargetDirective
  ],
  imports: [
    BrowserModule
  ],
})
export class AppModule { }
