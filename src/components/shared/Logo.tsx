import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  href = "/",
  className = "",
  imageClassName = "",
  width = 140,
  height = 36,
  priority = false,
}: LogoProps) {
  const content = (
    <Image
      src="/arravo-ltd-logo.png"
      alt="Arravo"
      width={width}
      height={height}
      className={`h-7 w-auto object-contain ${imageClassName}`}
      priority={priority}
    />
  );

  if (!href) {
    return <div className={`inline-flex items-center ${className}`}>{content}</div>;
  }

  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      {content}
    </Link>
  );
}

export default Logo;