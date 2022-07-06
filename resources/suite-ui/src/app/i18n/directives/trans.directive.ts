import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from "../services/language.service";
import {Subscription} from "rxjs";

/**
 * Attribute directive used to mark a text element as a candidate to translate its text or placeholder (in case of an
 * input).
 */
@Directive({
    selector: '[appTrans]'
})
export class TransDirective implements OnInit, OnDestroy {
    @Input('appTrans') term: string;
    @Input() placeholder: boolean;
    @Input('attrTitle') title: string;
    private $ = (<any>window).$;
    private subscription: Subscription;


    constructor(private el: ElementRef, private languageService: LanguageService) {
    }


    /**
     * Makes the actual display of the translation using the bound term and the language service to fetch the actual
     * term translation.
     */
    ngOnInit(): void {
        this.subscription = this.languageService.localeChangeNotifier.subscribe(() => this.updateTranslation());
        this.updateTranslation();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private updateTranslation(): void {
        const translation = this.languageService.translate(this.term);

        if (!!this.title) {
            this.$(this.el.nativeElement).attr('title', this.languageService.translate(this.title));
        }

        if (!!this.placeholder) {
            this.$(this.el.nativeElement).attr('placeholder', translation);
        } else {
            this.$(this.el.nativeElement).text(translation);
        }
    }
}
