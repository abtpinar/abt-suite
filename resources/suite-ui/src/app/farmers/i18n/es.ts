import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Farmers Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // farmers-page
    'farmers-page.title': 'Productores',
    'farmers-page.small-title': '',
    'farmers-page.farmer.code': 'Código',
    'farmers-page.farmer.first_name': 'Nombre',
    'farmers-page.farmer.middle_name': 'Primer Apellido',
    'farmers-page.farmer.last_name': 'Segundo Apellido',
    'farmers-page.farmer.ci': 'Carnet de Identidad',
    'farmers-page.farmer.unit': 'Unidad de Producción',
    'farmers-page.farmer.contract': 'Contratos',
    'farmers-page.farmer.expiration': 'Vigencia',
    'farmers-page.farmer.status': 'Estado',
    'farmers-page.farmer.amoun.farm.amoun.area': 'Area',

    'farmers-page.list-btn.create-contract': 'Crear Contrato',
    'farmers-page.list-btn.download-contracts': 'Contratos Version PDF',
    'farmers-page.list-btn.create-farm': 'Crear Expediente UTT',
    'farmers-page.list-btn.delete': 'Eliminar',
    'farmers-page.list-btn.download-template': 'Plantilla de Importación',
    'farmers-page.list-btn.upload-template': 'Importar Productores',

    // farmers-form
    'farmers-form.new.title': 'Nuevo Productor',
    'farmers-form.edit.title': 'Editando el Productor',
    'farmers-form.farmer.telephone': 'Nro Teléfono',
    'farmers-form.farmer.contact': 'Otras Info',
    'farmers-form.farmer.cup_card': 'Tarjeta Cup',
    'farmers-form.farmer.mlc_card': 'Tarjeta Mlc',

    // farmers-notifications
    'farmers.notifications.add-success': 'Productor añadido satisfactoriamente.',
    'farmers.notifications.add-failed': 'Error al intentar añadir el productor.',
    'farmers.notifications.update-success': 'Productor modificado satisfactoriamente.',
    'farmers.notifications.update-failed': 'Error al intentar modificar el productor.',
    'farmers.notifications.delete-success': 'Productor eliminado satisfactoriamente.',
    'farmers.notifications.delete-failed': 'Error al intentar eliminar el productor.',
  }
};
