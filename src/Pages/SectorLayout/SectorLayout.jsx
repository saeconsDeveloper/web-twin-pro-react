import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import stylesectorLayout from "./SectorLayout.module.css";
import CatalogCard from "../../Components/CatalogCard/CatalogCard";
import CatalogSidePanel from "../../Components/CatalogSidePanel/CatalogSidePanel";
import { useGetSceneCategoriesById } from "../../api/sceneCategoriesById";

const SectorLayout = () => {
  //accessing the id from homelayout
  const { state } = useLocation();
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [sidepanelData, setSidepanelData] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  // api to populate the sector page cards
  const { data: sceneCategoriesById, isLoading: isLoadingSceneCategoriesById } =
    useGetSceneCategoriesById(state?.id);

  // function invokes while side panel is opened
  const handleShowSidePanel = (title, img, description, id, scene_group) => {
    setSelectedCard(id);

    // checking clicked id and selected card id, so that only one clicked card will open in
    if (selectedCard === id) {
      setShowSidePanel(prev => !prev);
    }

    if (!isLoadingSceneCategoriesById) {
      // creating new object to populate sidepanel card
      setSidepanelData({
        title: title,
        sidepanelImage: img,
        description: description,
        id: id,
        scene_group: scene_group,
      });
    }
  };

  // closing the sidepanel in sector while clicking anywhere on the page
  const handleAnywhereClickCloseSidepanel = () => {
    setShowSidePanel(false);
  };

  return (
    <section
      className={stylesectorLayout["sector-layout-main-section"]}
      onclick={handleAnywhereClickCloseSidepanel}
    >
      {/* toggle between two class according to sidepanel open or collapse */}
      <aside
        className={`${stylesectorLayout["side-panel"]} ${
          showSidePanel ? stylesectorLayout.togglePanel : ""
        } `}
      >
        {/* catalog side panel; function to change sidepanel state, sidepanel state and the object for sidepanel card */}
        <CatalogSidePanel
          setShowSidePanel={setShowSidePanel}
          sidepanelData={sidepanelData}
          showSidePanel={showSidePanel}
          sceneId={state?.id}
          sceneCategoriesById={sceneCategoriesById}
          isLoadingSceneCategoriesById={isLoadingSceneCategoriesById}
        />
      </aside>
      {/* cards container outside sidebar */}
      <div
        className={`${stylesectorLayout["sector-layout-card-container"]}  ${
          showSidePanel && stylesectorLayout.show
        }`}
      >
        {/* sectorOrSidepanel={"sector"} -> is passed as props to know where the card component is render either on sidepanel or sector layout */}
        {sceneCategoriesById?.map(item => {
          return (
            <>
              {
                <CatalogCard
                  key={item.id}
                  cardId={item.id}
                  title={item.title}
                  description={item.description}
                  img={item.image}
                  onclick={() =>
                    handleShowSidePanel(
                      item?.title,
                      item?.image,
                      item?.description,
                      item?.id,
                      item?.scene_group
                    )
                  }
                  showSidePanelCard={showSidePanel}
                  sectorOrSidepanel={"sector"}
                  selectedId={selectedCard}
                  scene_group={item?.scene_group}
                />
              }
            </>
          );
        })}
      </div>
    </section>
  );
};

export default SectorLayout;
