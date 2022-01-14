import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UppercaseDirective } from 'src/app/shared/Directive/upperCase.directive';


@NgModule({
 imports:      [ CommonModule ],
 declarations: [ UppercaseDirective ],
 exports:      [UppercaseDirective,
                 CommonModule ]
})
export class SharedModule { }