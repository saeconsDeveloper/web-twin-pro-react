export type State = {
  title: string;
  contact_number: string;
  navbar_logo: any;
  favicon: string;
  holobite_name: string;
  loading_image: string;
  default_loading_text: string;
  analytics_header: string;
  analytics_body: string;
  analytics_footer: string;
  interactions: string;
  categories: string;
  product_categories: string;
  product: string;
  scene: string;

  editTitle: boolean;
  editContactNumber: boolean;
  editNavbarLogo: boolean;
  editFavicon: boolean;
  editHolobiteName: boolean;
  editLoadingImage: boolean;
  editDefaultLoadingText: boolean;
  editAnalyticsHeader: boolean;
  editAnalyticsBody: boolean;
  editAnalyticsFooter: boolean;
  editInteractions: boolean;
  editCategories: boolean;
  editProductCategories: boolean;
  editProduct: boolean;
  editScene: boolean;
};

export type Action = {
  type: string;
  payload: any | null;
};

export type Dispatch = (action: Action) => void;
export const initialState: State = {
  title: "",
  contact_number: "",
  navbar_logo: "",
  favicon: "",
  holobite_name: "",
  loading_image: "",
  default_loading_text: "",
  analytics_header: "",
  analytics_body: "",
  analytics_footer: "",
  interactions: "",
  categories: "",
  product_categories: "",
  product: "",
  scene: "",

  editTitle: false,
  editContactNumber: false,
  editNavbarLogo: false,
  editFavicon: false,
  editHolobiteName: false,
  editLoadingImage: false,
  editDefaultLoadingText: false,
  editAnalyticsHeader: false,
  editAnalyticsBody: false,
  editAnalyticsFooter: false,
  editInteractions: false,
  editCategories: false,
  editProductCategories: false,
  editProduct: false,
  editScene: false,
};

export const settingsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        title: action?.payload?.title,
        contact_number: action?.payload?.contact_number,
        navbar_logo: action?.payload?.navbar_logo,
        favicon: action?.payload?.favicon,
        holobite_name: action?.payload?.holobite_name,
        loading_image: action?.payload?.loading_image,
        default_loading_text: action?.payload?.default_loading_text,
        analytics_header: action?.payload?.analytics_header,
        analytics_body: action?.payload?.analytics_body,
        analytics_footer: action?.payload?.analytics_footer,
        interactions: action?.payload?.interactions,
        categories: action?.payload?.categories,
        product_categories: action?.payload?.product_categories,
        product: action?.payload?.product,
        scene: action?.payload?.scene,
      };
    case "UPDATE":
      return {
        ...state,
        title: action?.payload?.title ?? state?.title,
        contact_number: action?.payload?.contact_number ?? state?.contact_number,
        navbar_logo: action?.payload?.navbar_logo ?? state?.navbar_logo,
        favicon: action?.payload?.favicon ?? state?.favicon,
        holobite_name: action?.payload?.holobite_name ?? state?.holobite_name,
        loading_image: action?.payload?.loading_image ?? state?.loading_image,
        default_loading_text:
          action?.payload?.default_loading_text ?? state?.default_loading_text,
        analytics_header:
          action?.payload?.analytics_header ?? state?.analytics_header,
        analytics_body: action?.payload?.analytics_body ?? state?.analytics_body,
        analytics_footer:
          action?.payload?.analytics_footer ?? state?.analytics_footer,
        interactions: action?.payload?.interactions ?? state?.interactions,
        categories: action?.payload?.categories ?? state?.categories,
        product_categories:
          action?.payload?.product_categories ?? state?.product_categories,
        product: action?.payload?.product ?? state?.product,
        scene: action?.payload?.scene ?? state?.scene,

        editTitle: action?.payload?.editTitle ?? state?.editTitle,
        editContactNumber:
          action?.payload?.editContactNumber ?? state?.editContactNumber,
        editNavbarLogo:
          action?.payload?.editNavbarLogo ?? state?.editNavbarLogo,
        editFavicon: action?.payload?.editFavicon ?? state?.editFavicon,
        editHolobiteName:
          action?.payload?.editHolobiteName ?? state?.editHolobiteName,
        editLoadingImage:
          action?.payload?.editLoadingImage ?? state?.editLoadingImage,
        editDefaultLoadingText:
          action?.payload?.editDefaultLoadingText ??
          state?.editDefaultLoadingText,
        editAnalyticsHeader:
          action?.payload?.editAnalyticsHeader ?? state?.editAnalyticsHeader,
        editAnalyticsBody:
          action?.payload?.editAnalyticsBody ?? state?.editAnalyticsBody,
        editAnalyticsFooter:
          action?.payload?.editAnalyticsFooter ?? state?.editAnalyticsFooter,
        editInteractions:
          action?.payload?.editInteractions ?? state?.editInteractions,
        editCategories:
          action?.payload?.editCategories ?? state?.editCategories,
        editProductCategories:
          action?.payload?.editProductCategories ??
          state?.editProductCategories,
        editProduct: action?.payload?.editProduct ?? state?.editProduct,
        editScene: action?.payload?.editScene ?? state?.editScene,
      };
  }
};
