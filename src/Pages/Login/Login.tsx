//@ts-nocheck
import { ReactElement, FC, useState, useLayoutEffect, useEffect } from "react";
//@ts-ignore
import stylesLogin from "../Login/Login.module.css";

import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useForm } from "react-hook-form";

import Button from "../../Components/Buttons/Button";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
// import { useGetThemeSettingsList } from "../../api/themeSettings";

import { useLogin } from "../../api/login";

import Image from "../../Components/Image/Image";
import { useGetConfig } from "../../api/config";
import Head from "../../Components/Head";
//@ts-ignore

const Login: FC = (): ReactElement => {
  const navigate = useNavigate();

  const loginFormSchema = z
    .object({
      username: z
        .string()
        .min(4, { message: "Username must be of minimum 4 charaters long" }),
      password: z
        .string()
        .min(4, { message: "Password must be of minimum 4 charaters long" }),
    })
    .required();

  const {
    register,
    handleSubmit,
    setFocus,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(loginFormSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isError, error } = useLogin();

  const {
    data: config,
  } = useGetConfig();

  const themes = JSON.parse(localStorage.getItem("theme"));

  // [typeof null -> 'object'];
  //  [Object.is('obj', null) -> true/false]

  //to create side effect to the css variables to change according to the theme setting page values
  useLayoutEffect(() => {
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_background_color_primary") &&
      themes?.login_background_color_primary !== "#000000"
    ) {
      //to set the value of login bg primary color
      document.documentElement.style.setProperty(
        "--login-bg-color-primary",
        themes.login_background_color_primary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_background_color_secondary ") &&
      themes?.login_background_color_secondary !== "#000000"
    ) {
      //to set the value of login bg secondary color
      document.documentElement.style.setProperty(
        "--login-bg-color-secondary",
        themes.login_background_color_secondary
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_input_text_icons_bg_color") &&
      themes?.login_input_text_icons_bg_color !== "#000000"
    ) {
      //to set the value of input field bg color, show password color, remember me color, forget password color
      document.documentElement.style.setProperty(
        "--login-text-icon-input-bg-color",
        themes.login_input_text_icons_bg_color
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_input_text_color") &&
      themes?.login_input_text_color !== "#000000"
    ) {
      //to set the color of the text inside INPUTs
      document.documentElement.style.setProperty(
        "--login-input-text-color",
        themes.login_input_text_color
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_button_color") &&
      themes?.login_button_color !== "#000000"
    ) {
      //to set the bg color of the login button
      document.documentElement.style.setProperty(
        "--login-button-color",
        themes.login_button_color
      );
    }
    if (
      typeof themes !== "undefined" &&
      Object.is(themes, null) === false &&
      themes?.hasOwnProperty("login_button_text_border_color") &&
      themes?.login_button_text_border_color !== "#000000"
    ) {
      //to set the border and text color of the login button
      document.documentElement.style.setProperty(
        "--login-button-text-border-color",
        themes.login_button_text_border_color
      );
    }
  }, [themes]);

  const handleFormSubmit = (data) => {
    mutateAsync({
      data: {
        email: data?.username?.trim(),
        password: data?.password,
      },
    }).then((response) => {
      localStorage.setItem("Token", JSON.stringify(response.data.tokens));
      window.location.href = "/"
      // navigate("/");
    });
  };

  //to add initial focus to username input field
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  //function to toggle show password
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className={stylesLogin["entire-page"]}>
        <Head title={config?.data?.title} favicon={config?.data?.favicon} />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={stylesLogin["form-container"]}
      >
        <figure className={stylesLogin.image}>
          <Image src={"/assets/company_logo.png"} alt={"Company_Logo"} />
        </figure>
        {isError && (
          <p className="py-4 text-red-700">
            Error: {error?.response?.data?.message}
          </p>
        )}
        <div className={stylesLogin["input-fields"]}>
          <>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              className={
                errors.username
                  ? stylesLogin["username-input-error"]
                  : stylesLogin.username
              }
              {...register("username")}
            />
            <div className="d-none d-sm-block"></div>
            {errors.username && (
              <span className={stylesLogin["username-error"]}>
                {errors.username?.message}
              </span>
            )}
            <input
              name="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              className={
                errors.password
                  ? stylesLogin["password-input-error"]
                  : stylesLogin.password
              }
              {...register("password")}
            />
            {errors.password && (
              <span className={stylesLogin["password-error"]}>
                {errors.password?.message} Password is required!!
              </span>
            )}
            <div className={stylesLogin["show-password-wrapper"]}>
              <input
                type={"checkbox"}
                className={stylesLogin["show-password"]}
                name="show-password"
                id="show-password"
                checked={showPassword}
                onChange={toggleShowPassword}
              />
              <label htmlFor="show-password">Show Password?</label>
            </div>
            <div className={stylesLogin["remember-wrapper"]}>
              <input
                type="checkbox"
                className={stylesLogin["remember-me"]}
                name="remember-me"
                id="remember-me"
              />
              <label htmlFor="remember-me">Remember me?</label>
            </div>
          </>
        </div>
        <Button
          value={isSubmitting ? "Loading..." : "Submit"}
          btnType={"submit"}
          className={
            errors.username || errors.password || !isValid
              ? stylesLogin["login-disable-btn"]
              : stylesLogin["login-btn"]
          }
          disabled={errors.username || errors.password || !isValid}
        />
        <span style={{ zIndex: "3" }} onClick={() => setShow((prev) => !prev)}>
          Forgot Password
        </span>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </main>
  );
};

export default Login;
