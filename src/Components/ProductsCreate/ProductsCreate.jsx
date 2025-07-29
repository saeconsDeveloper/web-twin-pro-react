import z from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../Head";
import {
  useCreateProduct,
  useGetProductDetail,
  useUpdateProduct,
} from "../../api/products";
import useRHForm from "../form/RHForm";
import { ErrorLabel } from "../atomic";
import { statusOptions } from "../../data";
import ControlledField from "../form/ControlledField";
import { useGet3dModelsDropdown } from "../../api/model3d";
import styleProductCreate from "./ProductCreate.module.css";
import { useGetProductCategoriesDropdown } from "../../api/productCategories";

const ProductsCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    mutateAsync: mutateAsyncCreate,
    error: errorCreate,
    isLoading: isLoadingCreate,
  } = useCreateProduct();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateProduct(id);
  const { data } = useGetProductDetail(id);
  const { data: models3d } = useGet3dModelsDropdown();
  const { data: productCategories } = useGetProductCategoriesDropdown();

  const productCategoriesOptions = productCategories?.map(
    (productCategory) => ({
      value: productCategory?.id,
      label: productCategory?.name,
    })
  );

  const model3dOptions = models3d?.map((model) => ({
    value: model?.id,
    label: model?.file?.slice(14),
  }));

  const {
    Form,
    methods: {
      control,
      setValue,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {
      status: "DRAFT",
    },
    schema: z.object({
      product_category: z.number({
        required_error: "Product category is required.",
      }),
      name: z.string({ required_error: "Name is required." }),
      hyper_link: z.string().optional(),
      description: z.string({ required_error: "Description is required." }),
      service: z.number().optional(),
      vendor_service_name: z.string().optional(),
      vendor_service_desc: z.string().optional(),
      price: z.any().optional(),
      vendor: z.string().optional(),
      manager_name: z.string().optional(),
      how_to_request: z.string().optional(),
      status: z.string({ required_error: "Status is required." }),
      model_3d: z.number().optional(),
    }),
  });

  const handleSubmit = (data) => {
    const formData = {
      ...data,
      model_3d: data?.model_3d ?? "",
    };
    if (id) {
      mutateAsyncUpdate(formData)
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
            navigate("/web-twinprocms/products");
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
          navigate("/web-twinprocms/products");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  useEffect(() => {
    if (data) {
      const filteredData = Object.entries(data).reduce(
        (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
        {}
      );
      const product = {
        ...filteredData,
        product_category: filteredData?.product_category?.id,
        model_3d: filteredData?.model_3d?.id,
      };
      Object.entries(product).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }
  }, [data, setValue]);

  return (
    <main className={styleProductCreate["products-create-main-container"]}>
      <Head title="Products" />
      <div className={styleProductCreate["products-create-title-container"]}>
        <h1>Products</h1>
      </div>
      <section className={styleProductCreate["products-create-form-container"]}>
        <Form onSubmit={handleSubmit}>
          <ControlledField
            required
            name="product_category"
            label="Product Category"
            control={control}
            Component={Select}
            errors={errors}
            componentProps={{
              options: productCategoriesOptions,
              placeholder: "Select product category",
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
            )?.response?.data?.product_category?.toString()}
          </ErrorLabel>
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
          <ControlledField
            name="hyper_link"
            label="Hyperlink"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.hyper_link?.toString()}
          </ErrorLabel>
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
          <p>
            0/150 (If the description is more than 150 characters, it will get
            truncated.)
          </p>
          <ControlledField
            name="vendor_service_name"
            label="Vendor's Service name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.vendor_service_name?.toString()}
          </ErrorLabel>
          <ControlledField
            name="vendor_service_desc"
            label="Vendor's service description"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.vendor_service_desc?.toString()}
          </ErrorLabel>
          <ControlledField
            name="price"
            label="Price"
            control={control}
            Component={Input}
            errors={errors}
            componentProps={{ type: "number" }}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.price?.toString()}
          </ErrorLabel>
          <ControlledField
            name="vendor"
            label="Vendor name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.vendor?.toString()}
          </ErrorLabel>
          <ControlledField
            name="manager_name"
            label="Manager's Name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.manager_name?.toString()}
          </ErrorLabel>
          <ControlledField
            name="how_to_request"
            label="How to request"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.how_to_request?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            name="status"
            label="Status"
            control={control}
            Component={Select}
            errors={errors}
            componentProps={{
              options: statusOptions,
              placeholder: "Select status",
            }}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.loading_text?.toString()}
          </ErrorLabel>
          <ControlledField
            name="model_3d"
            label="Model 3D"
            control={control}
            Component={Select}
            errors={errors}
            componentProps={{
              options: model3dOptions,
              placeholder: "Select model3d",
              allowClear: true,
              showSearch: true,
              filterOption: (inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0,
            }}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.model_3d?.toString()}
          </ErrorLabel>
          <div className={styleProductCreate["product-create-btn-container"]}>
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

export default ProductsCreate;
