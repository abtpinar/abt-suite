import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Products Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // products-page
    'products-page.title': 'Insumos',
    'products-page.small-title': '',
    'products-page.product.code': 'Código',
    'products-page.product.name': 'Nombre',
    'products-page.product.price': 'Precio',
    'products-page.product.price_history': 'Historial de Precios',
    'products-page.product.expense': 'Concepto',
    'products-page.product.category': 'Categia',
    'products-page.product.consumption_standard_tp': 'Tabaco Tapado',
    'products-page.product.consumption_standard_v1': 'Vega Fina',
    'products-page.product.consumption_standard_v2': 'Vega Segunda',
    'products-page.product.consumption_standard_sp': 'Sol Palo',
    'products-page.product.consumption_standard_by': 'Brley',
    'products-page.product.consumption_standard_vg': 'Virginia',

    'products-page.list-btn.download-template': 'Plantilla de Importación',
    'products-page.list-btn.upload-template': 'Importar Insumos',

    // products-form
    'farmes-form.new.title': 'Imoprtar Productos',
    'farmes-form.edit.title': 'Editando el Producto',
    'farmes-form.label.import': 'Seleccione Plantilla Importación',
    'farmes-form.label.btn.import': 'Importar',
    'farmes-form.label.btn.close': 'Cerrar',
    


    // products-notifications
    'product-list.product-template-upload-success': 'Productos importados correctamente',
    'product-list.product-template-download-error': 'Upss!! Algo anda mal, fue imposible importar productos',
  }
};
