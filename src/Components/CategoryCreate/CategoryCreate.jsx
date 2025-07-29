import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../Head";
import {
  useCreateCategories,
  useGetCategoriesDetail,
  useUpdateCategories,
} from "../../api/categories";
import useRHForm from "../form/RHForm";
import { statusOptions } from "../../data";
import { Label, ErrorLabel } from "../atomic";
import ControlledField from "../form/ControlledField";
import styleCategoryCreate from "./CategoryCreate.module.css";

const { TextArea } = Input;

const CategoryCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    mutateAsync: mutateAsyncCreate,
    error: errorCreate,
    isLoading: isLoadingCreate,
  } = useCreateCategories();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateCategories(id);
  const { data: categories } = useGetCategoriesDetail(id);

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
      description: z.string().nullable().optional(),
      banner_image: z
        .any()
        .refine(val => val.length > 0, "Mobile banner image is required."),
      status: z.string({ required_error: "Status is required." }),
      category_id: z.any().optional(),
      clear_image: z.boolean().optional(),
    }),
  });

  const handleSubmit = data => {
    const formData = new FormData();
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (data?.category_id) {
      formData.append("category_id", data?.category_id);
    }
    if (data?.image?.[0]?.name) {
      formData.append("image", data?.image[0]);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }
    if (data?.status) {
      formData.append("status", data?.status);
    }
    if (data?.banner_image?.[0]?.name) {
      formData.append("banner_image", data?.banner_image[0]);
    }
    if (data?.clear_image) {
      formData.append("image", "");
    }

    if (id) {
      mutateAsyncUpdate(formData)
        .then(res => {
          if (res?.data) {
            toast.success("Category updated successfully.");
            navigate("/web-twinprocms/categories");
          }
        })
        .catch(error => {
          toast.error(error?.message);
        });
      return;
    }
    mutateAsyncCreate(formData)
      .then(res => {
        if (res?.data) {
          toast.success("Category created successfully.");
          navigate("/web-twinprocms/categories");
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (categories) {
      Object.entries(categories).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }
  }, [categories, setValue]);

  return (
    <main className={styleCategoryCreate["create-category-main-wrapper"]}>
      <Head title="Categories" />
      <div className={styleCategoryCreate["create-category-title-container"]}>
        <h1>Categories</h1>
      </div>
      <section className={styleCategoryCreate["create-category-form-wrapper"]}>
        <Form onSubmit={handleSubmit}>
          <ControlledField
            control={control}
            required
            name="name"
            label="Name"
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.name?.toString()}
          </ErrorLabel>
          <ControlledField
            control={control}
            name="category_id"
            label="Category Id"
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.category_id?.toString()}
          </ErrorLabel>
          <Label>Icon</Label>
          <p className={styleCategoryCreate["supporting-text"]}>
            Supported image extensions: PNG Preferred aspect-ratio: 1:1 (Square)
          </p>
          {categories?.image && (
            <>
              <div>
                <span>Currently:</span>
                <span className={styleCategoryCreate["update-image"]}>
                  <a
                    className="text-blue-500 hover:underline"
                    href={categories?.image}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {categories?.image}
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
            id="icon"
            style={{ width: "100%" }}
            {...register("image")}
          />
          <ErrorLabel>{errors?.image?.message}</ErrorLabel>
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.image?.toString()}
          </ErrorLabel>
          <ControlledField
            control={control}
            name="description"
            label="Description"
            Component={TextArea}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.description?.toString()}
          </ErrorLabel>
          <Label required>Mobile Banner Image</Label>
          <p className={styleCategoryCreate["supporting-text"]}>
            Supported image extensions: PNG, SVG, JPG, JPEG Preferred Dimension:
            350 x 215 (W x H)
          </p>
          {id && (
            <>
              <div>
                <span>Currently:</span>
                <span className={styleCategoryCreate["update-image"]}>
                  <a
                    className="text-blue-500 hover:underline"
                    href={categories?.banner_image}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {categories?.banner_image}
                  </a>
                </span>
              </div>
              <span>Change: </span>
            </>
          )}
          <input
            type="file"
            id="mobile-banner-image"
            style={{ width: "100%" }}
            {...register("banner_image")}
          />
          <ErrorLabel>{errors?.banner_image?.message}</ErrorLabel>
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.banner_image?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            control={control}
            name="status"
            label="Status"
            Component={Select}
            componentProps={{
              options: statusOptions,
              placeholder: "Select status",
            }}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.status?.toString()}
          </ErrorLabel>
          <div className={styleCategoryCreate["btn-container"]}>
            <Button
              htmlType="submit"
              loading={isLoadingCreate || isLoadingUpdate}
              disabled={isLoadingCreate || isLoadingUpdate}
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

export default CategoryCreate;
