import React from "react";

interface GeneratorImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function GeneratorImage({ src, alt, caption }: GeneratorImageProps) {
  return (
    <figure className="my-8 overflow-hidden">
      <div className="overflow-hidden rounded-md flex justify-center bg-gradient-to-b from-background/50 to-background/80 p-2 border border-border/40 shadow-sm">
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[280px] object-contain rounded"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 