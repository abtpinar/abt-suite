import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Contracts Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // farms-page
    'farms-page.title': 'Expedientes de la Tierra',
    'farms-page.small-title': '',
    'farms-page.farm.record_number': 'No. Expediente',
    'farms-page.farm.farmer': 'Productor',
    'farms-page.farm.possesion_type': 'Tipo de Propiedad',
    'farms-page.farm.ground_feature': 'Tipo de Suelo',
    'farms-page.farm.activation_date': 'Fecha de Activación',
    'farms-page.farm.expiration_date': 'Fecha de Vencimiento',
    'farms-page.farm.unit': 'Unidad de Producción',
    'farms-page.farm.state': 'Estado',
    'farms-page.list-btn.create-new-farm': 'Crear nuevo UTT',


    // states
    'farms.states.1': 'Activo',
    'farms.states.0': 'Expirado',
    'farms.states.Active': 'Activo',
    'farms.states.Expired': 'Expirado',


    // farms-form
    'farms-form.new.farm.tittle': 'Nuevo Expediente',
    'farms-form.edit.farm.tittle': 'Editando el Expediente',
    'farms-form.record.number': 'Nro Expediente',
    'farms-form.date.of.issue': 'Fecha de Emisión',
    'farms-form.years.validate': 'Válido Por',
    'farms-form.coordinates': 'Coordenadas',
    'farms-form.grpund.feature': 'Tipo Suelo',
    'farms-form.propety.type': 'Tipo Propiedad',
    'farms-form.area.total': 'Área Total',

    // farms-notifications
    'farms.notifications.add-success': 'Se adiciono el expediente UTT correctamente',
    'farms.notifications.add-failed': 'Error al intentar añadir el expediente UTT',
    'farms.notifications.update-success': 'Se editó correctamente el expediente UTT',
    'farms.notifications.update-failed': 'Error al intentar editar el expediente UTT',
  }
};
