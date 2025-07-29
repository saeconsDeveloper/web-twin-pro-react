import React, { useEffect, useRef, useState } from "react";
import styleCatalogCarousel from "./CatalogCarousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CatalogCard from "../CatalogCard/CatalogCard";
import { Button, Carousel } from "antd";
import { Link } from "react-router-dom";

const CatalogCarousel = ({
  sidepanelData,
  showSidePanel,
  sceneId,
  sceneCategoriesById,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [catalogSidePanelData, setCatalogSidePanelData] = useState([]);

  const [exploreId, setExploreId] = useState(null);

  const ref = useRef();

  useEffect(() => {
    let data = [];
    if (sidepanelData?.scene_group?.related_scene_group?.length > 0) {
      data = sidepanelData?.scene_group?.related_scene_group?.map(item => item);
    }

    setCatalogSidePanelData(prev => {
      return [
        {
          title: sidepanelData?.title,
          description: sidepanelData?.description,
          image: sidepanelData?.sidepanelImage,
          id: sidepanelData?.id,
        },
        ...data,
      ];
    });
  }, [currentIndex, sidepanelData]);

  const showPreviousCatalogCard = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? catalogSidePanelData?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const showNextProductCatalogCard = () => {
    const isLastSlide = currentIndex === catalogSidePanelData?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className={styleCatalogCarousel["catalog-carousal-container"]}>
      <Carousel ref={ref} className={styleCatalogCarousel["catalog-carousel"]}>
        {catalogSidePanelData?.length > 0 &&
          catalogSidePanelData?.map(item => (
            <>
              <CatalogCard
                title={item?.title || sidepanelData?.title}
                id={item?.id}
                description={item?.description || sidepanelData?.description}
                sidepanelImage={item?.image || sidepanelData?.sidepanelImage}
                showSidePanel={showSidePanel}
                sectorOrSidepanel={"sidepanel"}
                sceneId={sceneId}
                scene_group={sidepanelData.scene_group}
                currentIndex={currentIndex}
                catalogSidePanelData={catalogSidePanelData}
              />
            </>
          ))}
      </Carousel>

      <Link
        to={`/scene/${catalogSidePanelData[currentIndex]?.id}`}
        className={styleCatalogCarousel["card-explore-btn"]}
      >
        Explore
      </Link>

      {sidepanelData?.scene_group?.related_scene_group?.length > 0 && (
        <div className={styleCatalogCarousel["catalog-carousal-btn-container"]}>
          {/* onClick={showPreviousCatalogCard} */}
          <Button
            onClick={() => {
              ref.current.prev();
              showPreviousCatalogCard();
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={styleCatalogCarousel["arrow-icon"]}
            />{" "}
          </Button>
          {/* onClick={showNextProductCatalogCard} */}
          <Button
            onClick={() => {
              ref.current.next();
              showNextProductCatalogCard();
            }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faArrowRight}
              className={styleCatalogCarousel["arrow-icon"]}
            />{" "}
          </Button>
        </div>
      )}
    </section>
  );
};

export default CatalogCarousel;
