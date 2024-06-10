import React from "react";
import { ProductPanelProps } from "../../types";
import { ProductCard } from "../../components";

export const ProductPanel: React.FC<ProductPanelProps> = ({
  header,
  productDetail,
}) => {
  return (
    <div className="px-44 pt-24">
      <header className="text-5xl text-[--third] font-normal">{header}</header>
      <div className="flex pt-16 px-16 flex-wrap justify-center gap-9">
        {productDetail.map((product) => (
          <ProductCard
            key={product["Random Code to link the product"]}
            img={product["Main Image"]}
            alt={product["Alternative text"]}
            productName={product["Product Name"]}
            productDetail={product["Short Description"]}
          />
        ))}
      </div>
    </div>
  );
};
