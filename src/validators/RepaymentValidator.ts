import {
    VALID_MAX_FIXED_INTEREST_PERIOD,
    VALID_MAX_INITIAL_REPAYMENT,
    VALID_MAX_INTEREST_RATE,
    VALID_MAX_LOAN_AMOUNT,
    VALID_MIN_FIXED_INTEREST_PERIOD,
    VALID_MIN_INITIAL_REPAYMENT,
    VALID_MIN_INTEREST_RATE,
    VALID_MIN_LOAN_AMOUNT
} from '@/constants/RepaymentValidationConstants';
import {
    integerPriceFormatter,
    percentageFormatter
} from '@/formatters/NumericFormatter';
import {
    TEXT_VALIDATOR_EMPTY_FIXED_INTEREST_PERIOD,
    TEXT_VALIDATOR_EMPTY_INITIAL_REPAYMENT,
    TEXT_VALIDATOR_EMPTY_INTEREST_RATE,
    TEXT_VALIDATOR_EMPTY_LOAN_AMOUNT,
    TEXT_VALIDATOR_MAX_FIXED_INTEREST_PERIOD,
    TEXT_VALIDATOR_MAX_INITIAL_REPAYMENT,
    TEXT_VALIDATOR_MAX_INTEREST_RATE,
    TEXT_VALIDATOR_MAX_LOAN_AMOUNT,
    TEXT_VALIDATOR_MIN_FIXED_INTEREST_PERIOD,
    TEXT_VALIDATOR_MIN_INITIAL_REPAYMENT,
    TEXT_VALIDATOR_MIN_INTEREST_RATE,
    TEXT_VALIDATOR_MIN_LOAN_AMOUNT, TEXT_VALIDATOR_PLACEHOLDER
} from '@/constants/texts/RepaymentTexts';

/**
 * Validiert den Darlehensbetrag anhand der in {@Link RepaymentConstants} festgelegten Regeln.
 *
 * @param loanAmount Der Darlehensbetrag.
 * @return Leerer String, oder Fehlermeldung.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function validateLoanAmount(loanAmount: number | undefined): string {
    if (!loanAmount) {
        return TEXT_VALIDATOR_EMPTY_LOAN_AMOUNT;
    }
    if (loanAmount < VALID_MIN_LOAN_AMOUNT) {
        const formattedMinLoanAmount = integerPriceFormatter(VALID_MIN_LOAN_AMOUNT);
        return TEXT_VALIDATOR_MIN_LOAN_AMOUNT.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMinLoanAmount);
    }
    else if (loanAmount > VALID_MAX_LOAN_AMOUNT) {
        const formattedMaxLoanAmount = integerPriceFormatter(VALID_MAX_LOAN_AMOUNT);
        return TEXT_VALIDATOR_MAX_LOAN_AMOUNT.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMaxLoanAmount);
    }
    return '';
}

/**
 * Validiert die anfängliche Tilgung anhand der in {@Link RepaymentConstants} festgelegten Regeln.
 *
 * @param initialRepayment Die anfängliche Tilgung.
 * @return Leerer String, oder Fehlermeldung.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function validateInitialRepayment(initialRepayment: number | undefined): string {
    if (!initialRepayment) {
        return TEXT_VALIDATOR_EMPTY_INITIAL_REPAYMENT;
    }
    if (initialRepayment < VALID_MIN_INITIAL_REPAYMENT) {
        const formattedMinInitialRepayment = percentageFormatter(VALID_MIN_INITIAL_REPAYMENT);
        return TEXT_VALIDATOR_MIN_INITIAL_REPAYMENT.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMinInitialRepayment);
    }
    else if (initialRepayment > VALID_MAX_INITIAL_REPAYMENT) {
        const formattedMaxInitialRepayment = percentageFormatter(VALID_MAX_INITIAL_REPAYMENT);
        return TEXT_VALIDATOR_MAX_INITIAL_REPAYMENT.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMaxInitialRepayment);
    }
    return '';
}

/**
 * Validiert den Sollzinssatz anhand der in {@Link RepaymentConstants} festgelegten Regeln.
 *
 * @param interestRate Der Sollzinssatz.
 * @return Leerer String, oder Fehlermeldung.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function validateInterestRate(interestRate: number | undefined): string {
    if (!interestRate) {
        return TEXT_VALIDATOR_EMPTY_INTEREST_RATE;
    }
    if (interestRate < VALID_MIN_INTEREST_RATE) {
        const formattedMinInterestRate = percentageFormatter(VALID_MIN_INTEREST_RATE);
        return TEXT_VALIDATOR_MIN_INTEREST_RATE.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMinInterestRate);
    }
    else if (interestRate > VALID_MAX_INTEREST_RATE) {
        const formattedMaxInterestRate = percentageFormatter(VALID_MAX_INTEREST_RATE);
        return TEXT_VALIDATOR_MAX_INTEREST_RATE.replace(TEXT_VALIDATOR_PLACEHOLDER, formattedMaxInterestRate);
    }
    return '';
}

/**
 * Validiert die Dauer der Sollzinsbindung anhand der in {@Link RepaymentConstants} festgelegten Regeln.
 *
 * @param fixedInterestPeriod Die Dauer der Sollzinsbindung.
 * @return Leerer String, oder Fehlermeldung.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function validateFixedInterestPeriod (fixedInterestPeriod: number | undefined): string {
    if (!fixedInterestPeriod) {
        return TEXT_VALIDATOR_EMPTY_FIXED_INTEREST_PERIOD;
    }
    if (fixedInterestPeriod < VALID_MIN_FIXED_INTEREST_PERIOD) {
        return TEXT_VALIDATOR_MIN_FIXED_INTEREST_PERIOD.replace(TEXT_VALIDATOR_PLACEHOLDER, String(VALID_MIN_FIXED_INTEREST_PERIOD));
    }
    else if (fixedInterestPeriod > VALID_MAX_FIXED_INTEREST_PERIOD) {
        return TEXT_VALIDATOR_MAX_FIXED_INTEREST_PERIOD.replace(TEXT_VALIDATOR_PLACEHOLDER, String(VALID_MAX_FIXED_INTEREST_PERIOD));
    }
    return '';
}

/**
 * Validiert den Darlehensbetrag, die anfängliche Tilgung, den Sollzinssatz und die Dauer der Sollzinsbindung anhand
 * der in {@Link RepaymentConstants} festgelegten Regeln.
 *
 * @param loanAmount Der Darlehensbetrag.
 * @param initialRepayment Die anfängliche Tilgung.
 * @param interestRate Der Sollzinssatz.
 * @param fixedInterestPeriod Die Dauer der Sollzinsbindung.
 * @return true wenn valide, false wenn invalide.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function isValid (
    loanAmount: number,
    initialRepayment: number,
    interestRate: number,
    fixedInterestPeriod: number
): boolean {
    return !validateLoanAmount(loanAmount) &&
        !validateInitialRepayment(initialRepayment) &&
        !validateInterestRate(interestRate) &&
        !validateFixedInterestPeriod(fixedInterestPeriod);
}