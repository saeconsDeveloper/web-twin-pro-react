import { z } from "zod";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../Head";
import {
  useCreateProductCategories,
  useGetProductCategoriesDetail,
  useUpdateProductCategories,
} from "../../api/productCategories";
import { statusOptions } from "../../data";
import { ErrorLabel, Label } from "../atomic";
import { useRHForm, ControlledField } from "../form";
import { useGet3dModelsDropdown } from "../../api/model3d";
import styleProductCategoryCreate from "./ProductCategory.module.css";

const ProductCategoryCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mediaType, setMediaType] = useState("modal_3d");
  const { data } = useGetProductCategoriesDetail(id);
  const { data: models3d } = useGet3dModelsDropdown();
  const {
    mutateAsync: mutateAsyncCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useCreateProductCategories();

  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateProductCategories(id);

  const model3dOptions = models3d?.map((model) => ({
    value: model?.id,
    label: model?.file?.slice(14),
  }));

  const {
    Form,
    methods: {
      control,
      register,
      setValue,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {
      status: "DRAFT",
    },
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
      image: z.any().optional(),
      model_3d: z.number().optional(),
      icon_image: z.any().optional(),
      description: z.string().optional(),
      status: z.string({ required_error: "Status is required." }),
      product_button_id: z.string().optional(),
      clear_image: z.boolean().optional(),
    }),
  });

  const handleSubmit = (data) => {
    const formData = new FormData();
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (data?.image?.[0]?.name) {
      formData.append("image", data?.image[0]);
    }
    formData.append("model_3d", data?.model_3d ?? "");
    if (data?.description) {
      formData.append("description", data?.description);
    }
    if (data?.product_button_id) {
      formData.append("product_button_id", data?.product_button_id);
    }
    if (data?.status) {
      formData.append("status", data?.status);
    }
    if (data?.icon_image?.[0]?.name) {
      formData.append("icon_image", data?.icon_image?.[0]);
    }
    if (data?.clear_image) {
      formData.append("image", "");
    }

    if (id) {
      mutateAsyncUpdate(formData)
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
            navigate("/web-twinprocms/product-category");
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
          navigate("/web-twinprocms/product-category");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };

  useEffect(() => {
    if (data?.product_category) {
      const filteredData = Object.entries(data?.product_category).reduce(
        (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
        {}
      );
      const productCategory = {
        ...filteredData,
        model_3d: filteredData?.model_3d?.id,
      };
      Object.entries(productCategory).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }

    if (data?.product_category?.image && data?.product_category?.model_3d) {
      setMediaType("modal_3d");
      return;
    }

    if (data?.product_category?.image) {
      setMediaType("image");
    }
  }, [data, setValue]);

  return (
    <main
      className={
        styleProductCategoryCreate["create-product-category-main-wrapper"]
      }
    >
      <Head title="Products Categories" />
      <div
        className={
          styleProductCategoryCreate["create-product-category-title-container"]
        }
      >
        <h1 className={styleProductCategoryCreate.title}>Product Categories</h1>
      </div>
      <section
        className={
          styleProductCategoryCreate["create-product-category-form-container"]
        }
      >
        <Form onSubmit={handleSubmit}>
          <ControlledField
            required
            name="name"
            label="Name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.name?.toString()}
          </ErrorLabel>
          <Label>Media Type</Label>
          <ul className={styleProductCategoryCreate["media-type"]}>
            <li>
              <label htmlFor="3d-model">
                <input
                  type="radio"
                  value="modal_3d"
                  name="media_type"
                  onChange={handleMediaTypeChange}
                  checked={mediaType === "modal_3d"}
                />
                3D Model
              </label>
            </li>
            <li>
              <label htmlFor="image">
                <input
                  type="radio"
                  value="image"
                  name="media_type"
                  onChange={handleMediaTypeChange}
                  checked={mediaType === "image"}
                />
                Image
              </label>
            </li>
          </ul>
          {mediaType === "image" && (
            <>
              <div
                className={styleProductCategoryCreate["update-image-container"]}
              >
                <Label>Image</Label>
                <p>
                  Supported image extensions: PNG, SVG, JPG, JPEG Preferred
                  Dimension: 380 x 210 (W x H)
                </p>
              </div>
              {data?.product_category?.image && (
                <>
                  <div>
                    <span>Currently:</span>
                    <span
                      className={styleProductCategoryCreate["update-image"]}
                    >
                      <a
                        className="text-blue-500 hover:underline"
                        href={data?.product_category?.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {data?.product_category?.image}
                      </a>
                    </span>
                    <input
                      type="checkbox"
                      {...register("clear_image")}
                      className="mx-3"
                    />
                    <Label>Clear</Label>
                  </div>
                  <span>Change: </span>
                </>
              )}
              <input
                type="file"
                style={{ width: "100%" }}
                {...register("image")}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.image?.toString()}
              </ErrorLabel>
            </>
          )}

          {mediaType === "modal_3d" && (
            <>
              <ControlledField
                name="model_3d"
                label="Modal 3D"
                control={control}
                Component={Select}
                componentProps={{
                  options: model3dOptions,
                  placeholder: "Select 3d model",
                  allowClear: true,
                  showSearch: true,
                  filterOption: (inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0,
                }}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.model_3d?.toString()}
              </ErrorLabel>
            </>
          )}
          <ControlledField
            name="product_button_id"
            label="Product Button Id"
            Component={Input}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.product_button_id?.name?.toString()}
          </ErrorLabel>
          <ControlledField
            name="description"
            label="Description"
            control={control}
            Component={Input.TextArea}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.description?.toString()}
          </ErrorLabel>
          <Label>Icon</Label>
          <p>
            Supported image extensions: PNG Preferred aspect-ratio: 1:1 (Square)
          </p>
          {data?.product_category?.icon_image && (
            <>
              <span>Currently:</span>
              <a
                className="text-blue-500 hover:underline"
                href={data?.product_category?.icon_image}
                target="_blank"
                rel="noreferrer"
              >
                {data?.product_category?.icon_image}
              </a>
              <span>Change: </span>
            </>
          )}
          <input type="file" id="icon" {...register("icon_image")} />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.icon_image?.toString()}
          </ErrorLabel>
          <ControlledField
            name="status"
            label="Status*"
            control={control}
            Component={Select}
            errors={errors}
            componentProps={{ options: statusOptions }}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.status?.toString()}
          </ErrorLabel>
          <div
            className={
              styleProductCategoryCreate[
                "create-product-category-btn-container"
              ]
            }
          >
            <Button
              htmlType="submit"
              loading={isLoadingCreate || isLoadingUpdate}
              disabled={isLoadingCreate || isLoadingUpdate}
              className={
                styleProductCategoryCreate["product-category-submit-btn"]
              }
            >
              {!(isLoadingCreate || isLoadingUpdate) && (
                <FontAwesomeIcon icon={faCheck} />
              )}
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default ProductCategoryCreate;
