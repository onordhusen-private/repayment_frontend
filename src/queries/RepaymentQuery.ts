import {TEXT_ERROR_GENERAL_FETCH_ERROR} from '@/constants/texts/RepaymentTexts';
import {ENDPOINT_API_REPAYMENT} from '@/constants/RepaymentEndpointsConstants';
import {RepaymentInterface} from '@/interfaces/RepaymentInterface';

/**
 * Ruft den Tilgungsplan vom Backend ab.
 *
 * @param loanAmount Der Darlehensbetrag.
 * @param initialRepayment Die anfängliche Tilgung.
 * @param interestRate Der Sollzinssatz.
 * @param fixedInterestPeriod Die Dauer der Sollzinsbindung.
 * @return Der berechnete Tilgungsplan vom Backend.
 * @throws Error bei Fehlern.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export async function fetchGetRepaymentPlan(
    loanAmount: number,
    initialRepayment: number,
    interestRate: number,
    fixedInterestPeriod: number
): Promise<RepaymentInterface> {
    const response = await fetch(
        ENDPOINT_API_REPAYMENT +
        '?loanAmount=' +
        loanAmount +
        '&initialRepayment=' +
        initialRepayment +
        '&interestRate=' +
        interestRate +
        '&fixedInterestPeriod=' +
        fixedInterestPeriod
    );
    if (!response.ok) {
        throw new Error(TEXT_ERROR_GENERAL_FETCH_ERROR);
    }
    return await response.json();
}