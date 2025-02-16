import {
    IconButton,
    Tooltip
} from '@mui/material';
import {
    ReactNode,
} from 'react';

interface Props {
    text: string;
    icon: ReactNode;
}

/**
 * Button, der als Info für den Nutzer dient.
 * 
 * @param text Text, der dem Nutzer angzeigt werden soll.
 * @param icon Das Icon, den der Button haben soll.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function TooltipDisplay(
    {
        text,
        icon
    }: Props
) {
    return (
        <>
            <Tooltip
                title={text}
                enterTouchDelay={0}
                leaveTouchDelay={0}
                disableFocusListener
                slotProps={{
                    tooltip: {
                        sx: {
                            borderRadius: '1rem',
                            padding: '0.5rem',
                            fontSize: 'medium',
                            whiteSpace: 'pre-wrap',
                        }
                    }
                }}
            >
                <IconButton size={'small'}>
                    {icon}
                </IconButton>
            </Tooltip>
        </>
    );
}