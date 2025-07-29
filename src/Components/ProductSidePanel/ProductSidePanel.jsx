import React, { useState } from "react";
import styleProductSidePanel from "./ProductSidePanel.module.css";
import ProductRelatedCard from "../ProductRelatedCards/ProductRelatedCard";
import Carousal from "../Carousal/Carousal";

const ProductSidePanel = ({
  sidePanelDetail,
  isLoadingSidepanelDetail,
  sceneDetailApi,
  productCategories,
}) => {
  const [carouselState, setCarouselState] = useState();
  // passing carousal state from carousal component to ProductSidePanel component
  function handleCarouselStateChange(newState) {
    setCarouselState(newState);
  }
  return (
    <>
      <section
        className={styleProductSidePanel["product-sidepanel-content-wrapper"]}>
        <Carousal
          sidePanelDetail={sidePanelDetail}
          productCategories={productCategories}
          // productDetail={sidePanelDetail}
          onCarouselStateChange={handleCarouselStateChange}
          isLoading={isLoadingSidepanelDetail}
        />
      </section>
      {sidePanelDetail?.related_products &&
        !isLoadingSidepanelDetail &&
        (isLoadingSidepanelDetail ? (
          <p>Loading..</p>
        ) : (
          <ProductRelatedCard
            sidePanelDetail={sidePanelDetail}
            carouselState={carouselState}
            isLoadingSidepanelDetail={isLoadingSidepanelDetail}
            productCategories={productCategories}
          />
        ))}
    </>
  );
};

export default ProductSidePanel;
