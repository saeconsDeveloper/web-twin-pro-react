import React, { useEffect, useRef, useState } from "react";
import styleCarousal from "./Carousal.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button, Carousel } from "antd";

// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

const Carousal = ({
  sidePanelDetail,
  isLoading,
  onCarouselStateChange,
  productCategories,
}) => {
  const [initialSideBarValue, setInitialSideBarValue] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  useEffect(() => {
    //changing sidepanelDetail obj to match that of prodcutCategories due to api
    if (sidePanelDetail && productCategories) {
      let _newsidepanelDetal = {
        id: sidePanelDetail.product_category.id,
        name: sidePanelDetail.product_category.name,
        status: sidePanelDetail.product_category.status,
        image: sidePanelDetail.product_category.image,
        description: sidePanelDetail.product_category.description,
        model_3d: sidePanelDetail.product_category.model_3d,
        product_button_id: sidePanelDetail.product_category.product_button_id,
        icon_image: sidePanelDetail.product_category.icon_image,
        show_in_filter: sidePanelDetail.product_category.show_in_filter,
        position_x: sidePanelDetail.product_category.position_x,
        position_y: sidePanelDetail.product_category.position_y,
        sector: sidePanelDetail.product_category.sector,
        related_products: sidePanelDetail.related_products,
        model_3d_type: sidePanelDetail.product_category.model_3d,
      };
      const newArray = [_newsidepanelDetal].concat(productCategories);
      //removing same product from the array
      const filteredArr = newArray.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setInitialSideBarValue(filteredArr);
    }
  }, [sidePanelDetail, productCategories]);
  useEffect(() => {
    onCarouselStateChange(currentIndex);
  });

  const showPreviousProduct = () => {
    const isFirstSlide = currentIndex === 0;
    //if first slide showing the last product categories
    const newIndex = isFirstSlide
      ? initialSideBarValue?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
    onCarouselStateChange(newIndex);
    // setProducts(sidePanelDetail?.related_products[currentIndex]);
  };

  const showNextProduct = () => {
    const isLastSlide = currentIndex === initialSideBarValue?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onCarouselStateChange(newIndex);
  };

  return (
    <section className={styleCarousal["carousal-container"]}>
      <Carousel ref={ref} className={styleCarousal["product-carousel"]}>
        {initialSideBarValue?.length > 0 &&
          initialSideBarValue?.map((item) => {
            return (
              <ProductCard
                sidePanelDetail={sidePanelDetail}
                isLoading={isLoading}
                currentIndex={currentIndex}
                productCategories={initialSideBarValue}
                image={item?.image}
                name={item?.name}
                description={item?.description}
              />
            );
          })}
      </Carousel>

      <div className={styleCarousal["carousal-btn-container"]}>
        <Button
          onClick={() => {
            ref.current.prev();
            showPreviousProduct();
          }}>
          {" "}
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styleCarousal["arrow-icon"]}
          />{" "}
        </Button>
        <Button
          onClick={() => {
            ref.current.prev();
            showNextProduct();
          }}>
          {" "}
          <FontAwesomeIcon
            icon={faArrowRight}
            className={styleCarousal["arrow-icon"]}
          />{" "}
        </Button>
      </div>
    </section>
  );
};

export default Carousal;
