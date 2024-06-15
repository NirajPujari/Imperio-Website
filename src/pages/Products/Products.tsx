import { Hero, ProductPanel, QuotePanel } from "../../components";
import { tempHeroImage } from "../../assets/Images";
import { useFetch } from "../../hooks";
import { useEffect, useState, useCallback } from "react";
import { ProductProps } from "../../types";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils";
import React from "react";

type ProductSection = { header: string; products: ProductProps[] };

const MemoProducts: React.FC = () => {
  const { data, error, loading } = useFetch(
    "https://script.googleusercontent.com/a/macros/imperiorailing.com/echo?user_content_key=Ay_XW6emxmiwQ7Lncs10OYWdnFeTW0upS6uckktFqOCWvYse7Um3IucncElvDr3F6e1U0oIbcefbm_KsKRb7lGfzRJKfhSKKOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKC1zka5stJV6CJ8rbxa1V-UsEmAp_psx4LPWV2VVapqoanwc9S-o8wsibsbmz75VIWJ6s0UnHNjn57l_O834N2gmbbRpWFxXoNaVLQCjst0OCroO14vipAt9G3wLhldpT5hqak0MdSxiw&lib=McNTorF1LzcGC_6h_0B7S9zQVEnUvMwCs"
  );

  const [productSections, setProductSections] = useState<ProductSection[]>([]);
  const [problem, setProblem] = useState<boolean>(false);

  const dataBuilder = useCallback((data: ProductProps[]): ProductSection[] => {
    const headers = [...new Set(data.map((item) => item["Product Category"]))];
    console.log(headers);
    return headers.map((header) => ({
      header,
      products: data.filter((item) => item["Product Category"] === header),
    }));
  }, []);

  useEffect(() => {
    const localData = getLocalStorageItem<ProductProps[]>("ProductData");
    if (localData) {
      const sections = dataBuilder(localData);
      setProductSections(sections);
    } else if (data) {
      const sections = dataBuilder(data);
      setProductSections(sections);
      if (JSON.stringify(localData) !== JSON.stringify(data)) {
        setLocalStorageItem<ProductProps[]>("ProductData", data);
      }
      if (loading || error) {
        setProblem(true);
      } else {
        setProblem(false);
      }
    }
  }, [data, error, loading, dataBuilder]);

  if (problem) {
    return <div>Loading....</div>;
  }

  return (
    <main>
      <Hero
        img={tempHeroImage}
        altText="Hero image for product"
        header="Our Products"
        subHeader="Discover the perfect blend of safety and sophistication with Imperio's glass railing systems."
        curve
      />
      <section className="pb-24">
        {productSections.map((section, index) => (
          <ProductPanel
            key={index}
            header={section.header}
            productDetail={section.products}
          />
        ))}
      </section>
      <QuotePanel />
    </main>
  );
};

export const Products = React.memo(MemoProducts);
