import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the Employees Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // employees-page
    'employees-page.title': 'Empleados',
    'employees-page.small-title': '',
    'employees-page.employee.dni': 'Carne de Identidad',
    'employees-page.employee.first_name': 'Nombre',
    'employees-page.employee.middle_name': 'Primer Apellido',
    'employees-page.employee.last_name': 'Segundo Apellido',
    'employees-page.employee.department': 'Departamento',
    'employees-page.employee.occupation': 'Ocupacion Laboral',
    'employees-page.employee.contract': 'Contrato',
    'employees-page.employee.expiration': 'Vigencia',
    'employees-page.employee.status': 'Estado',

    'employees-page.list-btn.create-contract': 'Crear Contrato',
    'employees-page.list-btn.delete': 'Eliminar',
    'employees-page.list-btn.download-template': 'Plantilla de Importación',
    'employees-page.list-btn.upload-template': 'Importar Empleados',

    // employees-form
    'employees-form.new.title': 'Nuevo Empleado',
    'employees-form.edit.title': 'Editando el Empleado',

    // employees-notifications
    'employees.notifications.add-success': 'Empleado añadido satisfactoriamente.',
    'employees.notifications.add-failed': 'Error al intentar añadir el empleado.',
    'employees.notifications.update-success': 'Empleado modificado satisfactoriamente.',
    'employees.notifications.update-failed': 'Error al intentar modificar el empleado.',
    'employees.notifications.delete-success': 'Empleado eliminado satisfactoriamente.',
    'employees.notifications.delete-failed': 'Error al intentar eliminar el empleado.',
  }
};
