export default function ImageLink({
    alt,
    href,
    src,
}: {
    href: string,
    alt: string,
    src: string,
}) {
    return (
        <a href={href}>
            <img src={src} alt={alt} />
        </a>
    );
}
