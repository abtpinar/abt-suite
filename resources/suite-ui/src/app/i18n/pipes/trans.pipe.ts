import {Pipe, PipeTransform} from '@angular/core';
import {LanguageService} from '../services/language.service';

@Pipe({
    name: 'appTrans',
})
export class TransPipe implements PipeTransform {
    constructor(private languageService: LanguageService) {
    }

    public transform(value: any): string {
        return this.languageService.translate(value);
    }
}
