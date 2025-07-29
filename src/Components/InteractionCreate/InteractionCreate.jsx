import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Head from "../Head";
import {
  useCreateInteraction,
  useGetInteractionDetail,
  useUpdateInteraction,
} from "../../api/interactions";
import { ErrorLabel } from "../atomic";
import { statusOptions } from "../../data";
import { useRHForm, ControlledField } from "../form";
import { useGetScenesDropdown } from "../../api/scenes";
import { useGetFilterActionsList } from "../../api/settings";
import styleInteractionCreate from "./InteractionCreate.module.css";

const InteractionCreate = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const {
    mutateAsync: mutateAsyncCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useCreateInteraction();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateInteraction(ID);
  const { data } = useGetInteractionDetail(ID);
  const { data: scenes } = useGetScenesDropdown();
  const { data: filterActions } = useGetFilterActionsList();

  const sceneOptions = scenes?.map((scene) => ({
    value: scene?.id,
    label: scene?.title,
  }));

  const interactionTyeOptions = filterActions?.map((filterAction) => ({
    value: filterAction?.id,
    label: filterAction?.name,
  }));

  const {
    Form,
    methods: {
      control,
      watch,
      setValue,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {
      status: "DRAFT",
    },
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
      action_type: z.number({
        required_error: "Interaction type is required.",
      }),
      unity_scene_teleportation_id: z.string().nullable().optional(),
      scene: z.number().nullable().optional(),
      unity_scene_annotation_id: z.string().nullable().optional(),
      unity_scene_video_id: z.string().nullable().optional(),
      embed_link: z.string().nullable().optional(),
      revenue_stack_number: z.string().nullable().optional(),
      status: z.string({ required_error: "Status is required." }),
    }),
  });

  useEffect(() => {
    if (data) {
      const filteredData = Object.entries(data).reduce(
        (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
        {}
      );
      const interaction = {
        ...filteredData,
        action_type: data?.action_type?.id,
      };
      Object.entries(interaction).forEach(([key, value]) => {
        setValue(key, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      });
    }
  }, [data, setValue]);

  const watchActionType = watch("action_type");
  const filteredAction = interactionTyeOptions?.filter(
    (i) => i?.value === watchActionType
  )?.[0]?.label;

  const handleSubmit = (data) => {
    const formData = {
      ...data,
      scene: data?.scene ?? null,
    };
    if (ID) {
      mutateAsyncUpdate(formData)
        .then((res) => {
          if (res?.data) {
            toast.success(res?.data?.message);
            navigate("/web-twinprocms/interaction");
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
          navigate("/web-twinprocms/interaction");
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <main className={styleInteractionCreate["interaction-create-main-wrapper"]}>
      <Head title="Interactions" />
      <div
        className={styleInteractionCreate["interaction-create-title-container"]}
      >
        <h1>Iteractions</h1>
      </div>
      <section
        className={styleInteractionCreate["interaction-create-form-container"]}
      >
        <Form onSubmit={handleSubmit}>
          <ControlledField
            name="name"
            label="Name*"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.name?.toString()}
          </ErrorLabel>
          <ControlledField
            name="action_type"
            label="Interaction Type*"
            control={control}
            Component={Select}
            componentProps={{
              options: interactionTyeOptions,
              placeholder: "Select interaction type",
            }}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.action_type?.toString()}
          </ErrorLabel>
          {filteredAction === "Teleportation" && (
            <>
              <ControlledField
                name="unity_scene_teleportation_id"
                label="Unity Scene Teleportation ID"
                control={control}
                Component={Input}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.unity_scene_teleportation_id?.toString()}
              </ErrorLabel>
            </>
          )}
          {(filteredAction === "Teleportation" ||
            filteredAction === "Geo Dot") && (
            <>
              <ControlledField
                name="scene"
                label="Scene"
                control={control}
                Component={Select}
                componentProps={{
                  options: sceneOptions,
                  placeholder: "Select scene",
                  allowClear: true,
                  showSearch: true,
                  filterOption: (inputValue, option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) >= 0,
                }}
                errors={errors}
              />
              <p className="text-red-500">
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.scene?.toString()}
              </p>
            </>
          )}
          {filteredAction === "Annotation" && (
            <>
              <ControlledField
                name="unity_scene_annotation_id"
                label="Unity Scene Annotation ID"
                control={control}
                Component={Input}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.unity_scene_annotation_id?.toString()}
              </ErrorLabel>
            </>
          )}
          {filteredAction === "Video" && (
            <>
              <ControlledField
                name="unity_scene_video_id"
                label="Unity Scene Video ID"
                control={control}
                Component={Input}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.unity_scene_video_id?.toString()}
              </ErrorLabel>
              <ControlledField
                name="embed_link"
                label="Video Embed Link"
                control={control}
                Component={Input}
                errors={errors}
              />
              <ErrorLabel>
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.embed_link?.toString()}
              </ErrorLabel>
            </>
          )}
          {filteredAction === "Revenue Stack" && (
            <>
              <ControlledField
                name="revenue_stack_number"
                label="Revenue Stack Number"
                control={control}
                Component={Input}
                componentProps={{
                  type: "number",
                }}
                errors={errors}
              />
              <p className="text-red-500">
                {(
                  errorCreate || errorUpdate
                )?.response?.data?.revenue_stack_number?.toString()}
              </p>
            </>
          )}
          <ControlledField
            name="status"
            label="Status*"
            control={control}
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
          <div className={styleInteractionCreate["btn-container"]}>
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

export default InteractionCreate;
