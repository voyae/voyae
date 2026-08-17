"use client";

interface Props {
  images: {
    url: string;
    caption: string;
  }[];
}

export default function Gallery({
  images,
}: Props) {
  if (!images.length) {
    return (
      <div className="h-[420px] w-full rounded-3xl bg-neutral-100 flex items-center justify-center">
        No Image
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <img
        src={images[0].url}
        alt={images[0].caption}
        className="col-span-2 h-[420px] w-full rounded-3xl object-cover"
      />

      <div className="col-span-2 grid grid-cols-2 gap-4">
        {images.slice(1, 5).map((image) => (
          <img
            key={image.url}
            src={image.url}
            alt={image.caption}
            className="h-[202px] w-full rounded-2xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}