import { useLayoutEffect, useEffect, useState } from "react";
import styleProductCard from "./ProductCard.module.css";
import { CONFIG } from "../../config";
import Model3dRenderer from "../Model3dRenderer/Model3dRenderer";

const ProductCard = ({
  isLoading,
  sidePanelDetail,
  currentIndex,
  productCategories,
  name,
  image,
  description,
}) => {
  const themes = JSON.parse(localStorage.getItem("theme"));

  // updating the
  useLayoutEffect(() => {
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("side_panel_text_color") &&
      themes?.header_color_primary !== "#000000"
    ) {
      //updating the primary color property of nav bar dynamically
      document.documentElement.style.setProperty(
        "--sidepanel-text-color",
        themes?.side_panel_text_color
      );
    }
  }, [themes]);

  return (
    <>
      {!isLoading && (
        <>
          <section className={styleProductCard["card-section"]}>
            <div className={styleProductCard["product-card-image-container"]}>
              <figure>
                {productCategories[currentIndex]?.model_3d ? (
                  <Model3dRenderer
                    type={productCategories[currentIndex]?.model_3d_type}
                    pathUrl={productCategories[currentIndex]?.model_3d}
                  />
                ) : (
                  <img
                    //   src="./assets/NEOM_TD_UIUX-Landing.png"
                    src={`${CONFIG.BASE_URI}${productCategories[currentIndex]?.image}`}
                    alt='product-imge'
                  />
                )}
              </figure>
            </div>
            <div className={styleProductCard["product-card-descriptions"]}>
              <strong>{name}</strong>
              {/* <strong>{productCategories[currentIndex]?.name}</strong> */}
              <h3>{description}</h3>
              {/* <h3>{productCategories[currentIndex]?.description}</h3> */}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProductCard;
