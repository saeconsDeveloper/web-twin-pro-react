import * as z from "zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useCreateScene,
  useGetSceneDetail,
  useUpdateScene,
} from "../../api/scenes";
import {
  useGetBasicSettingsList,
  useGetSceneGroupsList,
} from "../../api/settings";
import Head from "../Head";
import { statusOptions } from "../../data";
import { ErrorLabel, Label } from "../atomic";
import { useRHForm, ControlledField } from "../form";
import styleSceneCreate from "./SceneCreate.module.css";
import { useGetCategoriesDropdown } from "../../api/categories";
import { useGetInteractionDropdown } from "../../api/interactions";
import { useGetUnityScenesDropdownForScene } from "../../api/unityScene";
import { useGetProductCategoriesDropdown } from "../../api/productCategories";

const SceneCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [embedType, setEmbedType] = useState("unity_scene");
  const {
    mutateAsync: mutateAsyncCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useCreateScene();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateScene(id);
  const { data: scene } = useGetSceneDetail(id);
  const { data: categories } = useGetCategoriesDropdown();
  const { data: unityScenes } = useGetUnityScenesDropdownForScene(id);
  const { data: interactions } = useGetInteractionDropdown();
  const { data: productCategories } = useGetProductCategoriesDropdown();
  const { data: sceneGroups } = useGetSceneGroupsList();
  const { data: settings } = useGetBasicSettingsList();

  const sceneGroupsOptions = sceneGroups?.map((sceneGroup) => ({
    value: sceneGroup?.id,
    label: sceneGroup?.name,
  }));

  const categoriesOptions = categories?.map((category) => ({
    value: category?.id,
    label: category?.name,
  }));

  const interactionsOptions = interactions?.map((interaction) => ({
    value: interaction?.id,
    label: interaction?.name,
  }));

  const productCategoriesOptions = productCategories?.map(
    (productCategory) => ({
      key: productCategory?.id,
      value: productCategory?.id,
      label: productCategory?.name,
    })
  );

  const unityScenesOptions = unityScenes?.map((unityScene) => ({
    value: unityScene?.id,
    label: unityScene?.name,
  }));

  const {
    Form,
    methods: {
      register,
      control,
      setValue,
      watch,
      formState: { dirtyFields, errors },
    },
  } = useRHForm({
    initialValues: {
      status: "DRAFT",
      priority: 0,
    },
    schema: z.object({
      title: z.string({ required_error: "Title is required." }),
      slug: z.string({ required_error: "Slug is required." }),
      image: z.any().refine((val) => val.length > 0, "Image is required."),
      web_url: z.any().optional(),
      unity_scene: z.number().optional(),
      description: z.string({ required_error: "Description is required" }),
      interactions: z.number().array().optional(),
      product_categories: z.number().array().optional(),
      scene_categories: z.number().array().optional(),
      scene_group: z.number().nullable().optional(),
      status: z.string({ required_error: "Status is required." }),
      priority: z.any(),
    }),
  });

  const handleSubmit = (data) => {
    const formData = new FormData();
    if (data?.title) {
      formData.append("title", data?.title);
    }
    if (data?.slug) {
      formData.append("slug", data?.slug);
    }
    if (data?.image?.[0]?.name) {
      formData.append("image", data?.image?.[0]);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }
    if (data?.web_url) {
      formData.append("web_url", data?.web_url);
    }
    formData.append("unity_scene", data?.unity_scene ?? "");
    if (data?.interactions) {
      formData.append("interactions", data?.interactions);
    }
    if (data?.product_categories) {
      formData.append("product_categories", data?.product_categories);
    }
    if (data?.scene_categories) {
      formData.append("scene_categories", data?.scene_categories);
    }
    formData.append("scene_group", data?.scene_group ?? "");
    if (data?.status) {
      formData.append("status", data?.status);
    }
    formData.append("priority", parseInt(data?.priority, 10));

    if (id) {
      mutateAsyncUpdate(formData)
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
            navigate("/web-twinprocms/scene");
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
      return;
    }

    mutateAsyncCreate(formData)
      .then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          navigate("/web-twinprocms/scene");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  const watchTitle = watch("title");

  useEffect(() => {
    if (dirtyFields?.title) {
      let slugValue;
      slugValue = watchTitle
        ?.toString()
        ?.normalize("NFD")
        ?.replace(/[\u0300-\u036f]/g, "")
        ?.toLowerCase()
        ?.trim()
        ?.replace(/[^a-z0-9 -]/g, "")
        ?.replace(/\s+/g, "-");
      setValue("slug", slugValue);
    }
  }, [watchTitle, setValue, dirtyFields]);

  useEffect(() => {
    if (scene) {
      const sceneDetail = {
        ...scene,
        unity_scene: scene?.Unity_Scene?.id,
        interactions: scene?.interactions?.map((element) => element?.id),
        product_categories: scene?.product_categories?.map(
          (element) => element?.id
        ),
        scene_categories: scene?.scene_categories?.map(
          (element) => element?.id
        ),
      };
      Object.entries(sceneDetail).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: false,
          shouldTouch: false,
        });
      });

      if (scene?.web_url && scene?.Unity_Scene) {
        setEmbedType("unity_scene");
        return;
      }

      if (scene?.web_url) {
        setEmbedType("web_url");
      }
    }
  }, [scene, setValue]);

  const handleEmbedTypeChange = (e) => {
    setEmbedType(e.target.value);
  };

  return (
    <main className={styleSceneCreate["create-scene-main-wrapper"]}>
      <Head title="Scene" />
      <div className={styleSceneCreate["title-container"]}>
        <h1>Scene</h1>
      </div>
      <section className={styleSceneCreate["form-wrapper"]}>
        <Form onSubmit={handleSubmit}>
          <ControlledField
            required
            name="title"
            label="Title"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.title?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            name="slug"
            label="Slug"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.slug?.toString()}
          </ErrorLabel>
          <Label required>Image</Label>
          <p>
            Supported image extensions: PNG, SVG, JPG, JPEG Preferred Dimension:
            1920 x 1080 (W x H)
          </p>
          {scene?.image && (
            <>
              <span>Currently:</span>
              <a
                className="text-blue-500 hover:underline"
                href={scene?.image}
                target="_blank"
                rel="noreferrer"
              >
                {scene?.image}
              </a>
              <span>Change: </span>
            </>
          )}
          <label className={styleSceneCreate["file-label"]}>
            <input type="file" {...register("image")} />
          </label>
          <ErrorLabel>{errors?.image?.message}</ErrorLabel>
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.image?.toString()}
          </ErrorLabel>

          <Label>Embed Type</Label>
          <ul className={styleSceneCreate["scene-embed-type"]}>
            <li>
              <label htmlFor="3d-model">
                <input
                  type="radio"
                  value="unity_scene"
                  name="embedType"
                  onChange={handleEmbedTypeChange}
                  checked={embedType === "unity_scene"}
                />
                Unity Scene
              </label>
            </li>
            <li>
              <label htmlFor="image">
                <input
                  type="radio"
                  value="web_url"
                  name="embedType"
                  onChange={handleEmbedTypeChange}
                  checked={embedType === "web_url"}
                />
                Web URL
              </label>
            </li>
          </ul>
          {embedType === "unity_scene" && (
            <>
              <ControlledField
                name="unity_scene"
                label="Unity Scene"
                control={control}
                Component={Select}
                componentProps={{
                  options: unityScenesOptions,
                  placeholder: "Select unity scene",
                  allowClear: true,
                  showSearch: true,
                  filterOption: (inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0,
                }}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.unity_scene?.toString()}
              </ErrorLabel>
            </>
          )}
          {embedType === "web_url" && (
            <>
              <ControlledField
                name="web_url"
                label="Web URL"
                control={control}
                Component={Input}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.web_url?.toString()}
              </ErrorLabel>
            </>
          )}
          <ControlledField
            required
            name="description"
            label="Description"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.description?.toString()}
          </ErrorLabel>
          <ControlledField
            name="interactions"
            label="Interactions"
            control={control}
            Component={Select}
            componentProps={{
              mode: "multiple",
              options: interactionsOptions,
              placeholder: "Select interaction",
              allowClear: true,
              showSearch: true,
              filterOption: (inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0,
            }}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.interactions?.toString()}
          </ErrorLabel>
          <ControlledField
            name="product_categories"
            label="Product Categories"
            control={control}
            Component={Select}
            componentProps={{
              mode: "multiple",
              options: productCategoriesOptions,
              placeholder: "Select Product Category",
              allowClear: true,
              showSearch: true,
              filterOption: (inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0,
            }}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.product_categories?.toString()}
          </ErrorLabel>
          <ControlledField
            name="scene_categories"
            label="Categories"
            control={control}
            Component={Select}
            componentProps={{
              mode: "multiple",
              options: categoriesOptions,
              placeholder: "Select Category",
              allowClear: true,
              showSearch: true,
              filterOption: (inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0,
            }}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.scene_categories?.toString()}
          </ErrorLabel>
          {!settings?.immersive_experience && (
            <>
              <ControlledField
                name="scene_group"
                label="Group"
                control={control}
                Component={Select}
                componentProps={{
                  options: sceneGroupsOptions,
                  placeholder: "Select Group",
                  allowClear: true,
                  showSearch: true,
                  filterOption: (inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0,
                }}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.scene_group?.toString()}
              </ErrorLabel>
            </>
          )}
          <ControlledField
            required
            name="status"
            label="Status"
            control={control}
            Component={Select}
            componentProps={{
              options: statusOptions,
              placeholder: "Select status",
            }}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.scene_group?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            name="priority"
            label="Group Order"
            control={control}
            Component={Input}
            errors={errors}
            componentProps={{
              type: "number",
            }}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.priority?.toString()}
          </ErrorLabel>
          <div className={styleSceneCreate["footer-btn-container"]}>
            <Button
              htmlType="submit"
              className={styleSceneCreate["submit-btn"]}
              loading={isLoadingCreate || isLoadingUpdate}
              disabled={isLoadingCreate || isLoadingUpdate}
            >
              {!(isLoadingCreate || isLoadingUpdate) && (
                <FontAwesomeIcon icon={faCheck} />
              )}
              Submit
            </Button>
            <button className={styleSceneCreate["preview-btn"]}>
              <FontAwesomeIcon icon={faEye} /> Preview
            </button>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default SceneCreate;
