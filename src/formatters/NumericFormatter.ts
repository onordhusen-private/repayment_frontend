import {
    NumericFormatProps,
    numericFormatter as reactNumberFormat
} from 'react-number-format';
import {
    FORMAT_PERCENTAGE,
    FORMAT_PRICE,
    FORMAT_PRICE_INTEGER
} from '@/constants/NumericFormattingConstants';
import {
    TEXT_AND,
    TEXT_INTERNATIONALIZATION_CURRENCY,
    TEXT_INTERNATIONALIZATION_MONTH,
    TEXT_INTERNATIONALIZATION_MONTHS,
    TEXT_INTERNATIONALIZATION_PERCENTAGE,
    TEXT_INTERNATIONALIZATION_YEAR,
    TEXT_INTERNATIONALIZATION_YEARS
} from '@/constants/texts/RepaymentTexts';

/**
 * Formatiert einen Typ 'number' zu 'string'.
 *
 * @param value Der Wert, der formatiert werden soll.
 * @param numericFormatProps Die Einstellungen, wie der Wert formatiert werden soll.
 * @param suffix Der Suffix, der an dem Wert angehangen werden soll.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function numericFormatter(
    value: number | undefined,
    numericFormatProps: NumericFormatProps,
    suffix?: string | undefined
): string {
    let valueAsString;
    try {
        valueAsString = String(value);
    }
    catch {
        valueAsString = '';
    }
    return reactNumberFormat(valueAsString, numericFormatProps) + ' ' + suffix;
}

/**
 * Formatiert einen Wert von Typ 'number' zu einem Preis vom Typ 'string' - inklusive Dezimalstellen.
 *
 * @param value Der Wert, der als Preis formatiert werden soll.
 * @return Formatierter Preis von Typ 'string' - inklusive Dezimalstellen.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function priceFormatter(
    value: number | undefined,
): string {
    return numericFormatter(
        value,
        FORMAT_PRICE,
        TEXT_INTERNATIONALIZATION_CURRENCY
    );
}

/**
 * Formatiert einen Wert von Typ 'number' zu einem Preis vom Typ 'string' - ohne Dezimalstellen.
 *
 * @param value Der Wert, der als Preis formatiert werden soll.
 * @return Formatierter Preis von Typ 'string' - ohne Dezimalstellen.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function integerPriceFormatter(
    value: number | undefined,
): string {
    return numericFormatter(
        value,
        FORMAT_PRICE_INTEGER,
        TEXT_INTERNATIONALIZATION_CURRENCY
    );
}

/**
 * Formatiert einen Wert von Typ 'number' in Prozent vom Typ 'string' - inklusive Dezimalstellen.
 *
 * @param value Der Wert, der als Prozent formatiert werden soll.
 * @return Formatierter Prozentwert von Typ 'string' - inklusive Dezimalstellen.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function percentageFormatter(
    value: number | undefined,
): string {
    return numericFormatter(
        value,
        FORMAT_PERCENTAGE,
        TEXT_INTERNATIONALIZATION_PERCENTAGE
    );
}

/**
 * Formatiert einen Wert von Typ 'number' in eine Jahr Darstellung vom Typ 'string'.
 * Bsp. 1 = 1 Jahr. 2 = 2 Jahre.
 *
 * @param value Der Wert, der als Jahr formatiert werden soll.
 * @return Formatiertes Jahr von Typ 'string'.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function yearFormatter(
    value: number | undefined,
): string {
    if (!value) {
        return '';
    }
    const singularOrPlural = value > 1?
        TEXT_INTERNATIONALIZATION_YEARS:
        TEXT_INTERNATIONALIZATION_YEAR;
    return value + ' ' + singularOrPlural;
}

/**
 * Formatiert einen Wert von Typ 'number' in eine Monat Darstellung vom Typ 'string'.
 * Bsp. 1 = 1 Monat. 2 = 2 Monate.
 *
 * @param value Der Wert, der als Monat formatiert werden soll.
 * @return Formatierter Monat von Typ 'string'.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function monthFormatter(
    value: number | undefined,
): string {
    if (!value) {
        return '';
    }
    const singularOrPlural = value > 1?
        TEXT_INTERNATIONALIZATION_MONTHS:
        TEXT_INTERNATIONALIZATION_MONTH;
    return value + ' ' + singularOrPlural;
}

/**
 * Formatiert einen Wert von Typ 'number' in eine Jahr und Monat Darstellung vom Typ 'string'.
 * Bsp. year = 1 und month = 1: 1 Jahr und 1 Monat
 * Bsp. year = 2 und month = 2: 2 Jahre und 2 Monate
 * Bsp. year = 2 und month = 0: 2 Jahre
 * Bsp. year = 0 und month = 2: 2 Monate
 *
 * @param years Der Wert, der als Jahr formatiert werden soll.
 * @param months Der Wert, der als Monat formatiert werden soll.
 * @return Formatiertes Jahr und Monat von Typ 'string'.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function yearMonthFormatter(
    years: number | undefined,
    months: number | undefined
): string {
    const yearText = yearFormatter(years);
    const monthText = monthFormatter(months);
    if (!yearText) {
        return monthText;
    }
    if (!monthText) {
        return yearText
    }
    return yearText +
        ' ' +
        TEXT_AND +
        ' ' +
        monthText;
}