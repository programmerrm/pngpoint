export function ImagePreview({ url, title }: { url: string; title: string }) {
    return (
        <div className="w-full">
            <img className="w-full rounded" src={url} alt={title} />
        </div>
    );
}
