import { z } from "zod";
import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTimes } from "@fortawesome/free-solid-svg-icons";

import {
  useGetHomepageOptionsList,
  useUpdateHomepageSettings,
} from "../../../api/settings";
import Head from "../../../Components/Head";
import styles from "./HomepageOptions.module.css";
import DefaultImage from "../../../assets/default-image.png";
import { useRHForm, ControlledField } from "../../../Components/form";
import { useGetUnityScenesDropdownSettings } from "../../../api/unityScene";

const HomepageOptions = () => {
  const [editImage, setEditImage] = useState(false);
  const [editScene, setEditScene] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const { data } = useGetHomepageOptionsList();
  const { mutateAsync, isLoading } = useUpdateHomepageSettings();
  const { data: unityScenes } = useGetUnityScenesDropdownSettings();

  const unityScenesOptions = unityScenes?.map(unityScene => ({
    value: unityScene?.id,
    label: unityScene?.name,
  }));

  const sceneName = unityScenesOptions?.filter(
    unityScene => unityScene?.value === data?.scene
  )?.[0]?.label;

  const {
    Form,
    methods: { register, control, watch, setValue },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      option: z.string(),
      image: z.any().optional(),
      scene: z.number().optional(),
      video_embed_code: z.any().optional(),
    }),
  });

  const handleSubmit = data => {
    const formData = new FormData();
    formData.append("option", data?.option);
    if (watchOption === "IMAGE") {
      if (data?.image?.[0]?.name) {
        formData.append("image", data?.image[0]);
      }
    }
    if (watchOption === "SCENE") {
      formData.append("scene", data?.scene);
    }
    if (watchOption === "VIDEO") {
      formData.append("video_embed_code", data?.video_embed_code);
    }
    mutateAsync(formData)
      .then(res => {
        if (res?.data) {
          setEditImage(false);
          setEditScene(false);
          setEditVideo(false);
          toast.success(res?.data?.message);
        }
      })
      .catch(err => {
        toast.error(err?.response?.data?.image?.toString());
      });
  };

  const handleSetDefault = evt => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("option", data?.option);
    formData.append("image", "");
    mutateAsync(formData)
      .then(res => {
        toast.success(res?.data?.message);
      })
      .catch(err => {
        toast.error(err?.response?.data?.image);
      });
  };

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }
  }, [data, setValue]);

  const handleSelectChange = value => {
    mutateAsync({
      option: value,
    })
      .then(res => {
        setEditScene(false);
        toast.success(res?.data?.message);
      })
      .catch(err => {
        toast.error(err?.response?.data?.scene);
      });
  };

  const watchOption = watch("option");

  return (
    <div className="w-full p-6">
      <Head title="Homepage Option" />
      <div className="py-5  ">
        <span className={styles["heading"]}>Homepage Option</span>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="py-5 flex justify-between border-b">
          <span className={styles["text"]}>Select</span>
          <ControlledField
            control={control}
            name="option"
            Component={Select}
            componentProps={{
              onChange: handleSelectChange,
              options: [
                { label: "IMAGE", value: "IMAGE" },
                { label: "SCENE", value: "SCENE" },
                {
                  label: "VIDEO",
                  value: "VIDEO",
                },
              ],
            }}
            className="w-[539px]"
          />
        </div>
        {data?.option === "IMAGE" && (
          <div className="flex justify-between py-5 border-b">
            <span className={styles["text"]}>Image</span>
            {editImage ? (
              <div className="flex gap-2 w-[539px]">
                <input type="file" {...register("image")} />
                <Button htmlType="submit" loading={isLoading}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button onClick={() => setEditImage(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            ) : (
              <div className={styles["editable-cell"]}>
                <img
                  src={data?.image ?? DefaultImage}
                  height="200"
                  width="200"
                  alt="logo"
                />
                <button
                  className={styles["btn"]}
                  onClick={() => setEditImage(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <Button onClick={handleSetDefault} loading={isLoading}>
                  Set Default
                </Button>
              </div>
            )}
          </div>
        )}
        {data?.option === "SCENE" && (
          <div className="flex justify-between  py-5 border-b">
            <span className={styles["text"]}>Scene</span>
            {editScene ? (
              <div className="flex gap-2 w-[539px]">
                <ControlledField
                  control={control}
                  name="scene"
                  Component={Select}
                  componentProps={{
                    options: unityScenesOptions,
                    placeholder: "Select scene",
                    allowClear: true,
                    showSearch: true,
                    filterOption: (inputValue, option) =>
                      option.label
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) >= 0,
                  }}
                  className="w-[450px]"
                />
                <Button htmlType="submit" loading={isLoading}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button onClick={() => setEditScene(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            ) : (
              <div className={styles["editable-cell"]}>
                <span className={styles["text"]}>{sceneName}</span>
                <button
                  className={styles["btn"]}
                  onClick={() => setEditScene(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            )}
          </div>
        )}
        {data?.option === "VIDEO" && (
          <div className="flex justify-between  py-5 border-b">
            <span className={styles["text"]}>Video</span>
            {editVideo ? (
              <div className="flex gap-2 w-[539px]">
                <input
                  {...register("video_embed_code")}
                  className="w-[500px]"
                />
                <Button htmlType="submit" loading={isLoading}>
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
                <Button onClick={() => setEditVideo(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            ) : (
              <div className={styles["editable-cell"]}>
                <span className={styles["text"]}>{data?.video_embed_code}</span>
                <button
                  className={styles["btn"]}
                  onClick={() => setEditVideo(true)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            )}
          </div>
        )}
      </Form>
    </div>
  );
};

export default HomepageOptions;
