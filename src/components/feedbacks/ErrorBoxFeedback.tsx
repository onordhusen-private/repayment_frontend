import {Alert} from '@mui/material';

interface Props {
    message: string,
}

/**
 * Zeigt eine Fehlerbox an.
 *
 * @param message Die Nachricht, die angezeigt werden soll.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default async function ErrorBoxFeedback({message}: Props) {
    return (
        <>
            <Alert
                variant='outlined'
                severity='error'
                sx={{
                    borderWidth: '2px',
                    borderRadius: '1.5rem',
                }}
            >
                {message}
            </Alert>
        </>
    );
}
