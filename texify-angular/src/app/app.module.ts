import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LaTeXProjectGeneratorComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LaTeXProjectGeneratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LaTeXProjectGeneratorComponent]
})
export class AppModule { }
