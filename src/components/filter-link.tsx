"use client";
import {useSearchParams} from "next/navigation";
import {Link} from "next-view-transitions";

import {Color} from "@/modules/categories/color";
import {Use} from "@/modules/categories/use";
import {Material} from "@/modules/categories/material";
import {cn} from "@/lib/utils";

type FilterLinkProps = {
  category: string;
  value: Color | Use | Material;
};

export function FilterLink({category, value}: FilterLinkProps) {
  const searchParams = useSearchParams();
  const activeValue = searchParams.get("value");

  return (
    <Link
      prefetch
      className={cn(
        "rounded-full border px-4 py-1 lg:rounded-none lg:border-none lg:px-0 lg:py-0 lg:hover:underline",
        activeValue === value.slug &&
          " bg-amber-500/65 lg:rounded-e-full lg:rounded-s-none lg:border-none lg:px-2",
      )}
      href={`/products?category=${category.toString()}&value=${value.slug}`}
    >
      {value.nombre}
    </Link>
  );
}
