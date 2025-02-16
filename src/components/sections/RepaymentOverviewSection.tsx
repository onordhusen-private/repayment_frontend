import {
    Divider,
    Grid2, Stack,
    Typography
} from '@mui/material';
import {
    TEXT_TOOLTIP_REPAYMENT_OVERVIEW,
    TEXT_FIXED_INTEREST_PERIOD,
    TEXT_INITIAL_REPAYMENT,
    TEXT_INTEREST,
    TEXT_INTEREST_RATE,
    TEXT_LOAN_AMOUNT,
    TEXT_MONTHLY_RATE,
    TEXT_PERIOD,
    TEXT_REPAYMENT_OVERVIEW,
    TEXT_REPAYMENT_TOTAL,
    TEXT_RESIDUAL_DEBT
} from '@/constants/texts/RepaymentTexts';
import BoxSurface from '@/components/surfaces/BoxSurface';
import TextDisplay from '@/components/displays/TextDisplay';
import {
    percentageFormatter,
    priceFormatter,
    yearFormatter,
    yearMonthFormatter
} from '@/formatters/NumericFormatter';
import InfoTooltipDisplay from '@/components/displays/InfoTooltipDisplay';
import {RepaymentInterface} from '@/interfaces/RepaymentInterface';

interface Props {
    repayment: RepaymentInterface | undefined,
}

/**
 * Zeigt eine einfache Übersicht des Tilgungsplan an.
 *
 * @param repayment Der berechnete Tilgungsplan.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default async function RepaymentOverviewSection (
    {
        repayment
    }: Props
) {

    // Die Werte des Tilgungsplans in Menschen lesbare Form bringen.
    const formattedRepayment = priceFormatter(repayment?.totalRepayment);
    const formattedLoanAmount = priceFormatter(repayment?.loanAmount);
    const formattedInterest = priceFormatter(repayment?.totalInterest);
    const formattedMonthlyRate = priceFormatter(repayment?.monthlyRate);
    const formattedInitialRepaymentRate = percentageFormatter(repayment?.initialRepaymentRate);
    const formattedInterestRate = percentageFormatter(repayment?.interestRate);
    const formattedFixedInterestPeriod = yearFormatter(repayment?.fixedInterestPeriod);
    const formattedResidualDebt = priceFormatter(repayment?.residualDebt);
    const formattedPeriod = yearMonthFormatter(repayment?.yearPeriod, repayment?.monthPeriod);

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
                        {TEXT_REPAYMENT_OVERVIEW}
                    </Typography>
                    <InfoTooltipDisplay text={TEXT_TOOLTIP_REPAYMENT_OVERVIEW}/>
                </Stack>
                <Divider sx={{borderBottomWidth: '2px'}}/>
                <Grid2
                    container
                    spacing={'3rem'}
                >
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <TextDisplay
                            textLeft={TEXT_REPAYMENT_TOTAL}
                            textRight={formattedRepayment}
                            textLeftVariant={'h6'}
                            textRightVariant={'h5'}
                            sx={{marginBottom: '1rem'}}
                        />
                        <TextDisplay
                            textLeft={TEXT_LOAN_AMOUNT}
                            textRight={formattedLoanAmount}
                        />
                        <TextDisplay
                            textLeft={TEXT_INTEREST}
                            textRight={formattedInterest}
                        />
                    </Grid2>
                    <Grid2
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <TextDisplay
                            textLeft={TEXT_MONTHLY_RATE}
                            textRight={formattedMonthlyRate}
                        />
                        <TextDisplay
                            textLeft={TEXT_INITIAL_REPAYMENT}
                            textRight={formattedInitialRepaymentRate}
                        />
                        <TextDisplay
                            textLeft={TEXT_INTEREST_RATE}
                            textRight={formattedInterestRate}
                        />
                        <TextDisplay
                            textLeft={TEXT_FIXED_INTEREST_PERIOD}
                            textRight={formattedFixedInterestPeriod}
                        />
                        <TextDisplay
                            textLeft={TEXT_RESIDUAL_DEBT}
                            textRight={formattedResidualDebt}
                        />
                        <TextDisplay
                            textLeft={TEXT_PERIOD}
                            textRight={formattedPeriod}
                        />
                    </Grid2>
                </Grid2>
            </BoxSurface>
        </>
    );
}