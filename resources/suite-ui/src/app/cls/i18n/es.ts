import { IDictionaryDefinition } from '../../i18n/models/dictionary-definition';

/**
 * Spanish dictionary of the CLs Module.
 */
export const Dictionary = <IDictionaryDefinition>{
  locale: 'es',
  terms: {
    // cls-page
    'cls-page.title': 'Componente C.L.',
    'cls-page.small-title': '',

    'cls-results-page.title': 'Resultados SIPAC',
    'cls-results-page.cl.farmer_code': 'Código',
    'cls-results-page.cl.farmer_name': 'Productor',
    'cls-results-page.cl.unit': 'CCS',
    'cls-results-page.cl.family': 'Variedad',
    'cls-results-page.cl.tobacco_type': 'Tipo',
    'cls-results-page.cl.status': 'Estado',
    'cls-results-page.cl.status.IMPORTED': 'Importado',
    'cls-results-page.cl.status.UPDATED': 'Actualizado',
    'cls-results-page.cl.status.IN_PROGRESS': 'En Proceso',
    'cls-results-page.cl.status.FIXED_FEE': 'Conciliado',
    'cls-results-page.cl.status.REFUNDED': 'Rembolsado',
    'cls-results-page.cl.status.PAID': 'Pagado',
    'cls-results-page.cl.status.FINISHED': 'Terminado',
    'cls-results-page.cl.kilograms': 'Kilogramos',
    'cls-results-page.cl.amount': 'Monto (MN)',
    'cls-results-page.cl.amount_cl': '3.6 %',
    'cls-results-page.cl.amount_020': '0.20 %',
    'cls-results-page.cl.final': 'Neto (CL)',
    'cls-results-page.cl.expense': 'Gastos',
    'cls-results-page.cl.sustract': 'Retiros',
    'cls-results-page.cl.total': 'Saldo',

    'cls-results-page.list-btn.import': 'Importar desde SIPAC',

    'cls-results-page.list-btn.process': 'Calcular Gastos',
    'cls-results-page.list-btn.adjust': 'Aplicar Gastos',
    'cls-results-page.list-btn.refund': 'Rembolsar Gastos',
    'cls-results-page.list-btn.retire': 'Efectuar Pago',

    // cls-results-notifications



    'cls-payments-page.title': 'Pagos Efectuados',
    'cls-payments-page.payment.code': 'No. del Pago',
    'cls-payments-page.payment.date': 'Fecha',
    'cls-payments-page.payment.status': 'Estado',
    'cls-results-page.payment.status.PENDING': 'Pendiente',
    'cls-results-page.payment.status.PAID': 'Pagado',
    'cls-payments-page.payment.unit': 'CCS',
    'cls-payments-page.payment.farmers': 'Productores',
    'cls-payments-page.payment.amount': 'Importe',

    'cls-payments-page.list-btn.excel-download': 'Descargar Excel',
  }
};
