import type SchedaAnaliticoDescrittiva from "../models/SchedaAnaliticoDescrittiva";
import type SchedaDiValutazioneAPunteggio from "../models/SchedaDiValutazioneAPunteggio";
import type SheetHeading from "../models/SheetHeading";

export default class FileNameFactory {
    public static forSchedaAnaliticoDescrittiva(sheet: SchedaAnaliticoDescrittiva): string {
        return `${FileNameFactory.getPrefixFromHeading(sheet.heading)} - Scheda analitico-descrittiva.pdf`;
    }

    public static forSchedaDiValutazioneAPunteggio(sheet: SchedaDiValutazioneAPunteggio): string {
        return `${FileNameFactory.getPrefixFromHeading(sheet.heading)} - Scheda di valutazione a punteggio.pdf`;
    }

    private static getPrefixFromHeading(heading: SheetHeading): string {
        const date = [
            heading.date.getFullYear().toString(),
            heading.date.getMonth().toString().padStart(2, "0"),
            heading.date.getDay().toString().padStart(2, "0"),
        ].join("-");

        return `${date} - ${heading.denomination}`;
    }
}
