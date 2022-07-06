import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransDirective} from './directives/trans.directive';
import {TransPipe} from './pipes/trans.pipe';

/**
 * Module providing simple internationalization capabilities, such as translation.
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [TransDirective, TransPipe],
    exports: [TransDirective, TransPipe]
})
export class I18nModule {
}
