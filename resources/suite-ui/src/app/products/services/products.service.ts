import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../common/services/abstract-crud.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../common/services/navigation.service';
import {ProductModel} from "../models/product.model";
import {Observable} from 'rxjs';
import {FileDownloadService} from '../../common/services/file-download.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends AbstractCrudService<ProductModel> {

  constructor(
    http: HttpClient,
    navigationService: NavigationService,
    private fileDownloadService: FileDownloadService
  ) {
    super(http, navigationService);
  }

  get newEntity(): ProductModel {
    return <ProductModel>{picture: null};
  }

  protected get modelName(): string {
    return 'product';
  }

  downloadExcel(): Observable<any> {
    let url = this.getModelUrl() + `excel`;
    let mime = 'application/xlsx';
    return this.fileDownloadService.downloadFile(url, 'productos.xlsx', mime);
  }

  uploadFile(file: File): Observable<any> {
    let url = this.getModelUrl() + `excel-import`;
    /*const formData: FormData = new FormData();
    formData.append('products', file);*/
    return this.fileDownloadService.uploadFiles(url, {'products': file});
  }

}
