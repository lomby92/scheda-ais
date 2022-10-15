import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type React from "react";
import IBMPlexSansItalic from "../fonts/IBMPlexSans-Italic.ttf";
import IBMPlexSansRegular from "../fonts/IBMPlexSans-Regular.otf";
import type SchedaAnaliticoDescrittiva from "../models/SchedaAnaliticoDescrittiva";
import type SchedaDiValutazioneAPunteggio from "../models/SchedaDiValutazioneAPunteggio";
import type SheetHeading from "../models/SheetHeading";

Font.register({
    family: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fonts: [
        {
            src: IBMPlexSansRegular,
        },
        {
            src: IBMPlexSansItalic,
            fontStyle: "italic",
        },
    ],
});

export default class PdfFactory {
    private static STYLE = StyleSheet.create({
        page: {
            backgroundColor: "#F2F2F2",
            color: "#4D4D4D",
            padding: 25,
            fontFamily: "IBM Plex Sans",
        },
        title: {
            color: "black",
            fontSize: 20,
            marginBottom: 8,
        },
        subtitle: {
            color: "black",
            fontSize: 15,
            marginBottom: 5,
        },
        text: {
            fontSize: 10,
            marginBottom: 2,
        },
    });

    public static createSchedaAnaliticoDescrittiva(sheet: SchedaAnaliticoDescrittiva): React.ReactElement {
        return (
            <Document>
                <Page size="A4" style={PdfFactory.STYLE.page}>
                    <Text style={PdfFactory.STYLE.title}>AIS - Scheda analitico-descrittiva</Text>

                    {PdfFactory.createForHeading(sheet.heading)}

                    {PdfFactory.createSeparator()}

                    <View>
                        <Text style={PdfFactory.STYLE.subtitle}>Esame visivo</Text>
                        {PdfFactory.createField("Limpidezza", sheet.visualExam.limpidity)}
                        {PdfFactory.createField("Colore", sheet.visualExam.color)}

                        {sheet.visualExam.consistency !== "" ? (
                            PdfFactory.createField("Consistenza", sheet.visualExam.consistency)
                        ) : (
                            <>
                                {PdfFactory.createField("Effervescenza - grana", sheet.visualExam.effervescence.grain)}
                                {PdfFactory.createField(
                                    "Effervescenza - numero bollicine",
                                    sheet.visualExam.effervescence.bobbleNumber
                                )}
                                {PdfFactory.createField(
                                    "Effervescenza - numero bollicine",
                                    sheet.visualExam.effervescence.persistence
                                )}
                            </>
                        )}
                        {PdfFactory.createField("Osservazione", sheet.visualExam.observations)}
                    </View>

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Esame olfattivo</Text>
                    {PdfFactory.createField("Intensità", sheet.olfactoryExam.intensity)}
                    {PdfFactory.createField("Complessità", sheet.olfactoryExam.complexity)}
                    {PdfFactory.createField("Qualità", sheet.olfactoryExam.quality)}
                    {PdfFactory.createField("Descrizione", sheet.olfactoryExam.description)}
                    {PdfFactory.createField("Osservazioni", sheet.olfactoryExam.observations)}

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Esame gusto-olfattivo</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            {PdfFactory.createField("Zuccheri", sheet.tasteOlfactoryExam.sugars)}
                            {PdfFactory.createField("Alcoli", sheet.tasteOlfactoryExam.alcohols)}
                            {PdfFactory.createField("Polialcoli", sheet.tasteOlfactoryExam.sugarAlcohols)}
                        </View>
                        <View>
                            <Text style={{ ...PdfFactory.STYLE.text, color: "black" }}>Struttura o corpo</Text>
                            <Text
                                style={{
                                    ...PdfFactory.STYLE.text,
                                    fontStyle: "italic",
                                }}
                            >
                                {sheet.tasteOlfactoryExam.structure}
                            </Text>
                        </View>
                        <View>
                            {PdfFactory.createField("Acidi", sheet.tasteOlfactoryExam.acids)}
                            {PdfFactory.createField("Tannini", sheet.tasteOlfactoryExam.tannins)}
                            {PdfFactory.createField("Sostanze minerali", sheet.tasteOlfactoryExam.mineralSubstances)}
                        </View>
                    </View>
                    {PdfFactory.createField("Equilibrio", sheet.tasteOlfactoryExam.equilibrium)}
                    {PdfFactory.createField("Intensità", sheet.tasteOlfactoryExam.intensity)}
                    {PdfFactory.createField("Persistenza", sheet.tasteOlfactoryExam.persistence)}
                    {PdfFactory.createField("Qualità", sheet.tasteOlfactoryExam.quality)}
                    {PdfFactory.createField("Osservazioni", sheet.tasteOlfactoryExam.observations)}

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Considerazioni finali</Text>
                    {PdfFactory.createField("Stato evolutivo", sheet.finalConsiderations.evolutionaryState)}
                    {PdfFactory.createField("Armonia", sheet.finalConsiderations.harmony)}
                    {PdfFactory.createField("Abbinamenti", sheet.finalConsiderations.combinations)}
                    {PdfFactory.createField("Osservazioni", sheet.finalConsiderations.observations)}
                </Page>
            </Document>
        );
    }

    public static createSchedaDiValutazioneAPunteggio(sheet: SchedaDiValutazioneAPunteggio): React.ReactElement {
        const total =
            sheet.visualExam.appearance +
            sheet.visualExam.color +
            sheet.olfactoryExam.intensity +
            sheet.olfactoryExam.complexity +
            sheet.olfactoryExam.quality +
            sheet.tasteOlfactoryExam.structure +
            sheet.tasteOlfactoryExam.equilibrium +
            sheet.tasteOlfactoryExam.intensity +
            sheet.tasteOlfactoryExam.persistence +
            sheet.tasteOlfactoryExam.quality +
            sheet.finalConsiderations.harmony;

        return (
            <Document>
                <Page size="A4" style={PdfFactory.STYLE.page}>
                    <Text style={PdfFactory.STYLE.title}>AIS - Scheda di valutazione a punteggio</Text>

                    {PdfFactory.createForHeading(sheet.heading)}

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Esame visivo</Text>
                    {PdfFactory.createField("Aspetto", `${sheet.visualExam.appearance}/5`)}
                    {PdfFactory.createField("Colore", `${sheet.visualExam.color}/10`)}

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Esame olfattivo</Text>
                    {PdfFactory.createField("Intensità", `${sheet.olfactoryExam.intensity}/5`)}
                    {PdfFactory.createField("Complessità", `${sheet.olfactoryExam.complexity}/10`)}
                    {PdfFactory.createField("Qualità", `${sheet.olfactoryExam.quality}/15`)}

                    {PdfFactory.createSeparator()}

                    <Text style={PdfFactory.STYLE.subtitle}>Esame gusto-olfattivo</Text>
                    {PdfFactory.createField("Struttura", `${sheet.tasteOlfactoryExam.structure}/5`)}
                    {PdfFactory.createField("Equilibrio", `${sheet.tasteOlfactoryExam.equilibrium}/5`)}
                    {PdfFactory.createField("Intensità", `${sheet.tasteOlfactoryExam.intensity}/5`)}
                    {PdfFactory.createField("Persistenza", `${sheet.tasteOlfactoryExam.persistence}/10`)}
                    {PdfFactory.createField("Qualità", `${sheet.tasteOlfactoryExam.quality}/15`)}

                    {PdfFactory.createSeparator()}

                    {PdfFactory.createField("Armonia", `${sheet.finalConsiderations.harmony}/15`)}

                    {PdfFactory.createSeparator()}

                    <Text style={{ ...PdfFactory.STYLE.subtitle, textAlign: "right" }}>Punteggio finale: {total}</Text>
                </Page>
            </Document>
        );
    }

    private static createForHeading(heading: SheetHeading): React.ReactElement {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View>
                    {PdfFactory.createField("Degustatore", heading.taster)}
                    {PdfFactory.createField("Categoria vino", heading.category)}
                    {PdfFactory.createField("Campione n°", heading.sample ?? "")}
                    {PdfFactory.createField("Denominazione", heading.denomination)}
                    {PdfFactory.createField("Titolo alcolometrico", heading.alcoholVolume)}
                    {PdfFactory.createField("Annata", heading.year ?? '-')}
                </View>
                <View style={{ marginLeft: 10 }}>
                    {PdfFactory.createField("Temperatura del vino", `${heading.wineTemperature || "-"} °C`)}
                    {PdfFactory.createField("Temperatura ambiente", `${heading.environmentTemperature || "-"} °C`)}
                    {PdfFactory.createField(
                        "Data",
                        `${heading.date.getDate()}/${heading.date.getMonth() + 1}/${heading.date.getFullYear()}`
                    )}
                    {PdfFactory.createField("Ora", `${heading.date.getHours()}:${heading.date.getMinutes()}`)}
                    {PdfFactory.createField("Luogo", heading.place)}
                </View>
            </View>
        );
    }

    private static createField(title: string, value: string | number): React.ReactElement {
        return (
            <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ ...PdfFactory.STYLE.text, color: "black" }}>{title}: </Text>
                <Text
                    style={{
                        ...PdfFactory.STYLE.text,
                        fontStyle: "italic",
                    }}
                >
                    {value}
                </Text>
            </View>
        );
    }

    private static createSeparator(): React.ReactElement {
        return (
            <View
                style={{
                    borderTop: "1px solid #4D4D4D",
                    marginVertical: 5,
                    width: "100%",
                }}
            />
        );
    }
}
