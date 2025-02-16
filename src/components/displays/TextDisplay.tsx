import {
    Stack,
    StackProps,
    Typography,
} from '@mui/material';
import {Variant} from '@mui/material/styles/createTypography';

interface Props extends StackProps {
    textLeft: string | undefined;
    textRight: string | undefined;
    textLeftVariant?: Variant;
    textRightVariant?: Variant;
}

/**
 * Zeigt zwei Texte in der gegebenen Breite auf der linken und rechten Seite an.
 * @param textLeft Linker Text
 * @param textRight Rechter Text
 * @param textLeftVariant Die HTML-Text Variante, in die der Linke Text dargestellt werden soll.
 * @param textRightVariant Die HTML-Text Variante, in die der Rechte Text dargestellt werden soll.
 * @param props MUI-StackProps.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function TextDisplay(
    {
        textLeft,
        textRight,
        textLeftVariant = 'body2',
        textRightVariant = 'h6',
        ...props
    }: Props
) {
    return (
        <>
            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                {...props}
            >
                <Typography
                    variant={textLeftVariant}
                >
                    {textLeft}
                </Typography>
                <Typography
                    variant={textRightVariant}
                >
                    {textRight}
                </Typography>
            </Stack>
        </>
    );
}