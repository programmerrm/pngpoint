import * as exifr from 'exifr';

export const extractImageMetadata = async (file: File) => {
    try {
        const metadata = await exifr.parse(file, { tiff: true, xmp: true });

        const title =
            typeof metadata?.title === 'object'
                ? metadata.title?.value || ''
                : metadata?.title || '';

        const description =
            typeof metadata?.description === 'object'
                ? metadata.description?.value || ''
                : metadata?.description || '';

        const subject = Array.isArray(metadata?.subject)
            ? metadata.subject
            : [];
        const category = subject[0] || '';
        const keywords = subject;

        return { title, description, category, keywords };
    } catch (err) {
        console.error('Metadata extraction failed:', err);
        return { title: '', description: '', category: '', keywords: [] };
    }
}
