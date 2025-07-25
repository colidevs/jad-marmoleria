"use client";

import {useEffect, useState} from "react";

import {VerticalImage} from "./vertical-image";
import {ImageModal} from "./image-modal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {toUrl, type Image} from "@/lib/strapi";

type VerticalCarouselProps = {
  images: Image[];
};

export function VerticalCarousel({images}: VerticalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) {
        if (event.key === "ArrowLeft") {
          api.scrollPrev();
        } else if (event.key === "ArrowRight") {
          api.scrollNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [api, isModalOpen]);

  const modalImages = images.map(img => ({
    src: img.url,
    alt: img.name
  }));

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.id}>
            <ImageModal
              src={image.url}
              alt={image.name}
              images={modalImages}
              initialIndex={index}
              onModalOpen={() => setIsModalOpen(true)}
              onModalClose={() => setIsModalOpen(false)}
            >
              <VerticalImage alt={image.name} src={image.url} />
            </ImageModal>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-center">
        <span>
          {current} / {count}
        </span>
      </div>
      <CarouselPrevious className="hidden rounded sm:flex" />
      <CarouselNext className="hidden rounded sm:flex" />
    </Carousel>
  );
}
