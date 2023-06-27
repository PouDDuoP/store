import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsReplace'
})
export class VowelsReplacePipe implements PipeTransform {

  transform(value: string): string {
    const newValue = value.replace(/[a]+/igm, '4')
    .replace(/[e]+/igm, '3')
    .replace(/[i]+/igm, '1')
    .replace(/[o]+/igm, '0')
    .replace(/[u]+/igm, '|_|')

    return newValue
  }

}
