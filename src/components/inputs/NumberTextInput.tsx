import {
    InputAdornment,
    TextField,
    TextFieldVariants
} from '@mui/material';
import {
    NumberFormatValues,
    NumericFormat, NumericFormatProps,
    SourceInfo
} from 'react-number-format';
import {
    Dispatch,
    ReactNode,
    SetStateAction
} from 'react';

interface Props {
    variant?: TextFieldVariants | undefined;
    label?: string | undefined;
    name?: string | undefined;
    value?: number | undefined;
    fullWidth?: boolean | undefined;
    required?: boolean | undefined;
    prefix?: string | ReactNode | undefined;
    suffix?: string | ReactNode | undefined;
    validator?: (value: number | undefined) => string | undefined;
    errorText?: string | undefined;
    setError?: Dispatch<SetStateAction<string | undefined>>;
    onChange?: (numberFormatValues: NumberFormatValues, sourceInfo: SourceInfo) => void;
    numberFormat: NumericFormatProps;
}

/**
 * Eingabefeld für Nummern.
 * Formatiert Nummern während der Eingabe in bspw. Preis oder Prozentdarstellung.
 * Außerdem kann ein validator hinzugefügt werden.
 * Somit können in Echtzeit Eingabefehler angezeigt werden.
 *
 * @param variant In welche MUI-TextField Variante das Eingabefeld angezeigt werden soll.
 * @param label Der Titel des TextFields.
 * @param name Der interne Name des TextFields.
 * @param value Der aktuelle Wert des TextFields.
 * @param fullWidth Ob das TextField die voll verfügbare breite einnehmen soll.
 * @param required Ob das TextField ausgefüllt werden muss.
 * @param prefix Welcher Text im inneren Anfang des TextFields angezeigt werden soll.
 * @param suffix Welcher Text im inneren Ende des TextFields angezeigt werden soll.
 * @param validator Funktion, die die Eingabe validiert.
 * @param errorText Der FehlerText, der unter dem TextField angezeigt werden soll.
 * @param setError Funktion, mit der sich der FehlerText in eine Variable schreiebn lässt.
 * @param onChange Funktion, die aufgerufen werden soll, wenn sich die Eingabe des TextFields ändert.
 * @param numberFormat Die Formatierungsoptionen, der Nummer, die im TextField dargestellt wird.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
export default function NumberTextInput(
    {
        variant = 'outlined',
        label,
        name,
        value,
        fullWidth,
        required,
        prefix,
        suffix,
        validator,
        errorText,
        setError,
        onChange,
        numberFormat
    }: Props
) {

    // Führt Echtzeit Eingabevalidierung durch, wenn ein Validator und ein Setter für die Fehlermeldung vorhanden ist.
    const handleChange = (
        numberFormatValues: NumberFormatValues,
        sourceInfo: SourceInfo
    ) => {
        if (setError && validator) {
            const errorMessage = validator(numberFormatValues.floatValue)
            setError(errorMessage);
        }
        if (onChange) {
            onChange(numberFormatValues, sourceInfo);
        }
    }

    return (
        <>
            {/*Hier wird die react-number-format dependency verwendet.*/}
            <NumericFormat
                label={label}
                name={name}
                value={value}
                required={required}
                customInput={TextField}
                variant={variant}
                fullWidth={fullWidth}
                onValueChange={handleChange}
                thousandSeparator={numberFormat.thousandSeparator}
                decimalSeparator={numberFormat.decimalSeparator}
                decimalScale={numberFormat.decimalScale}
                fixedDecimalScale={numberFormat.fixedDecimalScale}
                allowNegative={numberFormat.allowNegative}
                error={!!errorText}
                helperText={errorText? errorText: ' '}
                slotProps={{
                    input: {
                        startAdornment:
                            <InputAdornment position='start'>
                                {prefix}
                            </InputAdornment>,
                        endAdornment:
                            <InputAdornment position='end'>
                                {suffix}
                            </InputAdornment>,
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: '2px',
                            borderRadius: '1rem',
                        },
                    },
                }}
            />
        </>
    );
}