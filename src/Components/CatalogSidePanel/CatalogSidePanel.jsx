import CatalogCard from "../CatalogCard/CatalogCard";
import styleCatalogSidePane from "./CatalogSidePanel.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import CatalogCarousel from "../CatalogCarousel/CatalogCarousel";

const CatalogSidePanel = ({
  setShowSidePanel,
  showSidePanel,
  sidepanelData,
  sceneId,
  isLoadingSceneCategoriesById,
  sceneCategoriesById,
}) => {
  // function to collapse sidepanel
  const handleCloseSidePanel = () => {
    setShowSidePanel(false);
  };

  return (
    <section className={styleCatalogSidePane["side-panel-card-container"]}>
      <FontAwesomeIcon
        icon={faXmark}
        className={styleCatalogSidePane["side-panel-close-btn"]}
        onClick={handleCloseSidePanel}
      />
      {/* mapping the data from api and passing as props to card component */}
      {/* sectorOrSidepanel={"sidepanel"} -> is passed as props to know where the card component is render either on sidepanel or sector layout */}

      <div className={styleCatalogSidePane["card-container-sidepanel"]}>
        <CatalogCarousel
          sidepanelData={sidepanelData}
          showSidePanel={showSidePanel}
          sceneId={sceneId}
          sceneCategoriesById={sceneCategoriesById}
        />
      </div>
    </section>
  );
};

export default CatalogSidePanel;
