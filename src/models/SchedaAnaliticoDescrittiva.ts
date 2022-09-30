import type SheetHeading from "./SheetHeading";

export default interface SchedaAnaliticoDescrittiva {
    heading: SheetHeading;
    visualExam: {
        limpidity: string;
        color: string;
        consistency: string;
        effervescence: {
            grain: string;
            bobbleNumber: string;
            persistence: string;
        };
        observations: string;
    };
    olfactoryExam: {
        intensity: string;
        complexity: string;
        quality: string;
        description: string;
        observations: string;
    };
    tasteOlfactoryExam: {
        sugars: string;
        alcohols: string;
        sugarAlcohols: string;
        acids: string;
        tannins: string;
        mineralSubstances: string;
        structure: string;
        equilibrium: string;
        intensity: string;
        persistence: string;
        quality: string;
        observations: string;
    };
    finalConsiderations: {
        evolutionaryState: string;
        harmony: string;
        combinations: string;
        observations: string;
    };
}
