export class Column {
  public field: string;
  public fieldI18nKey?: string;
  public sortable?: boolean;
  public style?: any;
  public format?: <T>(value: T) => string;
  public formatRow?: <T>(row: T) => string;
}
