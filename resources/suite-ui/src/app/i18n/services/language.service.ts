import { Injectable } from '@angular/core';
import { Dictionary } from '../models/dictionary.model';
import { IDictionaryDefinition } from '../models/dictionary-definition';
import { Observable, Subject } from 'rxjs';

/**
 * Service to provide application wide terms glossary configuration and terms translation.
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private _dictionary = new Dictionary();
  private _locale = 'es';
  private _subject = new Subject<string>();

  /**
   * Gets the current locale.
   */
  get locale(): string {
    return this._locale;
  }

  /**
   * Gets a change notifier that let's interested agents be notified when the current locale has changed.
   */
  get localeChangeNotifier(): Observable<string> {
    return this._subject.asObservable();
  }

  /**
   * Sets the new locale.
   *
   * @param {string} locale: Code representing the new locale.
   */
  set locale(locale: string) {
    this._locale = locale;
    this._subject.next(locale);
  }

  /**
   * Gets the translation of the given term in the current locale.
   *
   * @param {string} term: The term to translate.
   */
  translate(term: string): string {
    return this._dictionary.translate(this.locale, term);
  }

  /**
   * Merges the given dictionary definition into the internal terms glossary.
   *
   * @param {IDictionaryDefinition} dictionary: The dictionary definition to merge.
   */
  merge(dictionary: IDictionaryDefinition): void {
    this._dictionary.merge(dictionary);
  }
}
