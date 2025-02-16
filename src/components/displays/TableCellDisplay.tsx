import {
    TableCell,
    TableCellProps
} from '@mui/material';
import {ReactNode} from 'react';

interface Props extends TableCellProps {
    children: ReactNode
}

/**
 * TableCell mit mehr Border-Size.
 * 
 * @param children Children der Komponente.
 * @param props MUI-TableCellProps
 * 
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function TableCellDisplay (
    {
        children,
        ...props
    }: Props
) {
    return (
        <>
            <TableCell
                sx={{borderBottomWidth: '2px'}}
                {...props}
            >
                {children}
            </TableCell>
        </>
    );
}