import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const BlurImage = ({ src, alt, className, ...props }: BlurImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blurred placeholder */}
      <div
        className={cn(
          "absolute inset-0 bg-muted transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover opacity-100 transition-all duration-500 [filter:none] [mix-blend-mode:normal]",
          loaded ? "blur-0 scale-100" : "blur-md scale-105"
        )}
        {...props}
      />
    </div>
  );
};
