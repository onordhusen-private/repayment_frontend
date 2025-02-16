'use client'

import {
    Button,
    Divider,
    Grid2, Stack,
    Typography,
} from '@mui/material';
import {
    useState,
    useTransition
} from 'react';
import {
    NumberFormatValues,
    SourceInfo,
} from 'react-number-format';
import {
    validateFixedInterestPeriod,
    validateInitialRepayment,
    validateInterestRate,
    validateLoanAmount,
} from '@/validators/RepaymentValidator';
import {
    TEXT_CALCULATE_BUTTON,
    TEXT_TOOLTIP_REPAYMENT_CALCULATOR,
    TEXT_FIXED_INTEREST_PERIOD,
    TEXT_INITIAL_REPAYMENT,
    TEXT_INTEREST_RATE,
    TEXT_INTERNATIONALIZATION_CURRENCY,
    TEXT_INTERNATIONALIZATION_PERCENTAGE,
    TEXT_INTERNATIONALIZATION_YEARS,
    TEXT_LOAN_AMOUNT,
    TEXT_REPAYMENT_CALCULATOR,
    TEXT_TOOLTIP_FIXED_INTEREST_PERIOD,
    TEXT_TOOLTIP_INITIAL_REPAYMENT,
    TEXT_TOOLTIP_INTEREST_RATE,
    TEXT_TOOLTIP_LOAN_AMOUNT
} from '@/constants/texts/RepaymentTexts';
import BoxSurface from '@/components/surfaces/BoxSurface';
import NumberTextInput from '@/components/inputs/NumberTextInput';
import {reloadRepaymentPage} from '@/utils/RouterUtils';
import InfoTooltipDisplay from '@/components/displays/InfoTooltipDisplay';
import {useRouter} from 'next/navigation';
import {
    FORMAT_PERCENTAGE,
    FORMAT_PRICE_INTEGER
} from '@/constants/NumericFormattingConstants';

// Konstanten um Typos zu vermeiden. Siehe handleChange() bezüglich der Relevanz.
const ID_LOAN_AMOUNT: string = 'loanAmount';
const ID_INITIAL_REPAYMENT: string = 'initialRepayment';
const ID_INTEREST_RATE: string = 'interestRate';
const ID_FIXED_INTEREST_PERIOD: string = 'fixedInterestPeriod';

interface Props {
    loanAmount: number | undefined,
    initialRepayment: number | undefined,
    interestRate: number | undefined,
    fixedInterestPeriod: number | undefined,
}

/**
 * Zeigt das Formular zum Einstellen der Parameter des Tilgungsplans an.
 *
 * @param loanAmount Der Darlehensbetrag, der standardmäßig angezeigt werden soll.
 * @param initialRepayment Die anfängliche Tilgung, die standardmäßig angezeit werden soll.
 * @param interestRate Der Sollzinssatz, der standardmäßig angezeigt werden soll.
 * @param fixedInterestPeriod Die Dauer der Sollzinsbindung, die standardmäßig angezeigt werden soll.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function RepaymentCalculatorSection(
    {
        loanAmount,
        initialRepayment,
        interestRate,
        fixedInterestPeriod
    }: Props
) {

    const [inputs, setInputs] = useState({
        [ID_LOAN_AMOUNT]: loanAmount,
        [ID_INITIAL_REPAYMENT]: initialRepayment,
        [ID_INTEREST_RATE]: interestRate,
        [ID_FIXED_INTEREST_PERIOD]: fixedInterestPeriod
    });

    const [isLoading, startTransition] = useTransition();
    const [errorLoanAmount, setErrorLoanAmount] = useState<string | undefined>(validateLoanAmount(inputs[ID_LOAN_AMOUNT]));
    const [errorInitialRepayment, setErrorInitialRepayment] = useState<string | undefined>(validateInitialRepayment(inputs[ID_INITIAL_REPAYMENT]));
    const [errorInterestRate, setErrorInterestRate] = useState<string | undefined>(validateInterestRate(inputs[ID_INTEREST_RATE]));
    const [errorFixedInterestPeriod, setErrorFixedInterestPeriod] = useState<string | undefined>(validateFixedInterestPeriod(inputs[ID_FIXED_INTEREST_PERIOD]));

    const router = useRouter();

    // Überschreibt die Variable 'inputs' beim Ändern eines Wertes.
    const handleChange = (
        numberFormatValues: NumberFormatValues,
        sourceInfo: SourceInfo
    ) => {
        // Durch das Event kommen wir an den Namen, den wir dem Input in der HTML-Darstellung gegeben haben.
        const inputName = sourceInfo?.event?.currentTarget?.name;
        // Die neue Eingabe.
        const newValue = numberFormatValues?.floatValue;
        // Auf Basis dieser Werte können wir die 'inputs' Variable überschreiben.
        setInputs(
            (currentInputValues) => (
                {
                    ...currentInputValues,
                    [inputName || '']: newValue
                }
            )
        );
    };

    // Beim Button-Klick soll die Seite neu geladen werden.
    // page.tsx kümmert sich um das Fetchen der Daten.
    // Code von hier bis *ENDE* von: https://stackoverflow.com/a/77931487
    const handleCalculate = async () => {
        // Wird benötigt, da router.replace keinen Promise zurückgibt.
        startTransition(() => {
            // Wenn man Button-Spaming vermeiden will, kann hier entsprechender Code implementiert werden.
            reloadRepaymentPage(
                inputs[ID_LOAN_AMOUNT],
                inputs[ID_INITIAL_REPAYMENT],
                inputs[ID_INTEREST_RATE],
                inputs[ID_FIXED_INTEREST_PERIOD],
                router
            );
        });
    };
    // *ENDE*
    
    // Feststellen, ob der Berechnen-Button klickbar sein darf.
    const isCalculateButtonDisabled: boolean = isLoading ||
        !!errorLoanAmount ||
        !!errorInitialRepayment ||
        !!errorInterestRate ||
        !!errorFixedInterestPeriod;

    return (
        <>
            <BoxSurface>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                >
                    <Typography
                        variant={'h5'}
                    >
                        {TEXT_REPAYMENT_CALCULATOR}
                    </Typography>
                    <InfoTooltipDisplay text={TEXT_TOOLTIP_REPAYMENT_CALCULATOR}/>
                </Stack>
                <Divider sx={{borderBottomWidth: '2px'}}/>
                <Grid2 container spacing={'1rem'}>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <NumberTextInput
                            label={TEXT_LOAN_AMOUNT}
                            name={ID_LOAN_AMOUNT}
                            value={inputs[ID_LOAN_AMOUNT]}
                            required
                            onChange={handleChange}
                            errorText={errorLoanAmount}
                            setError={setErrorLoanAmount}
                            validator={validateLoanAmount}
                            fullWidth
                            numberFormat={FORMAT_PRICE_INTEGER}
                            prefix={TEXT_INTERNATIONALIZATION_CURRENCY}
                            suffix={<InfoTooltipDisplay text={TEXT_TOOLTIP_LOAN_AMOUNT}/>}
                        />
                    </Grid2>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <NumberTextInput
                            label={TEXT_INITIAL_REPAYMENT}
                            name={ID_INITIAL_REPAYMENT}
                            value={inputs[ID_INITIAL_REPAYMENT]}
                            required
                            onChange={handleChange}
                            errorText={errorInitialRepayment}
                            setError={setErrorInitialRepayment}
                            validator={validateInitialRepayment}
                            fullWidth
                            numberFormat={FORMAT_PERCENTAGE}
                            prefix={TEXT_INTERNATIONALIZATION_PERCENTAGE}
                            suffix={<InfoTooltipDisplay text={TEXT_TOOLTIP_INITIAL_REPAYMENT}/>}
                        />
                    </Grid2>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <NumberTextInput
                            label={TEXT_INTEREST_RATE}
                            name={ID_INTEREST_RATE}
                            value={inputs[ID_INTEREST_RATE]}
                            required
                            onChange={handleChange}
                            errorText={errorInterestRate}
                            setError={setErrorInterestRate}
                            validator={validateInterestRate}
                            fullWidth
                            numberFormat={FORMAT_PERCENTAGE}
                            prefix={TEXT_INTERNATIONALIZATION_PERCENTAGE}
                            suffix={<InfoTooltipDisplay text={TEXT_TOOLTIP_INTEREST_RATE}/>}
                        />
                    </Grid2>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <NumberTextInput
                            label={TEXT_FIXED_INTEREST_PERIOD}
                            name={ID_FIXED_INTEREST_PERIOD}
                            value={inputs[ID_FIXED_INTEREST_PERIOD]}
                            required
                            onChange={handleChange}
                            errorText={errorFixedInterestPeriod}
                            setError={setErrorFixedInterestPeriod}
                            validator={validateFixedInterestPeriod}
                            fullWidth
                            numberFormat={FORMAT_PRICE_INTEGER}
                            prefix={TEXT_INTERNATIONALIZATION_YEARS}
                            suffix={<InfoTooltipDisplay text={TEXT_TOOLTIP_FIXED_INTEREST_PERIOD}/>}
                        />
                    </Grid2>
                </Grid2>
                <Button
                    variant={'contained'}
                    loading={isLoading}
                    disabled={isCalculateButtonDisabled}
                    onClick={handleCalculate}
                    fullWidth
                    sx={{
                        height: '3rem',
                        marginTop: '-0.5rem',
                        borderRadius: '1rem',
                    }}
                >
                    {TEXT_CALCULATE_BUTTON}
                </Button>
            </BoxSurface>
        </>
    );
}