import {BaseButton} from './base-button';

export class RowActionButton<T> extends BaseButton {
    public onClick: (item: T) => void;
}
