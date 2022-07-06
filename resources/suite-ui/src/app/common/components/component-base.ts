/**
 * All components must inherit this Base class.
 */
export abstract class ComponentBase {
    private _$ = (<any>window).$;

    /**
     * Gets a reference to jQuery object.
     */
    protected get $(): any {
        return this._$;
    }
}
