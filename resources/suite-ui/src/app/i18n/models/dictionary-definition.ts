/**
 * Describes the format in which a module must construct and provide a dictionary with its terms to the language
 * service. Make sure the custom modules export an object implementing this interface, and feed it to the
 * LanguageService.merge method to include them in the whole application's terms glossary.
 */
export interface IDictionaryDefinition {
    /**
     * A string representing the locale (i.e. es, en, en-US and so on).
     */
    locale: string;

    /**
     * Dictionary representing the terms glossary. This object should be a classic Javascript object of key value pairs.
     * The keys are the terms (or keys, any sort of string) and the values the actual translations of such keys to the
     * locale represented by the current dictionary.
     */
    terms: { [key: string]: string };
}