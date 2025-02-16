/**
 * Konvertiert Typ 'any' zu 'number'.
 *
 * @param number Der Wert der konvertiert werden soll.
 * @return Wert als Typ 'number', oder undefined.
 *
 * @author Ole Nordhusen
 * @version 1.0.0
 * @since 1.0.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function toNumber(number: any): number | undefined {
    try {
        // Wenn der Typ nicht zu einer Nummer konvertiert werden kann, wird ein Fehler geworfen.
        return Number(number);
    }
    catch {
        // Fehler abfangen und undefined zurückgeben.
        return undefined;
    }
}