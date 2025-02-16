import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Lädt die Seite neu und hängt Query-Parameter an.
 * @param loanAmount Der Darlehensbetrag.
 * @param initialRepayment Die anfängliche Tilgung.
 * @param interestRate Der Sollzinssatz.
 * @param fixedInterestPeriod Die Dauer der Sollzinsbindung.
 * @param router Instanz des AppRouters.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export function reloadRepaymentPage(
    loanAmount: number | undefined,
    initialRepayment: number | undefined,
    interestRate: number | undefined,
    fixedInterestPeriod: number | undefined,
    router: AppRouterInstance
) {
    // {scroll: false}, damit scrolling der Seite nach dem Neuladen beibehalten bleibt.
    router.replace(
        '/?loanAmount=' +
        loanAmount +
        '&initialRepayment=' +
        initialRepayment +
        '&interestRate=' +
        interestRate +
        '&fixedInterestPeriod=' +
        fixedInterestPeriod,
        {scroll: false}
    );
}