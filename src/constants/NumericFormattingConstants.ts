import {NumericFormatProps} from 'react-number-format';
import {
    TEXT_INTERNATIONALIZATION_DECIMAL_SEPARATOR,
    TEXT_INTERNATIONALIZATION_THOUSAND_SEPARATOR
} from '@/constants/texts/RepaymentTexts';

/**
 * Enthält Einstellungen zur Preisformatierung - inkluse Dezimaldarstellung - von Texten.
 *
 * @author Ole Nordhusen
 * @since 1.0.0
 */
export const FORMAT_PRICE: NumericFormatProps = {
    thousandSeparator: TEXT_INTERNATIONALIZATION_THOUSAND_SEPARATOR,
    decimalSeparator: TEXT_INTERNATIONALIZATION_DECIMAL_SEPARATOR,
    decimalScale: 2,
    fixedDecimalScale: true,
    allowNegative: true,
}

/**
 * Enthält Einstellungen zur Preisformatierung - ohne Dezimaldarstellung - von Texten.
 *
 * @author Ole Nordhusen
 * @since 1.0.0
 */
export const FORMAT_PRICE_INTEGER: NumericFormatProps = {
    thousandSeparator: TEXT_INTERNATIONALIZATION_THOUSAND_SEPARATOR,
    decimalSeparator: TEXT_INTERNATIONALIZATION_DECIMAL_SEPARATOR,
    decimalScale: 0,
    fixedDecimalScale: true,
    allowNegative: true,
}

/**
 * Enthält Einstellungen zur Prozentformatierung - inkluse Dezimaldarstellung - von Texten.
 *
 * @author Ole Nordhusen
 * @since 1.0.0
 */
export const FORMAT_PERCENTAGE: NumericFormatProps = {
    thousandSeparator: TEXT_INTERNATIONALIZATION_THOUSAND_SEPARATOR,
    decimalSeparator: TEXT_INTERNATIONALIZATION_DECIMAL_SEPARATOR,
    decimalScale: 2,
    fixedDecimalScale: true,
    allowNegative: true,
}