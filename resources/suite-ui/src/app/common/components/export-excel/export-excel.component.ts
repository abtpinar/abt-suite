import {Component, Input} from '@angular/core';
import {ExportDocumentConfiguration} from '../../models/ExportDocumentConfiguration';
import {DownloadFile} from '../../../@rootStore/actions';
import {Store} from '@ngrx/store';
import {SharedState} from '../../../@rootStore/reducers/shared.reducer';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html',
  styleUrls: ['./export-excel.component.sass']
})
export class ExportExcelComponent {
  @Input() excelConfiguration: ExportDocumentConfiguration;
  @Input() searchTerms: any;
  @Input() disabled: boolean = false;

  constructor(private sharedStore$: Store<SharedState>) {
  }

  exportExcel() {
    this.sharedStore$.dispatch(new DownloadFile({
      downloadUrl: this.excelConfiguration.url,
      fileName: this.excelConfiguration.fileName,
      mimeType: this.excelConfiguration.mimeType,
      searchTerms: this.searchTerms
    }));
  }
}
