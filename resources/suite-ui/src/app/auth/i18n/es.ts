import {IDictionaryDefinition} from "../../i18n/models/dictionary-definition";

/**
 * Spanish dictionary of the Authentication Module.
 */
export const Dictionary = <IDictionaryDefinition>{
    locale: 'es',
    terms: {
        // Registration Form
        'register-form.title': 'Dénos sus datos, y lo registraremos',
        'register-form.first-name': 'Nombre',
        'register-form.first-name.required': 'Su nombre es requerido',
        'register-form.last-name': 'Apellidos',
        'register-form.last-name.required': 'Sus apellidos son requeridos',
        'register-form.email': 'Correo',
        'register-form.email.required': 'El correo es obligatorio',
        'register-form.email.invalid': 'Correo incorrecto',
        'register-form.email.not-unique': 'Existe un usuario con ese correo',
        'register-form.password': 'Contraseña',
        'register-form.password.required': 'Escriba un contraseña',
        'register-form.password.minlength': 'La contraseña debe tener al menos 8 caracteres',
        'register-form.password-verification': 'Verificar contraseña',
        'register-form.password-verification.required': 'Debe volver a escribir su contraseña',
        'register-form.password-verification.unequal': 'Las contraseñas no coinciden',
        'register-form.login': 'Entrar',
        'register-form.log-myself-in': 'Autenticarme',
        'register-form.invalid-data': 'Datos de registro incorrectos',
        'register-form.unknown-problem': 'Hubo un problema en el registro, inténtelo luego nuevamente.',

        // Login Form
        'login-form.title': 'Escriba sus crendenciales por favor',
        'login-form.forgot-my-password': 'Olvidé mi contraseña',
        'login-form.register-myself': 'Registrarme',
        'login-form.welcome': 'Bienvenido al sistema',
        'login-form.invalid-email-or-password': 'Correo o contraseña inválidos.',
        'login-form.authentication-error': 'Error de autenticación, inténtelo más tarde.',

        // Lock screen
        'lock-screen.enter-password': 'Escriba su contraseña para recuperar sus sesión',
        'lock-screen.sign-in-other-user': 'O entre como otro usuario',
        'lock-screen.all-rights-reserved': 'Todos los derechos reservados',
        'lock-screen.invalid-password': 'Contraseña incorrecta',

        // Invalid Version
        'invalid-build-title': 'Atención',
        'invalid-build-action': 'Actualizar Página',
        'invalid-build-message': 'Está utilizando una versión desactualizada de la aplicación. Por favor, actualice la página para solucionar el problema.',
    }
};
