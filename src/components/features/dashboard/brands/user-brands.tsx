import { getBrands } from "@/actions/dashboard/brands/get-brands";

import EmptyBrand from "./empty-brand";
import BrandsCard from "./brands-card";

type Props = {
  searchFilter?: string;
  viewMode?: string;
};

export default async function UserBrands({ searchFilter, viewMode }: Props) {
  const brands = await getBrands();
  if (brands.error) return <div>مشکلی پیش آمد</div>;

  // filter by search query
  let filteredBrands = brands.data;

  if (searchFilter) {
    filteredBrands = filteredBrands.filter((brand) =>
      brand.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  if (filteredBrands.length === 0) return <EmptyBrand />;

  return filteredBrands.map((brand) => (
    <BrandsCard key={brand.id} viewMode={viewMode ?? "grid"} brand={brand} />
  ));
}
