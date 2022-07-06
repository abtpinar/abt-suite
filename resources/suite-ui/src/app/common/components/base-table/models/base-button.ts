export class BaseButton {
    public tooltipI18nKey: string;
    public tooltipI18nKeyF?: (data?: any) => string;
    public icon: string;
    public iconF?: (data?: any) => string;
    public class: string;
    public isHidden?: (data?: any) => boolean;
    public isDisabled?: (data?: any) => boolean;
}
