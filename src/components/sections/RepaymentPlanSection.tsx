import {
    Divider, Stack,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import BoxSurface from '@/components/surfaces/BoxSurface';
import {
    TEXT_TOOLTIP_REPAYMENT_PLAN,
    TEXT_INTEREST_PORTION,
    TEXT_INTERNATIONALIZATION_YEAR,
    TEXT_REPAYMENT_PLAN,
    TEXT_REPAYMENT_PORTION,
    TEXT_RESIDUAL_DEBT,
    TEXT_YEARLY_RATE
} from '@/constants/texts/RepaymentTexts';
import {priceFormatter} from '@/formatters/NumericFormatter';
import TableCellDisplay from '@/components/displays/TableCellDisplay';
import InfoTooltipDisplay from '@/components/displays/InfoTooltipDisplay';
import {RepaymentInterface} from '@/interfaces/RepaymentInterface';

interface Props {
    repayment: RepaymentInterface | undefined,
}

/**
 * Zeigt den Tilgungsplan in jährlicher Aufgliederung an.
 *
 * @param repayment Der berechnete Tilgungsplan.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default async function RepaymentPlanSection (
    {
        repayment
    }: Props
) {

    // Hier werden alle Reihen des Tilgungsplans zusammengebaut.
    const rows = repayment?.repaymentPlan?.map((row) => {
        // Die Werte des Tilgungsplans in Menschen lesbare Form bringen.
        const formattedMonthlyRate = priceFormatter(row.rate);
        const formattedInterestPortion = priceFormatter(row.interestPortion);
        const formattedRepaymentPortion = priceFormatter(row.repaymentPortion);
        const formattedResidualDebt = priceFormatter(row.residualDebt);

        return (
            <TableRow
                key={row.year}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCellDisplay>
                    {row.year}
                </TableCellDisplay>
                <TableCellDisplay align='center'>
                    {formattedMonthlyRate}
                </TableCellDisplay>
                <TableCellDisplay align='center'>
                    {formattedInterestPortion}
                </TableCellDisplay>
                <TableCellDisplay align='center'>
                    {formattedRepaymentPortion}
                </TableCellDisplay>
                <TableCellDisplay align='right'>
                    {formattedResidualDebt}
                </TableCellDisplay>
            </TableRow>
        );
    });

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
                        {TEXT_REPAYMENT_PLAN}
                    </Typography>
                    <InfoTooltipDisplay text={TEXT_TOOLTIP_REPAYMENT_PLAN}/>
                </Stack>
                <Divider sx={{borderBottomWidth: '2px'}}/>
                <TableContainer
                    sx={{
                        marginTop: '-1rem',
                        marginBottom: '-1rem',
                    }}
                >
                    <Table sx={{ minWidth: 550 }}>
                        <TableHead>
                            <TableRow>
                                <TableCellDisplay>
                                    {TEXT_INTERNATIONALIZATION_YEAR}
                                </TableCellDisplay>
                                <TableCellDisplay align='center'>
                                    {TEXT_YEARLY_RATE}
                                </TableCellDisplay>
                                <TableCellDisplay align='center'>
                                    {TEXT_INTEREST_PORTION}
                                </TableCellDisplay>
                                <TableCellDisplay align='center'>
                                    {TEXT_REPAYMENT_PORTION}
                                </TableCellDisplay>
                                <TableCellDisplay align='right'>
                                    {TEXT_RESIDUAL_DEBT}
                                </TableCellDisplay>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </BoxSurface>
        </>
    );
}