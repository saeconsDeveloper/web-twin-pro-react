import { Spin, Switch } from "antd";

import {
  useGetBasicSettingsList,
  useUpdateBasicSettings,
} from "../../../api/settings";
import EditableField from "./EditabeField";
import Head from "../../../Components/Head";
import styles from "./BasicSettings.module.css";

const BasicSettings = () => {
  const { data, isLoading, isFetching } = useGetBasicSettingsList();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateBasicSettings();

  const handleSwitchChange = field => value => {
    mutateAsyncUpdate({ [field]: value });
  };

  if (isLoading || isFetching) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="px-[62px]">
      <Head title="Settings" />
      <table className="w-full">
        <tbody className={styles.tbody}>
          <tr className={styles.tr}>
            <td className={styles["heading"]}>Site Info</td>
          </tr>
          <tr>
            <td>Title</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editTitle" name="title" />
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editContactNumber" name="contact_number" />
            </td>
          </tr>
          <tr>
            <td>Navbar Logo</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editNavbarLogo"
                name="navbar_logo"
                type="file"
              />
            </td>
          </tr>
          <tr>
            <td>Favicon</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editFavicon" name="favicon" type="file" />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Holobite</td>
          </tr>
          <tr>
            <td>Name</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editHolobiteName" name="holobite_name" />
            </td>
          </tr>
          <tr>
            <td>Display</td>
            <td>
              <Switch
                checked={data?.holobite_display}
                onChange={handleSwitchChange("holobite_display")}
              />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Unity Scene</td>
          </tr>
          <tr>
            <td>Loading Image</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editLoadingImage"
                name="loading_image"
                type="file"
              />
            </td>
          </tr>
          <tr>
            <td>Default Loading Text</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editDefaultLoadingText"
                name="default_loading_text"
              />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Immersive Experience</td>
          </tr>
          <tr>
            <td>Enable Immersive Experience</td>
            <td>
              <Switch
                checked={data?.immersive_experience}
                onChange={handleSwitchChange("immersive_experience")}
              />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Analytics</td>
          </tr>
          <tr>
            <td>Analytics heading</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editAnalyticsHeader"
                name="analytics_header"
              />
            </td>
          </tr>
          <tr>
            <td>Analytics Body</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editAnalyticsBody" name="analytics_body" />
            </td>
          </tr>
          <tr>
            <td>Analytics Footer</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editAnalyticsFooter"
                name="analytics_footer"
              />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Rename Sections</td>
          </tr>
          <tr>
            <td>Interactions</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editInteractions" name="interactions" />
            </td>
          </tr>
          <tr>
            <td>Categories</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editCategories" name="categories" />
            </td>
          </tr>
          <tr>
            <td>Product Categories</td>
            <td className={styles["editable-cell"]}>
              <EditableField
                action="editProductCategories"
                name="product_categories"
              />
            </td>
          </tr>
          <tr>
            <td>Products</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editProduct" name="product" />
            </td>
          </tr>
          <tr>
            <td>Scenes</td>
            <td className={styles["editable-cell"]}>
              <EditableField action="editScene" name="scene" />
            </td>
          </tr>
          <tr>
            <td className={styles["heading"]}>Permission</td>
          </tr>
          <tr>
            <td>Browse scenes without login</td>
            <td>
              <Switch
                checked={data?.browse_without_login}
                onChange={handleSwitchChange("browse_without_login")}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BasicSettings;
