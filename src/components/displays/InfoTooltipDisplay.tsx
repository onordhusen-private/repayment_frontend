import {Help} from '@mui/icons-material';
import TooltipDisplay from '@/components/displays/TooltipDisplay';

interface Props {
    text: string;
}

/**
 * Fragezeichen-Button, der als Info für den Nutzer dient.
 *
 * @param text Text, der dem Nutzer angzeigt werden soll.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function InfoTooltipDisplay(
    {
        text
    }: Props
) {
    return (
        <TooltipDisplay
            text={text}
            icon={
                <Help
                    sx={{
                        width: '1.25rem',
                        height:'1.25rem',
                    }}
                />
            }
        />
    );
}