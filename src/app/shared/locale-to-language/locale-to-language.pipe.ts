import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeToLanguage'
})
export class LocaleToLanguagePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    const reg: RegExp = /^\/(.*)-.*\/$/;
    return reg.exec(value)[1];
  }

}
