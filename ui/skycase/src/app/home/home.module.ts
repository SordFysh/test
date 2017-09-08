import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TagModule } from '../tag/tag.module';

import { ShowcaseComponent } from './showcase/showcase.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { AssemblyComponent } from './assembly/assembly.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TagModule
  ],
  declarations: [ShowcaseComponent, HomeComponent, AboutComponent, AssemblyComponent, SupportComponent],
  exports: [ShowcaseComponent, HomeComponent, AboutComponent, AssemblyComponent, SupportComponent]
})
export class HomeModule { }
