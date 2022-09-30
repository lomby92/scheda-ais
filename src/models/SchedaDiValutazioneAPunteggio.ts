import type SheetHeading from "./SheetHeading";

export default interface SchedaDiValutazioneAPunteggio {
    heading: SheetHeading;
    visualExam: {
        appearance: number;
        color: number;
    };
    olfactoryExam: {
        intensity: number;
        complexity: number;
        quality: number;
    };
    tasteOlfactoryExam: {
        structure: number;
        equilibrium: number;
        intensity: number;
        persistence: number;
        quality: number;
    };
    finalConsiderations: {
        harmony: number;
        observations: string;
    };
}
