import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Common Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // Message dialog
    'message-dialog.title.error': 'Error',
    'message-dialog.title.success': 'Correcto',
    'message-dialog.title.warning': 'Advertencia',
    'message-dialog.loading': 'Cargando...',

    // Dialog box
    'dialog-box.yes': 'Sí',
    'dialog-box.no': 'No',

    // Buttons
    'btn-accept': 'Aceptar',
    'btn-cancel': 'Cancelar',
    'btn-save': 'Guardar',
    'btn-close': 'Cerrar',
    'btn-add': 'Añadir',
    'btn-add-other': 'Guardar & Continuar',
    'btn-edit': 'Modificar',
    'btn-delete': 'Eliminar',
    'btn-refresh': 'Refrescar',
    'btn-upload': 'Subir Fichero',
    'btn-export-to-xls': 'Exportar a Excel',
    'btn-export-to-csv': 'Exportar a CSV',

    // Placeholder
    'forms-field.placeholder.select': 'Seleccione',
    'forms-field.placeholder.date': 'Seleccione',

    // Table
    'table-actions': 'Acciones',
    'table-first': 'Primero',
    'table-previous': 'Anterior',
    'table-next': 'Siguiente',
    'table-last': 'Último',
    'table-showing': 'Mostrando del',
    'table-to': 'al',
    'table-of': 'de',
    'table-entries': 'resultados',
    'table-empty-data': 'No hay elementos definidos.',
    'table-search': 'Buscar',
    'table-clear': 'Limpiar',
    'table-totals': 'Totales',

    // Notifications
    'notifications.operations.success': 'Operación exitosa',
    'notifications.operations.error': 'Operación fallida. Por favor intente de nuevo',
    'notifications.generics.server-error.message': 'Ha occurido un error en el servidor, por favor intente de nuevo. Si el problema persiste contacte al soporte técnico',
    'notifications.file-download.failure': 'Hubo un error descargando el fichero. Por favor, intente de nuevo',
    'notifications.file-upload.success': 'El fichero fue subido exitosamente',
    'notifications.file-upload.failure': 'Hubo un error subiendo el fichero',
    'notifications.grant-access.denied': 'Usted no cuenta con la autorización para acceder a esta ubicación.',

    //Validators
    'validation.error.message.required': 'Este campo es requerido',
    'validation.error.message.email': 'La dirección de correo no es válida.',
    'validation.error.message.digits': 'Este campo solo permite números.',
    'validation.error.message.max-digits-phone': 'Este campo excede los 9 dígitos.',
    'validation.error.message.min-digits-phone': 'Este campo requiere 9 digitos.',
    'validation.error.message.no-space': 'Este campo no permite espacios en blanco.',

    // Pages
    'pages.home': 'Portada',

    // Calendar
    'month.name.1': 'Enero',
    'month.name.2': 'Febrero',
    'month.name.3': 'Marzo',
    'month.name.4': 'Abril',
    'month.name.5': 'Mayo',
    'month.name.6': 'Junio',
    'month.name.7': 'Julio',
    'month.name.8': 'Agosto',
    'month.name.9': 'Septiembre',
    'month.name.10': 'Octubre',
    'month.name.11': 'Noviembre',
    'month.name.12': 'Diciembre',
  }
};
