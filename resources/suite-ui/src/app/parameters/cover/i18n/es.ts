import { IDictionaryDefinition } from '../../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Farmers Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // cover-page
    'cover-page.title': 'Tabaco Tapado',
    'cover-page.small-title': '',

    // class-page
    'classes-page.title': 'Clases',
    'classes-page.button': 'Clases Tabaco',
    'classes-page.class.tobacco_type': 'Tipo Tabaco',
    'classes-page.class.name': 'Nombre',
    'classes-page.class.price': 'Precio/Manojo',
    'classes-page.class.price_history': 'Histórico de Precios',
    'classes-page.class.type': 'Categoría',
    'classes-page.class.group': 'Grupo',
    // classes-form
    'classes-form.new.title': 'Nueva Clase',
    'classes-form.edit.title': 'Editando la Clase',
    // classes-notifications
    'classes.notifications.add-success': 'Clase añadida satisfactoriamente.',
    'classes.notifications.add-failed': 'Error al intentar añadir la clase.',
    'classes.notifications.update-success': 'Clase modificada satisfactoriamente.',
    'classes.notifications.update-failed': 'Error al intentar modificar la clase.',
    'classes.notifications.delete-success': 'Clase eliminada satisfactoriamente.',
    'classes.notifications.delete-failed': 'Error al intentar eliminar la clase.',
  }
};
