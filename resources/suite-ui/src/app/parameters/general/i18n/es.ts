import { IDictionaryDefinition } from '../../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Farmers Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // general-page
    'control-panel-page.title': 'Panel de Control',

    'control-panel-page.section.parameters': 'Parámetros',
    'control-panel-page.section.security': 'Seguridad',
    
    // general-page
    'general-page.title': 'General',
    'general-page.small-title': '',

    // production-unit-page
    'production-units-page.title': 'Unidades de Producción',
    'production-units-page.unit.code': 'Código',
    'production-units-page.unit.name': 'Nombre',
    'production-units-page.unit.address': 'Dirección',
    'production-units-page.unit.president_name': 'Presidente',
    'production-units-page.unit.president_agreement_number': 'No. de Acuerdo',
    'production-units-page.unit.bank': 'Agencia Bancaria',
    'production-units-page.unit.bank_account': 'Cuenta Bancaria',
    'production-units-page.unit.active': 'Activo',
    // production-units-form
    'production-units-form.new.title': 'Nueva Unidad de Producción',
    'production-units-form.edit.title': 'Editando la Unidad de Producción',
    // production-units-notifications
    'production-units.notifications.add-success': 'Unidad de Producción añadida satisfactoriamente.',
    'production-units.notifications.add-failed': 'Error al intentar añadir la Unidad de Producción.',
    'production-units.notifications.update-success': 'Unidad de Producción modificada satisfactoriamente.',
    'production-units.notifications.update-failed': 'Error al intentar modificar la Unidad de Producción.',
    'production-units.notifications.delete-success': 'Unidad de Producción eliminada satisfactoriamente.',
    'production-units.notifications.delete-failed': 'Error al intentar eliminar la Unidad de Producción.',
  }
};
