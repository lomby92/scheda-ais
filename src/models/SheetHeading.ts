export default interface SheetHeading {
    taster: string;
    category: string;
    sample: number | null;
    denomination: string;
    alcoholVolume: number;
    year: number | null;
    wineTemperature: number | null;
    environmentTemperature: number | null;
    date: Date;
    place: string;
}
