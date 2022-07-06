<?php

return [
    'sips' => [
        'service_url' => env('SIPS_SERVICE_URL', 'https://api.cnmc.gob.es'),
        'test_path' => env('SIPS_SERVICE_TEST_PATH', '/test/v1/echoseguro'),
        'cups_info_path' => env(
            'SIPS_SERVICE_CUPS_INFO_PATH',
            '/verticales/v1/SIPS/consulta/v1/SIPS2_PS_ELECTRICIDAD.csv'
        ),
        'cups_consumptions_path' => env(
            'SIPS_SERVICE_CUPS_CONSUMPTIONS_PATH',
            '/verticales/v1/SIPS/consulta/v1/SIPS2_CONSUMOS_ELECTRICIDAD.csv'
        ),
        'gas_cups_info_path' => env('SIPS_SERVICE_CUPS_INFO_PATH', '/verticales/v1/SIPS/consulta/v1/SIPS2_PS_GAS.csv'),
        'gas_cups_consumptions_path' => env(
            'SIPS_SERVICE_CUPS_CONSUMPTIONS_PATH',
            '/verticales/v1/SIPS/consulta/v1/SIPS2_CONSUMOS_GAS.csv'
        ),
        'consumer_key' => env('SIPS_CONSUMER_KEY', '3b4d8d1e-1913-4c0a-9ecc-447f4ab3ebfa'),
        'consumer_secret' => env('SIPS_CONSUMER_SECRET', '0ef1a62e-df1a-4e89-92cb-1ed1997b14c9'),
        'gas_consumer_key' => env('SIPS_GAS_CONSUMER_KEY', '017b892d-c04e-4df0-92e4-10a2889aeaef'),
        'gas_consumer_secret' => env('SIPS_GAS_CONSUMER_SECRET', '15a94387-9d0a-472b-b383-527e6ef13ecd'),
        'valid_files' => [
            'SIPS2_PS_ELECTRICIDAD',
            'SIPS2_CONSUMOS_ELECTRICIDAD',
            'SIPS2_PS_GAS',
            'SIPS2_CONSUMOS_GAS'
        ]
    ],
    'esios' => [
        'service_url' => env('ESIOS_SERVICE_URL', 'https://api.esios.ree.es'),
        'service_token' => env(
            'ESIOS_SERVICE_TOKEN',
            'Token token="679d3798f37ae61dfb0dcb43b43f6fb93be1247133ec5e4fe006141c0bc3acfc"'
        ),
        'indicators_path' => env('ESIOS_INDICATORS_PATH', '/indicators'),
        'archives_path' => env('ESIOS_ARCHIVES_PATH', '/archives'),
    ],
    'mibgas' => [
        'files_access_url' => 'https://www.mibgas.es/es/file-access',
    ],
    'btpsms' => [
        'company' => env('BTPSMS_COMPANY_NAME', ''),
        'enabled' => env('BTPSMS_SERVICE_ENABLED', false),
        'service_url' => env('BTPSMS_SERVICE_URL', 'https://inserimos.confirma.es'),
        'send_request_path' => env('BTPSMS_SERVICE_SEND_REQUEST_PATH', '/WSsolicitudes.php'),
        'get_state_path' => env('BTPSMS_SERVICE_GET_STATE_PATH', '/WSestados.php'),
        'send_reminder_path' => env('BTPSMS_SERVICE_SEND_REMINDER_PATH', '/WSactualizacion.php'),
        'cancel_path' => env('BTPSMS_SERVICE_CANCEL_PATH', '/WSactualizacion.php'),
        'user' => env('BTPSMS_SERVICE_USER', 'apiinserimos'),
        'pass' => env('BTPSMS_SERVICE_PASS', 'iD28jQFh'),
        'channel' => env('BTPSMS_SERVICE_CHANNEL', '65984'),
        'default_sms' => env(
            'BTPSMS_SERVICE_DEFAULT_SMS',
            '{CUPS}. Ha contratado con ' . env(
                'BTPSMS_COMPANY_NAME'
            ) . ' para la tarifa {TOLLRATE} la oferta {PRODUCT}. Perman 12 meses. Si esta de acuerdo responda SI'
        ),
        'id_prefix' => env('BTPSMS_SERVICE_ID_PREFIX', 'DEV'),
    ],
    'invoicing' => [
        'ELECTRIC_TAX' => 5.11269632,
        'cost_market_operation' => 0.02657,
        'cost_system_operation' => 0.16300,
        'EFI' => 0.25,
        'IM_percentage' => 1.5
    ],
    'app_brand' => env('APP_BRAND', 'test'),
    'unpaid' => [
        'codes' => [
            [
                'code' => 'AC01',
                'name' => 'IncorrectAccountNumber',
                'description' => 'Número de cuenta incorrecto (IBAN no válido).',
                'fullName' => 'AC01 - Número de cuenta incorrecto (IBAN no válido).'
            ],
            [
                'code' => 'AC04',
                'name' => 'ClosedAccountNumber',
                'description' => 'Cuenta cancelada.',
                'fullName' => 'AC04 - Cuenta cancelada.'
            ],
            [
                'code' => 'AC06',
                'name' => 'BlockedAccount',
                'description' => 'Cuenta bloqueada y/o cuenta bloqueada por el deudor para adeudos directos.',
                'fullName' => 'AC06 - Cuenta bloqueada y/o cuenta bloqueada por el deudor para adeudos directos.'
            ],
            [
                'code' => 'AG01',
                'name' => 'TransactionForbidden',
                'description' => 'Cuenta no admite adeudos directos por razones normativas.',
                'fullName' => 'AG01 - Cuenta no admite adeudos directos por razones normativas.'
            ],
            [
                'code' => 'AG02',
                'name' => 'InvalidBankOperationCode',
                'description' => 'Código de operación o código de transacción o tipo de secuencia incorrecto.',
                'fullName' => 'AG02 - Código de operación o código de transacción o tipo de secuencia incorrecto.'
            ],
            [
                'code' => 'AM04',
                'name' => 'InsufficientFunds',
                'description' => 'Saldo insuficiente.',
                'fullName' => 'AM04 - Saldo insuficiente.'
            ],
            [
                'code' => 'AM05',
                'name' => 'Duplication',
                'description' => 'Operación duplicada.',
                'fullName' => 'AM05 - Operación duplicada.'
            ],
            [
                'code' => 'BE01',
                'name' => 'InconsistentWithEndCustomer',
                'description' => 'Titular de la cuenta de cargo no coincide con el deudor.',
                'fullName' => 'BE01 - Titular de la cuenta de cargo no coincide con el deudor.'
            ],
            [
                'code' => 'BE05',
                'name' => 'UnrecognisedInitiatingParty',
                'description' => 'Identificador del acreedor incorrecto.',
                'fullName' => 'BE05 - Identificador del acreedor incorrecto.'
            ],
            [
                'code' => 'CNOR',
                'name' => 'Creditor bank is not registeredunder this BIC in the CSM.',
                'description' => 'La entidad del acreedor no está registrada.',
                'fullName' => 'CNOR - La entidad del acreedor no está registrada.'
            ],
            [
                'code' => 'DNOR',
                'name' => 'Debtor bank is not registered under this BIC in the CSM.',
                'description' => 'La entidad del deudor no está registrada.',
                'fullName' => 'DNOR - La entidad del deudor no está registrada.'
            ],
            [
                'code' => 'FF01',
                'name' => 'InvalidFileFormat',
                'description' => 'Formato no válido.',
                'fullName' => 'FF01 - Formato no válido.'
            ],
            [
                'code' => 'MD01',
                'name' => 'NoMandate',
                'description' => 'Mandato no válido o inexistente.',
                'fullName' => 'MD01 - Mandato no válido o inexistente.'
            ],
            [
                'code' => 'MD02',
                'name' => 'MissingMandatoryInfomationInMandate',
                'description' => 'Faltan datos del mandato o son incorrectos.',
                'fullName' => 'MD02 - Faltan datos del mandato o son incorrectos.'
            ],
            [
                'code' => 'MD06',
                'name' => 'Return of funds requested by end customer',
                'description' => 'Transacción autorizada disconforme',
                'fullName' => 'MD06 - Transacción autorizada disconforme'
            ],
            [
                'code' => 'MD07',
                'name' => 'EndCustomerDeceased',
                'description' => 'Deudor fallecido.',
                'fullName' => 'MD07 - Deudor fallecido.'
            ],
            [
                'code' => 'MS02',
                'name' => 'NotSpecifiedReasonCustomerGenerated',
                'description' => 'Razón no especificada por el cliente (orden del deudor).',
                'fullName' => 'MS02 - Razón no especificada por el cliente (orden del deudor).'
            ],
            [
                'code' => 'MS03',
                'name' => 'NotSpecifiedReasonAgentGenerated',
                'description' => 'Razón no especificada por la entidad del deudor.',
                'fullName' => 'MS03 - Razón no especificada por la entidad del deudor.'
            ],
            [
                'code' => 'RC01',
                'name' => 'BankIdentifierIncorrect',
                'description' => 'Identificador de la entidad incorrecto (BIC no válido).',
                'fullName' => 'RC01 - Identificador de la entidad incorrecto (BIC no válido).'
            ],
            [
                'code' => 'RR01',
                'name' => 'MissingDebtorAccountOrIdentification',
                'description' => 'Falta identificación o cuenta del deudor. Razones regulatorias.',
                'fullName' => 'RR01 - Falta identificación o cuenta del deudor. Razones regulatorias.'
            ],
            [
                'code' => 'RR02',
                'name' => 'MissingDebtorNameOrAddress',
                'description' => 'Falta nombre o dirección del deudor. Razones regulatorias',
                'fullName' => 'RR02 - Falta nombre o dirección del deudor. Razones regulatorias'
            ],
            [
                'code' => 'RR03',
                'name' => 'MissingCreditorNameOrAddress',
                'description' => 'Falta nombre o dirección del acreedor. Razones regulatorias.',
                'fullName' => 'RR03 - Falta nombre o dirección del acreedor. Razones regulatorias.'
            ],
            [
                'code' => 'RR04',
                'name' => 'RegulatoryReason',
                'description' => 'Razones regulatorias diferentes a RR01, RR02 o RR03',
                'fullName' => 'RR04 - Razones regulatorias diferentes a RR01, RR02 o RR03'
            ],
            [
                'code' => 'SL01',
                'name' => 'DueToSpecificServiceOfferedByDebtor Agent',
                'description' => 'Servicios específicos ofrecidos por la entidad del deudor.',
                'fullName' => 'SL01 - Servicios específicos ofrecidos por la entidad del deudor.'
            ]
        ]
    ],
    'time_change' => [
        'day_summer' => explode(',', env('TIME_CHANGE_DAY_SUMMER', '')),
        'hour_summer' => env('TIME_CHANGE_HOUR_SUMMER', ''),
        'day_autumn' => explode(',', env('TIME_CHANGE_DAY_AUTUMN', '')),
        'hour_autumn' => env('TIME_CHANGE_HOUR_AUTUMN', '')
    ]
];
