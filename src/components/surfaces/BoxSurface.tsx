import {Stack} from '@mui/material';
import {ReactNode} from 'react';

interface Props {
    children: ReactNode
}

/**
 * Einfache Box mit eigenem Design.
 *
 * @param props Children der Komponente.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function BoxSurface (
    props: Props
) {
    return (
        <>
            <Stack
                gap={'1rem'}
                sx={{
                    border: '2px solid #0000001f',
                    borderRadius: '1.5rem',
                    padding: '1rem'
                }}
            >
                {props.children}
            </Stack>
        </>
    );
}