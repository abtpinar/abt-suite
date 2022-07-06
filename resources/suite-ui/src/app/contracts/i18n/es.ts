import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Contracts Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // contracts-page
    'contracts-page.title': 'Contratos',
    'contracts-page.small-title': '',
    'contracts-page.contract.code': 'No.',
    'contracts-page.contract.farmer': 'Productor',
    'contracts-page.contract.farmer.code': 'Código Bancario',
    'contracts-page.contract.property_type': 'Tipo de Propiedad',
    'contracts-page.contract.unit': 'Unidad',
    'contracts-page.contract.date': 'Activación',
    'contracts-page.contract.expiration_date': 'Vencimiento',
    'contracts-page.contract.state': 'Estado',
    'contracts-page.contract.planting_type': 'Tipo de Siembra',
    'contracts-page.contract.tobacco_type': 'Tipo de Tabaco',
    'contracts-page.contract.thousands_plants': 'Miles/Posturas',
    'contracts-page.contract.planting_area': 'Área de Plantación',
    'contracts-page.contract.production.qq': 'Acopio/qq',
    'contracts-page.contract.production.tt': 'Acopio/tt',
    'contracts-page.contract.performance': 'Rendimiento',
    'contracts-page.contract.export_porcentage': 'Porciento de Exportación',
    'contracts-page.contract.purchase_budget': 'Presupuesto',
    'contracts-page.contract.first_name': 'Productor',

    'contracts-page.list-btn.create-version': 'Renovar',
    'contracts-page.list-btn.create-new-contract': 'Crear nuevo contrato',
    'contracts-page.list-btn.download-pdf': 'Versión PDF',

    // states
    'contracts.states.DRAFT': 'Borrador',
    'contracts.states.IN_PROGRESS': 'En trámite',
    'contracts.states.ACCEPTED': 'Aceptado',
    'contracts.states.ACTIVATED': 'Activado',
    'contracts.states.REJECTED': 'Rechazado',
    'contracts.states.ANNULLED': 'Anulado',
    'contracts.states.DISCHARGED': 'Baja',
    'contracts.states.SUSPENDED': 'En Corte',

    // contracts-form
    'contracts-form.new.title': 'Nuevo Contrato',
    'contracts-form.edit.title': 'Editando el Contrato',

    // contracts-notifications
    'edit-client-list.contact-removed-correctly': 'Cronograma eliminado correctamente',
    'edit-client-form.error-removed-client': 'Upss! Algo anda mal no se pudo eliminar el cronograma',
    'edit-contract-form.updated-contract': 'Cronograma editado correctamente',
    'edit-client-form.error-updating-client': 'Upss! Algo anda mal no se pudo editar el cronograma',
    'edit-client.sure-to-delete-contact': 'Seguro desea eliminar este producto ?',
    'edit-client-list.contact-product-removed-correctly':'Producto eliminado correctamente',
    'edit-client-form.error-removed-product': 'Upss! Algo anda mal no se pudo eliminar el producto',
    'edit-contract-form.updated-product': 'Producto actualizado',
    'edit-client-form.error-updating-product': 'Upss! Algo anda mal no se pudo actualizar el producto',
    'contracts-notifications.contract-template-download-error': 'Upss! Algo anda mal no se pudo descargar el documento',

    /*'contracts-form.edit.title': 'Editando el Contrato',*/
    'contracts.notifications.add-success': 'El contrato ha sido agregado correctamente',
    'contracts.notifications.add-failed': 'Upss! Algo anda mal, no se pudo agregar el contrato',
    'contracts.notifications.update-success': 'El contrato ha sido actualizado correctamente',
    'contracts.notifications.update-failed': 'Upss! Algo anda mal, no se pudo actualizar el contrato',
    'contract-product.new-form.purchase.budget': 'Usted no cuenta con suficiente liquidez para seguir comprando.',
    'contract-product-form.purchase.budget': 'Usted no cuenta con suficiente liquidez para comprar este producto.',
  }
};
