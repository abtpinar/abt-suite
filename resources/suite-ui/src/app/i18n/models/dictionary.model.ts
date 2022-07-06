import {ILexi} from "./lexi";
import {IDictionaryDefinition} from "./dictionary-definition";

/**
 * The application wide dictionary. It contains the terms glossary which was constructed after including all the local
 * dictionaries of the application modules. This object should not be used by the developers. It's intended to be used
 * by the LanguageService itself.
 */
export class Dictionary {
    private _dictionary: ILexi[] = [];


    /**
     * Merges the given dictionary definition into the internal terms glossary, including all the provided translations
     * into it.
     *
     * @param {IDictionaryDefinition} dictionary: The dictionary definition of a certain language with the translations
     * of terms for a certain language as it was defined by a certain module.
     */
    merge(dictionary: IDictionaryDefinition): void {
        const lexi = this.getOrCreateLexi(dictionary);

        for (let term of Object.keys(dictionary.terms)) {
            lexi.terms[term] = dictionary.terms[term];
        }
    }

    /**
     * Gets the translation of the given term in the given locale.
     *
     * @param {string} locale: The code of the locale to the translate the term to.
     * @param {string} term: The term to translate.
     * @return {string} representing the translation; or empty string if none was found.
     */
    translate(locale: string, term: string): string {
        const lexi = this.findLexi(locale);

        return lexi ? lexi.terms[term] : '';
    }

    private findLexi(key: string): ILexi {
        return this._dictionary.find(l => l.key === key);
    }

    private getOrCreateLexi(dictionary: IDictionaryDefinition) {
        let currentLexi = this.findLexi(dictionary.locale);

        if (!currentLexi) {
            currentLexi = <ILexi>{key: dictionary.locale, terms: {}};
            this._dictionary.push(currentLexi);
        }

        return currentLexi;
    }
}