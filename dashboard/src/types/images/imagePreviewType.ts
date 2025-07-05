export interface ImagePreviewPropsType {
    file: File;
    preview: string;
    status: 'loading' | 'loaded' | 'error';
    image_id?: string | null;
}
