import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[appUpperCase]'
})
export class UppercaseDirective {

  constructor() {}

  @HostListener('input', ['$event']) onKeyUp(event) {
    event.target['value'] = event.target['value'].toUpperCase();
  }

}