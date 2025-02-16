import {
    Container,
    Stack,
    Toolbar
} from '@mui/material';
import RepaymentCalculatorSection from '@/components/sections/RepaymentCalculatorSection';
import RepaymentPlanSection from '@/components/sections/RepaymentPlanSection';
import RepaymentOverviewSection from '@/components/sections/RepaymentOverviewSection';
import NavBarSurface from '@/components/surfaces/NavBarSurface';
import {fetchGetRepaymentPlan} from '@/queries/RepaymentQuery';
import ErrorBoxFeedback from '@/components/feedbacks/ErrorBoxFeedback';
import {isValid} from '@/validators/RepaymentValidator';
import {
    DEFAULT_FIXED_INTEREST_PERIOD,
    DEFAULT_INITIAL_REPAYMENT,
    DEFAULT_INTEREST_RATE,
    DEFAULT_LOAN_AMOUNT
} from '@/constants/RepaymentDefaultConstants';
import {toNumber} from '@/utils/NumberUtils';
import {TEXT_ERROR_GENERAL_FETCH_ERROR} from '@/constants/texts/RepaymentTexts';

/**
 * Die Seite, die auf dem root-path bereitgestellt wird
 *
 * Zeigt im Bestfall die Sektionen {@link RepaymentCalculatorSection},
 * {@link RepaymentOverviewSection} und {@link RepaymentPlanSection} an.
 * Sollte ein Fehler beim Abrufen der Daten auftreten,
 * wird anstelle der {@link RepaymentOverviewSection} und {@link RepaymentPlanSection}
 * eine {@link ErrorBoxFeedback} angezeigt.
 * 
 * @param searchParams Die Query-Parameter.
 */
export default async function Home({searchParams}: {
    searchParams: Promise<{ [key: string]: number | undefined }>
}) {

    let {
        loanAmount,
        initialRepayment,
        interestRate,
        fixedInterestPeriod
    } = await searchParams;

    // Auch wenn number als Typ angegeben ist, können hier durchaus auch strings landen.
    // Deswegen wird hier manuell alles, was nicht als Number konvertiert werden kann, zu undefined geändert.
    // So werden weiterführende Fehler verhindert.
    loanAmount = toNumber(loanAmount);
    initialRepayment = toNumber(initialRepayment);
    interestRate = toNumber(interestRate);
    fixedInterestPeriod = toNumber(fixedInterestPeriod);
    
    const repaymentOrErrorBox = (async () => {
        // Nur wenn alle Parameter Nummern sind, soll versucht werden der Tilgungsplan zu fetchen. 
        if (
            loanAmount &&
            initialRepayment &&
            interestRate &&
            fixedInterestPeriod
        ) {
            // Sicherstellen, dass alle Parameter im gültigen Wertebereich liegen.
            if (isValid(loanAmount, initialRepayment, interestRate, fixedInterestPeriod)) {
                try {
                    const repayment = await fetchGetRepaymentPlan(
                        loanAmount,
                        initialRepayment,
                        interestRate,
                        fixedInterestPeriod
                    )

                    // Wenn der Fetch fehlerfrei war, sollen die Tilgungsplandaten angezeigt werden.
                    return (
                        <>
                            <RepaymentOverviewSection repayment={repayment}/>
                            <RepaymentPlanSection repayment={repayment}/>
                        </>
                    );
                }
                catch (e) {
                    // Wenn der Fetch fehlgeschlagen ist, wird hier als Fallback eine ErrorBox angezeigt.
                    console.error(e);
                    return (
                        <>
                            <ErrorBoxFeedback message={TEXT_ERROR_GENERAL_FETCH_ERROR}/>
                        </>
                    );
                }
            }
            // Ansonsten wird weder ein Fehler, noch die RepaymentOverviewSection und RepaymentPlanSection angzeigt.
            // Der RepaymentCalculatorSection kümmert sich darum, den Nutzer entsprechend zu informieren.
        }
        // Wenn keine Parameter angegeben wurden, sollen die Standardwerte angezeigt werden.
        else if (
            !loanAmount &&
            !initialRepayment &&
            !interestRate &&
            !fixedInterestPeriod
        ) {
            loanAmount = DEFAULT_LOAN_AMOUNT;
            initialRepayment = DEFAULT_INITIAL_REPAYMENT;
            interestRate = DEFAULT_INTEREST_RATE;
            fixedInterestPeriod = DEFAULT_FIXED_INTEREST_PERIOD;
        }
    })();

    return (
        <>
            <NavBarSurface/>
            <Toolbar sx={{marginBottom: '1rem'}}/>
            <Container maxWidth={'md'}>
                <Stack gap={'1rem'}>
                    <RepaymentCalculatorSection
                        loanAmount={loanAmount}
                        initialRepayment={initialRepayment}
                        interestRate={interestRate}
                        fixedInterestPeriod={fixedInterestPeriod}
                    />
                    {repaymentOrErrorBox}
                </Stack>
            </Container>
        </>
  );
}
