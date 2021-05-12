import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sino'
})
export class sino implements PipeTransform {

  transform(value: String): String {
    if (value=='S')
        return 'Si';
    else
    return 'No'
  }
}