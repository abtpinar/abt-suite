<?php

namespace App\Support;

class Enums
{
    /**
     * Language codes.
     */
    const LANG = [
        'Alemán',
        'Asturiano',
        'Castellano',
        'Catalán',
        'Danés',
        'Euskera',
        'Francés',
        'Gallego',
        'Inglés',
        'Noruego',
        'Sueco'
    ];

    /**
     * Contract's States.
     */
    public const CONTRACT_STATES = [
        'IN_PROGRESS',
        'ACCEPTED',
        'ACTIVATED',
        'REJECTED',
        'ANNULLED',
        'DISCHARGED',
        'SUSPENDED'
    ];

    /**
     * CL's States.
     */
    public const CL_STATES = [
        'IMPORTED',
        'UPDATED',
        'IN_PROGRESS',
        'FIXED_FEE',
        'REFUNDED',
        'PAID',
        'FINISHED'
    ];

    /**
     * CL Payment's States.
     */
    public const CL_PAYMENT_STATES = [
        'PENDING',
        'PAID',
    ];

    /**
     * Tobacco type
     */
    public const TOBACCO_TYPE= [
        'TP',
        'V1',
        'V2',
        'SP',
        'BY'
    ];

    /**
     * Tobacco classes
     */
    public const TOBACCO_CLASSES = [
        'EX',
        'CN',
        'TC'
    ];
}
