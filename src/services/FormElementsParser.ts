export default class FormElementsParser {
    private formElements: HTMLFormControlsCollection;

    public constructor(formElements: HTMLFormControlsCollection) {
        this.formElements = formElements;
    }

    public parseDayAndTime(daySelector: string, timeSelector: string): Date {
        const date = new Date();
        const selectedDay = (this.formElements.namedItem(daySelector) as HTMLInputElement).value;
        const selectedTime = (this.formElements.namedItem(timeSelector) as HTMLInputElement).value;
        if (selectedDay !== "" && selectedTime !== "") {
            const [year, month, day] = selectedDay.split("/");
            const [hour, minutes] = selectedTime.split(":");

            date.setFullYear(parseInt(year!, 10), parseInt(month!, 10) - 1, parseInt(day!, 10));
            date.setHours(parseInt(hour!, 10), parseInt(minutes!, 10));
        }

        return date;
    }

    public parseNumber(selector: string) {
        return parseInt(this.parseString(selector), 10) || null;
    }

    public parseString(selector: string): string {
        return (this.formElements.namedItem(selector)! as HTMLInputElement).value;
    }
}
