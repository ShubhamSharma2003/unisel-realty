import { getImageProps } from "next/image";

type HeroPictureProps = {
  alt: string;
  desktopSrc: string;
  mobileSrc: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
  className?: string;
  priority?: boolean;
};

export default function HeroPicture({
  alt,
  desktopSrc,
  mobileSrc,
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
  className = "object-cover object-center",
  priority = false,
}: HeroPictureProps) {
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({
    alt,
    src: desktopSrc,
    width: desktopWidth,
    height: desktopHeight,
    sizes: "100vw",
    quality: 75,
  });

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt,
    src: mobileSrc,
    width: mobileWidth,
    height: mobileHeight,
    sizes: "100vw",
    quality: 75,
  });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes="100vw" />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
      <img
        {...desktopProps}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
      />
    </picture>
  );
}
