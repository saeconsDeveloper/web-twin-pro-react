import styleRelatedCard from "./ProductRelatedCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";

const ProductRelatedCard = ({ productCategories, carouselState }) => {
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
      {productCategories[carouselState]?.related_products?.map(related => (
        <section className={styleRelatedCard["related-section"]}>
          <>
            <main
              className={styleRelatedCard["related-product-card-container"]}
            >
              <Link
                // to={
                //   sidePanelDetail?.related_products[carouselState]?.hyper_link
                // }
                to={related?.hyper_link !== null ? related?.hyper_link : "#"}
                className={styleRelatedCard["hyper-link"]}
                target={related?.hyper_link !== null ? "_blank" : "_self"}
              >
                <FontAwesomeIcon icon={faSquareUpRight} />
              </Link>
              <strong>
                {/* {sidePanelDetail?.related_products[carouselState]?.name} */}
                {related?.name}
              </strong>
              <h3>
                {/* {sidePanelDetail?.related_products[carouselState]?.description} */}
                {related?.description}
              </h3>
              <Link
                // to={
                //   sidePanelDetail?.related_products[carouselState]?.hyper_link
                // }
                to={related?.hyper_link !== null ? related?.hyper_link : "#"}
                target={related?.hyper_link !== null ? "_blank" : "_self"}
                className={styleRelatedCard["learn-more"]}
              >
                Learn more
              </Link>
            </main>
          </>
        </section>
      ))}
    </>
  );
};

export default ProductRelatedCard;
