export default class FileDownloader {
    public static download(blob: Blob, fileName: string): void {
        const url = URL.createObjectURL(blob);

        const tmpAnchor = document.createElement("a");
        tmpAnchor.classList.add("hidden");
        tmpAnchor.href = url;
        tmpAnchor.download = fileName;
        document.body.appendChild(tmpAnchor);

        tmpAnchor.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(tmpAnchor);
    }
}
