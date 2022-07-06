import { IDictionaryDefinition } from '../../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Farmers Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // communication-page
    'communications-page.title': 'Comunicación',
    'communications-page.small-title': '',

    // mobile-page
    'mobiles-page.title': 'Telefonos Corporativos',
    'mobiles-page.mobile.mac': 'Dirección MAC',
    'mobiles-page.mobile.imei': 'Código IMEI',
    'mobiles-page.mobile.imei2': 'Código IMEI 2',
    'mobiles-page.mobile.brand': 'Marca',
    'mobiles-page.mobile.model': 'Modelo',
    // mobiles-form
    'mobiles-form.new.title': 'Nuevo Telefono',
    'mobiles-form.edit.title': 'Editando el Telefono',
    // mobiles-notifications
    'mobiles.notifications.add-success': 'Telefono añadida satisfactoriamente.',
    'mobiles.notifications.add-failed': 'Error al intentar añadir el telefono.',
    'mobiles.notifications.update-success': 'Telefono modificado satisfactoriamente.',
    'mobiles.notifications.update-failed': 'Error al intentar modificar el telefono.',
    'mobiles.notifications.delete-success': 'Telefono eliminado satisfactoriamente.',
    'mobiles.notifications.delete-failed': 'Error al intentar eliminar el telefono.',

    // sim-page
    'sims-page.title': 'Líneas Telefónicas',
    'sims-page.sim.number': 'Numero',
    'sims-page.sim.pin': 'Código PIN',
    'sims-page.sim.puk': 'Código PUK',
    'sims-page.sim.ip': 'Dirección IP',
    'sims-page.sim.usim': 'USIM',
    // sims-form
    'sims-form.new.title': 'Nueva SIM',
    'sims-form.edit.title': 'Editando la SIM',
    // sims-notifications
    'sims.notifications.add-success': 'SIM añadida satisfactoriamente.',
    'sims.notifications.add-failed': 'Error al intentar añadir la SIM.',
    'sims.notifications.update-success': 'SIM modificada satisfactoriamente.',
    'sims.notifications.update-failed': 'Error al intentar modificar la SIM.',
    'sims.notifications.delete-success': 'SIM eliminada satisfactoriamente.',
    'sims.notifications.delete-failed': 'Error al intentar eliminar la SIM.',
  }
};
