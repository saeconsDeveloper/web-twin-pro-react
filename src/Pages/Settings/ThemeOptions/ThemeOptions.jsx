import { Button } from "antd";
import { toast } from "react-toastify";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  useCreateThemeSettings,
  useGetThemeSettingsList,
} from "../../../api/themeSettings";
import { useGoogleFont } from "../../../api/font";
import Head from "../../../Components/Head";
import styles from "./ThemeOptions.module.css";
import { Helmet } from "react-helmet";

/*  
    Todos: 
   1. Gallery Page
   2. Side panel (Gallery page side panel and Product panel)
 3. Dropdowns (Sectors, Search, Filter, etc): badge bg, badge color, button color, button/text/border color
  , hover/active text color
 4. Sector and CTA Popup
 5. Box Shadow
 6. Filter Icons
 7.  Fonts
*/

const ThemeOptions = () => {
  //custom theme setting hook to fetch and create themes
  const { data, isLoading, isError } = useGetThemeSettingsList();
  const { mutateAsync, isLoading: isLoadingUpdate } = useCreateThemeSettings();

  const { data: fontData } = useGoogleFont();

  // state to hold the fonts value
  const [fontsValue, setFontsValue] = useState();

  //login bg primary state
  const [loginBgPrimary, setLoginBgPrimary] = useState();
  //login bg secondary state
  const [loginBgSecondary, setLoginBgSecondary] = useState();
  //login text/icon/input bg color state
  const [loginTextIconInput, setLoginTextIconInput] = useState();

  const [loginInputTextColor, setLoginInputTextColor] = useState();

  //login button color
  const [loginButtonColor, setLoginButtonColor] = useState();

  //login button text/border color
  const [loginButtonTextBorderColor, setLoginButtonTextBorderColor] =
    useState();

  //home layout header color primary state
  const [headerColorPrimary, setHeaderColorPrimary] = useState();

  //home layout header color secondary state
  const [headerColorSecondary, setHeaderColorSecondary] = useState();

  //home layout header text/icons/input bg color
  const [headerTextIconsInputBgColor, setHeaderTextIconsInputBgColor] =
    useState();

  //home layout header input field text color
  const [headerInputTextColor, setHeaderInputTextColor] = useState();

  //home layout dropdown bg primary color
  const [dropdownBgPrimaryColor, setDropdownBgPrimaryColor] = useState();

  //home layout dropdown bg secondary color
  const [dropdownBgSecondaryColor, setDropdownBgSecondaryColor] = useState();

  //home layout dropdown text color
  const [dropdownTextColor, setDropdownTextColor] = useState();

  //home layout dropdown button color
  const [dropdownButtonColor, setDropDownButtonColor] = useState();

  //home layout dropedown button text and border color
  const [dropdownButtonTextBorderColor, setDropdownButtonTextBorderColor] =
    useState();

  //sector layout side panel main bg primary
  const [sidePanelMainBgPrimary, setSidepanalMainBgPrimary] = useState();

  //sector layout side panel main bg secondary
  const [sidePanelMainBgSecondary, setSidepanalMainBgSecondary] = useState();

  //sector layout card bg primary
  const [sidePanelCardBgPrimary, setSidepanelCardBgPrimary] = useState();

  //sector layout card bg secondary
  const [sidePanelCardBgSecondary, setSidepanelCardBgSecondary] = useState();

  //sector layout text color
  const [sidePanelTextColor, setSidepanelTextColor] = useState();

  //sector layout sidepanel close btn color
  const [sidePanelCloseBtnColor, setSidepanelCloseBtnColor] = useState();

  //sector layout sidepanel button color
  const [sidePanelBtnColor, setSidePanelBtnColor] = useState();

  //sector layout sidepanel button border and text color
  const [sidePanelBtnBorderTextColor, setSidepanelBtnBorderTextColor] =
    useState();

  //sector layout sidepanel grid bg color
  const [sidePanelGridBgColor, setSidepanelGridBgColor] = useState();

  //sector layout sidepanel grid text color
  const [sidePanelGridTextColor, setSidepanelGridTextColor] = useState();

  //sector layout gallary page button color
  const [gallaryButtonColor, setGallaryButtonColor] = useState();

  //sector layout gallary page card background
  const [gallaryCardBackground, setGallaryCardBackground] = useState();

  //sector layout gallary page main back ground
  const [gallaryMainBackground, setGallaryMainBackground] = useState();

  //sector layout gallary page button text and border color
  const [gallaryBtnTextBorderColor, setGallaryBtnTextBorderColor] = useState();

  //sector layout gallary page text color
  const [gallaryTextColor, setGallaryTextColor] = useState();

  //fixed social bar primary color
  const [fixedSocialBarBgPrimary, setFixedSocialBarBgPrimary] = useState();

  // fixed social bar secondary color
  const [fixedSocialBarBgSecondary, setFixedSocialBarBgSecondary] = useState();

  //fixed social bar icon bg color
  const [fixedSocialBarIconBgColor, setFixedSocialBarIconBgColor] = useState();

  //fixed social bar icon color
  const [fixedSocialBarIconColor, setFixedSocialBarIconColor] = useState();

  //social popover bg primary color
  const [socialPopoverBgPrimary, setSocialPopoverBgPrimary] = useState();

  // social popover bg secondary color
  const [socialPopoverBgSecondary, setSocialPopoverBgSecondary] = useState();

  // social popover color(text/input/icon)
  const [socialPopoverColor, setSocialPopoverColor] = useState();

  // social popover input field color
  const [socialPopoverInputColor, setSocialPopoverInputColor] = useState();

  //populate the color value in respective field in the first render
  useEffect(() => {
    if (!isLoading && !isError) {
      setLoginBgPrimary(
        data?.login_background_color_primary
          ? data?.login_background_color_primary
          : "#000000"
      );
      setLoginBgSecondary(
        data?.login_background_color_secondary
          ? data?.login_background_color_secondary
          : "#000000"
      );
      setLoginTextIconInput(
        data?.login_input_text_icons_bg_color
          ? data?.login_input_text_icons_bg_color
          : "#000000"
      );

      setLoginInputTextColor(
        data?.login_input_text_color ? data?.login_input_text_color : "#000000"
      );

      setLoginButtonColor(
        data?.login_button_color ? data?.login_button_color : "#000000"
      );

      setLoginButtonTextBorderColor(
        data?.login_button_text_border_color
          ? data?.login_button_text_border_color
          : "#000000"
      );

      setHeaderColorPrimary(
        data?.header_color_primary ? data?.header_color_primary : "#000000"
      );

      setHeaderColorSecondary(
        data?.header_color_secondary ? data?.header_color_secondary : "#000000"
      );

      setHeaderInputTextColor(
        data?.header_input_text_color
          ? data?.header_input_text_color
          : "#000000"
      );

      setHeaderTextIconsInputBgColor(
        data?.header_input_bg_color ? data?.header_input_bg_color : "#000000"
      );

      setDropdownBgPrimaryColor(
        data?.dropdown_main_background_primary
          ? data?.dropdown_main_background_primary
          : "#000000"
      );

      setDropdownBgSecondaryColor(
        data?.dropdown_main_background_secondary
          ? data?.dropdown_main_background_secondary
          : "#000000"
      );

      setDropdownTextColor(
        data?.dropdown_text_color ? data?.dropdown_text_color : "#000000"
      );

      setDropDownButtonColor(
        data?.dropdown_button_color ? data?.dropdown_button_color : "#000000"
      );

      setDropdownButtonTextBorderColor(
        data?.dropdown_text_border_color
          ? data?.dropdown_text_border_color
          : "#000000"
      );

      setSidepanalMainBgPrimary(
        data?.side_panel_main_background_primary
          ? data?.side_panel_main_background_primary
          : "#000000"
      );

      setSidepanalMainBgSecondary(
        data?.side_panel_main_background_secondary
          ? data?.side_panel_main_background_secondary
          : "#000000"
      );

      setSidepanelCardBgPrimary(
        data?.side_panel_card_background_primary
          ? data?.side_panel_card_background_primary
          : "#000000"
      );

      setSidepanelCardBgSecondary(
        data?.side_panel_card_background_secondary
          ? data?.side_panel_card_background_secondary
          : "#000000"
      );

      setSidepanelTextColor(
        data?.side_panel_text_color ? data?.side_panel_text_color : "#000000"
      );

      setSidepanelCloseBtnColor(
        data?.side_panel_close_icon_color
          ? data?.side_panel_close_icon_color
          : "#000000"
      );

      setSidePanelBtnColor(
        data?.side_panel_button_color
          ? data?.side_panel_button_color
          : "#000000"
      );
      setSidepanelBtnBorderTextColor(
        data?.side_panel_text_border_color
          ? data?.side_panel_text_border_color
          : "#000000"
      );

      setSidepanelGridBgColor(
        data?.side_panel_grid_bg_color
          ? data?.side_panel_grid_bg_color
          : "#000000"
      );

      setSidepanelGridTextColor(
        data?.side_panel_grid_text_color
          ? data?.side_panel_grid_text_color
          : "#000000"
      );

      setGallaryButtonColor(
        data?.gallery_button_color ? data?.gallery_button_color : "#000000"
      );

      setGallaryCardBackground(
        data?.gallery_card_background
          ? data?.gallery_card_background
          : "#000000"
      );

      setGallaryMainBackground(
        data?.gallery_main_background
          ? data?.gallery_main_background
          : "#000000"
      );

      setGallaryBtnTextBorderColor(
        data?.gallery_text_border_color
          ? data?.gallery_text_border_color
          : "#000000"
      );

      setGallaryTextColor(
        data?.gallery_text_color ? data?.gallery_text_color : "#000000"
      );

      // updating state of fixed social bar bg primary, if API has value that value will be added of the default value of black
      setFixedSocialBarBgPrimary(
        data?.fixed_social_bar_background_primary
          ? data?.fixed_social_bar_background_primary
          : "#000000"
      );

      // updating state of fixed social bar bg secondary, if API has value that value will be added of the default value of black
      setFixedSocialBarBgSecondary(
        data?.fixed_social_bar_background_secondary
          ? data?.fixed_social_bar_background_secondary
          : "#000000"
      );

      // updating state of fixed social bar icon bg color, if API has value that value will be added of the default value of black
      setFixedSocialBarIconBgColor(
        data?.fixed_social_bar_icon_background
          ? data?.fixed_social_bar_icon_background
          : "#000000"
      );

      // updating state of fixed social bar icon color, if API has value that value will be added of the default value of black
      setFixedSocialBarIconColor(
        data?.fixed_social_bar_icon_color
          ? data?.fixed_social_bar_icon_color
          : "#000000"
      );

      // updating state of fixed social popover bg color primary, if API has value that value will be added of the default value of black
      setSocialPopoverBgPrimary(
        data?.social_popover_background_primary
          ? data?.social_popover_background_primary
          : "#000000"
      );

      // updating state of social popover bg color secondary, if API has value that value will be added of the default value of black
      setSocialPopoverBgSecondary(
        data?.social_popover_background_secondary
          ? data?.social_popover_background_secondary
          : "#000000"
      );

      // updating state of social popover input field color, if API has value that value will be added of the default value of black
      setSocialPopoverInputColor(
        data?.social_popover_input_field_color
          ? data?.social_popover_input_field_color
          : "#000000"
      );

      // updating state of social popover input color, if API has value that value will be added of the default value of black
      setSocialPopoverColor(
        data?.social_popover_text_color
          ? data?.social_popover_text_color
          : "#000000"
      );
    }

    setFontsValue(data?.google_font ? data?.google_font : "Poppins");
  }, [data, isLoading, isError]);

  //theme setting form submit
  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      //key - values for  login colors
      login_background_color_primary: loginBgPrimary,
      login_background_color_secondary: loginBgSecondary,
      login_input_text_color: loginInputTextColor,
      login_input_text_icons_bg_color: loginTextIconInput,
      login_button_color: loginButtonColor,
      login_button_text_border_color: loginButtonTextBorderColor,
      //key - values for home layout header colors
      header_color_primary: headerColorPrimary,
      header_color_secondary: headerColorSecondary,
      header_input_bg_color: headerTextIconsInputBgColor,
      header_input_text_color: headerInputTextColor,

      // key - values for home layout dropdowns
      dropdown_main_background_primary: dropdownBgPrimaryColor,
      dropdown_main_background_secondary: dropdownBgSecondaryColor,
      dropdown_text_color: dropdownTextColor,
      dropdown_button_color: dropdownButtonColor,
      dropdown_text_border_color: dropdownButtonTextBorderColor,

      //key - values for sector layout sidepanel
      side_panel_main_background_primary: sidePanelMainBgPrimary,
      side_panel_main_background_secondary: sidePanelMainBgSecondary,
      side_panel_card_background_primary: sidePanelCardBgPrimary,
      side_panel_card_background_secondary: sidePanelCardBgSecondary,
      side_panel_text_color: sidePanelTextColor,
      side_panel_close_icon_color: sidePanelCloseBtnColor,
      side_panel_button_color: sidePanelBtnColor,
      side_panel_text_border_color: sidePanelBtnBorderTextColor,
      side_panel_grid_bg_color: sidePanelGridBgColor,
      side_panel_grid_text_color: sidePanelGridTextColor,

      //key - values for sector layout gallary page
      gallary_button_color: gallaryButtonColor,
      gallary_card_background: gallaryCardBackground,
      gallary_main_background: gallaryMainBackground,
      gallary_text_border_color: gallaryBtnTextBorderColor,
      gallary_text_color: gallaryTextColor,

      // key -value for fixed social panels and popovers
      fixed_social_bar_background_primary: fixedSocialBarBgPrimary,
      fixed_social_bar_background_secondary: fixedSocialBarBgSecondary,
      fixed_social_bar_icon_background: fixedSocialBarIconBgColor,
      fixed_social_bar_icon_color: fixedSocialBarIconColor,
      social_popover_background_primary: socialPopoverBgPrimary,
      social_popover_background_secondary: socialPopoverBgSecondary,
      social_popover_input_field_color: socialPopoverInputColor,
      social_popover_text_color: socialPopoverColor,

      //key - value for fonts
      google_font: fontsValue,
    };

    mutateAsync({ data })
      .then(res => {
        toast.success(res?.data?.message);
        localStorage.setItem("theme", JSON.stringify(data));
      })
      .catch(err => {
        toast.error(err?.message);
      });
  };

  useLayoutEffect(() => {
    //updating the primary color property of nav bar dynamically
    document.documentElement.style.setProperty("--fonts-options", fontsValue);
  }, [fontsValue]);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href={`https://fonts.googleapis.com/css2?family=${fontsValue}:wght@100;200;300;400;500;600;700;800;900&display=swap`}
          rel="stylesheet"
        />
      </Helmet>

      <div className="px-[62px] py-[39px] ">
        <Head title="Theme Option" />
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <span className={styles["heading"]}>General Settings</span>
          <div className="mt-9">
            <span className={`${styles["sub-heading"]} ${styles.fonts}`}>
              Fonts (Google Fonts)
            </span>
            <div className="pt-6 flex gap-[151px]">
              <select
                className={styles["font-select"]}
                onChange={e => setFontsValue(e.target.value)}
                id="font-values"
              >
                {fontData?.map((item, index) => (
                  <option
                    name="font-values"
                    value={item.family}
                    key={index}
                    selected={item.family === fontsValue}
                  >
                    {item.family}
                  </option>
                ))}
              </select>
              <button className={styles["save-btn"]} type="submit">
                Save
              </button>
            </div>
          </div>
          <div className="mt-[37px]">
            <div className="flex flex-col gap-2">
              <p className={styles["heading"]}>Color Options</p>
              <p className={styles["text"]}>
                Reskin the whole application with your brand colors.
              </p>
            </div>
            <div className="mt-[27px] flex flex-col gap-[50px]">
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Login Page</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Background Color Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e => {
                            setLoginBgPrimary(e.target.value);
                          }}
                          value={loginBgPrimary}
                          color={loginBgPrimary}
                          name="loginBgPrimaryPicker"
                        />
                        <input
                          type="text"
                          name="loginBgPrimaryColor"
                          className={styles.input}
                          value={loginBgPrimary}
                          onChange={e => {
                            setLoginBgPrimary(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Background Color Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={"#172A4F"}
                          value={loginBgSecondary}
                          onChange={e => {
                            setLoginBgSecondary(e.target.value);
                          }}
                          name="loginBgSecondaryColor"
                        />

                        <input
                          type="text"
                          className={styles.input}
                          value={loginBgSecondary}
                          onChange={e => setLoginBgSecondary(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Login text/icons/input bg color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          value={loginTextIconInput}
                          onChange={e => setLoginTextIconInput(e.target.value)}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={loginTextIconInput}
                          onChange={e => setLoginTextIconInput(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Input Field text Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          value={loginInputTextColor}
                          onChange={e => setLoginInputTextColor(e.target.value)}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={loginInputTextColor}
                          onChange={e => setLoginInputTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Button Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          value={loginButtonColor}
                          onChange={e => setLoginButtonColor(e.target.value)}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={loginButtonColor}
                          onChange={e => setLoginButtonColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Button Text/Border Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setLoginButtonTextBorderColor(e.target.value)
                          }
                          value={loginButtonTextBorderColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={loginButtonTextBorderColor}
                          onChange={e =>
                            setLoginButtonTextBorderColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Header</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Header Color Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e => setHeaderColorPrimary(e.target.value)}
                          color={headerColorPrimary}
                          value={headerColorPrimary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={headerColorPrimary}
                          onChange={e => setHeaderColorPrimary(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Header Color Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={data?.header_color_secondary}
                          value={headerColorSecondary}
                          onChange={e =>
                            setHeaderColorSecondary(e.target.value)
                          }
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={headerColorSecondary}
                          onChange={e =>
                            setHeaderColorSecondary(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Header text/icons/input bg color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e =>
                            setHeaderTextIconsInputBgColor(e.target.value)
                          }
                          color={data?.header_input_bg_color}
                          value={headerTextIconsInputBgColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={headerTextIconsInputBgColor}
                          onChange={e =>
                            setHeaderTextIconsInputBgColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Input Field text Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e =>
                            setHeaderInputTextColor(e.target.value)
                          }
                          color={data?.header_input_text_color}
                          value={headerInputTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={headerInputTextColor}
                          onChange={e =>
                            setHeaderInputTextColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Gallery Page</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Main Background</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e =>
                            setGallaryMainBackground(e.target.value)
                          }
                          value={gallaryMainBackground}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setGallaryMainBackground(e.target.value)
                          }
                          value={gallaryMainBackground}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Gallery Card Background
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e =>
                            setGallaryCardBackground(e.target.value)
                          }
                          value={gallaryCardBackground}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setGallaryCardBackground(e.target.value)
                          }
                          value={gallaryCardBackground}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Galery Text Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e => setGallaryTextColor(e.target.value)}
                          value={gallaryTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e => setGallaryTextColor(e.target.value)}
                          value={gallaryTextColor}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Button Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e => setGallaryButtonColor(e.target.value)}
                          value={gallaryButtonColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e => setGallaryButtonColor(e.target.value)}
                          value={gallaryButtonColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Button Text/Border Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          onChange={e =>
                            setGallaryBtnTextBorderColor(e.target.value)
                          }
                          value={gallaryBtnTextBorderColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setGallaryBtnTextBorderColor(e.target.value)
                          }
                          value={gallaryBtnTextBorderColor}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>
                  Side panel (Gallery page side panel and Product panel)
                </p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Main Background Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanalMainBgPrimary(e.target.value)
                          }
                          value={sidePanelMainBgPrimary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanalMainBgPrimary(e.target.value)
                          }
                          value={sidePanelMainBgPrimary}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Main Background Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanalMainBgSecondary(e.target.value)
                          }
                          value={sidePanelMainBgSecondary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanalMainBgSecondary(e.target.value)
                          }
                          value={sidePanelMainBgSecondary}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Card Background Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelCardBgPrimary(e.target.value)
                          }
                          value={sidePanelCardBgPrimary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelCardBgPrimary(e.target.value)
                          }
                          value={sidePanelCardBgPrimary}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Card Background Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelCardBgSecondary(e.target.value)
                          }
                          value={sidePanelCardBgSecondary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelCardBgSecondary(e.target.value)
                          }
                          value={sidePanelCardBgSecondary}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Text color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={data?.side_panel_text_color}
                          onChange={e => setSidepanelTextColor(e.target.value)}
                          value={sidePanelTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e => setSidepanelTextColor(e.target.value)}
                          value={sidePanelTextColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Close icon Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelCloseBtnColor(e.target.value)
                          }
                          value={sidePanelCloseBtnColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelCloseBtnColor(e.target.value)
                          }
                          value={sidePanelCloseBtnColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Button Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e => setSidePanelBtnColor(e.target.value)}
                          value={sidePanelBtnColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e => setSidePanelBtnColor(e.target.value)}
                          value={sidePanelBtnColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Button Text/Border Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelBtnBorderTextColor(e.target.value)
                          }
                          value={sidePanelBtnBorderTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelBtnBorderTextColor(e.target.value)
                          }
                          value={sidePanelBtnBorderTextColor}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        SidePanel Grid Background Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelGridBgColor(e.target.value)
                          }
                          value={sidePanelGridBgColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelGridBgColor(e.target.value)
                          }
                          value={sidePanelGridBgColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        SidePanel Grid Text Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSidepanelGridTextColor(e.target.value)
                          }
                          value={sidePanelGridTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSidepanelGridTextColor(e.target.value)
                          }
                          value={sidePanelGridTextColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        ScrollBar Background Color
                      </label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Scrollbar Color Primary
                      </label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Scrollbar Color Secondaryr
                      </label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>
                  Dropdowns (Sectors, Search, Filter, etc)
                </p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Main Background Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={dropdownBgPrimaryColor}
                          onChange={e =>
                            setDropdownBgPrimaryColor(e.target.value)
                          }
                          value={dropdownBgPrimaryColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={dropdownBgPrimaryColor}
                          onChange={e =>
                            setDropdownBgPrimaryColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Main Background Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={dropdownBgSecondaryColor}
                          onChange={e =>
                            setDropdownBgSecondaryColor(e.target.value)
                          }
                          value={dropdownBgSecondaryColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={dropdownBgSecondaryColor}
                          onChange={e =>
                            setDropdownBgSecondaryColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Text Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={dropdownTextColor}
                          onChange={e => setDropdownTextColor(e.target.value)}
                          value={dropdownTextColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={dropdownTextColor}
                          onChange={e => setDropdownTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Badge Background</label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Badge Color</label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Button Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e => setDropDownButtonColor(e.target.value)}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={dropdownButtonColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Button Text/Border Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setDropdownButtonTextBorderColor(e.target.value)
                          }
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={dropdownButtonTextBorderColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Hover/Active Text Color
                      </label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Social Panel</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Fixed Social bar Background Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={fixedSocialBarBgPrimary}
                          onChange={e =>
                            setFixedSocialBarBgPrimary(e.target.value)
                          }
                          value={fixedSocialBarBgPrimary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={fixedSocialBarBgPrimary}
                          onChange={e =>
                            setFixedSocialBarBgPrimary(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Fixed Social bar Background Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={fixedSocialBarBgSecondary}
                          onChange={e =>
                            setFixedSocialBarBgSecondary(e.target.value)
                          }
                          value={fixedSocialBarBgSecondary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={fixedSocialBarBgSecondary}
                          onChange={e =>
                            setFixedSocialBarBgSecondary(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Fixed Social bar icon background
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={fixedSocialBarIconBgColor}
                          onChange={e =>
                            setFixedSocialBarIconBgColor(e.target.value)
                          }
                          value={fixedSocialBarIconBgColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          value={fixedSocialBarIconBgColor}
                          onChange={e =>
                            setFixedSocialBarIconBgColor(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Fixed Social bar Icon Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={fixedSocialBarIconBgColor}
                          onChange={e =>
                            setFixedSocialBarIconColor(e.target.value)
                          }
                          value={fixedSocialBarIconColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setFixedSocialBarIconColor(e.target.value)
                          }
                          value={fixedSocialBarIconColor}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Social Popover Background Primary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={socialPopoverBgPrimary}
                          onChange={e =>
                            setSocialPopoverBgPrimary(e.target.value)
                          }
                          value={socialPopoverBgPrimary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSocialPopoverBgPrimary(e.target.value)
                          }
                          value={socialPopoverBgPrimary}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Social Popover Background Secondary
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSocialPopoverBgSecondary(e.target.value)
                          }
                          value={socialPopoverBgSecondary}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSocialPopoverBgSecondary(e.target.value)
                          }
                          value={socialPopoverBgSecondary}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Social Popover color(text/Input/icons)
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color={socialPopoverColor}
                          onChange={e => setSocialPopoverColor(e.target.value)}
                          value={socialPopoverColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e => setSocialPopoverColor(e.target.value)}
                          value={socialPopoverColor}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Input Field Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          color="#172A4F"
                          onChange={e =>
                            setSocialPopoverInputColor(e.target.value)
                          }
                          value={socialPopoverInputColor}
                        />
                        <input
                          type="text"
                          className={styles.input}
                          onChange={e =>
                            setSocialPopoverInputColor(e.target.value)
                          }
                          value={socialPopoverInputColor}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Sector and CTA Popup</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Background</label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>Text/Icon Color</label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[15px]">
                <p className={styles["sub-heading"]}>Box Shadow</p>
                <div className="flex flex-col gap-[33px]">
                  <div className="flex gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <label className={styles["text"]}>
                        Button/Icon box shadow Color
                      </label>
                      <div className="flex gap-3">
                        <input type="color" color="#172A4F" />
                        <input type="text" className={styles.input} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className={styles["sub-heading"]}>Filter Icons</p>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Teleportation Icon: Currently:{" "}
                      <span className="text-[#299AFF]">
                        filter-icons/Teleportation-Filter.svg
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Revenue Stack Icon: Currently:
                      <span className="text-[#299AFF]">
                        filter-icons/Revenue_Stack-Filter.svg
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" className={styles.input} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Geo Dot Icon: Currently:
                      <span className="text-[#299AFF]">
                        filter-icons/Geo_Dot-Filter.svg
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Video Icon: Currently:
                      <span className="text-[#299AFF]">
                        filter-icons/Interactive_Animation-Filter.svg
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Annotation Icon: Currently:
                      <span className="text-[#299AFF]">
                        filter-icons/Info-Filter.svg
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" className={styles.input} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <p className={styles["text"]}>
                      Product Icon: Currently:
                      <span className="text-[#299AFF]">
                        filter-icons/central-plant.png
                      </span>
                    </p>
                    <div className="flex flex-col gap-2">
                      <label>
                        Change: (Recommended Image Size: 30px by 30px)
                      </label>
                      <input type="file" />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className={styles["save-btn"]}
                loading={isLoadingUpdate}
                disabled={isLoadingUpdate}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ThemeOptions;
