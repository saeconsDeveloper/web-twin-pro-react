import { z } from "zod";
import { Button, Input } from "antd";
import { toast } from "react-toastify";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Head from "../Head";
import useRHForm from "../form/RHForm";
import { ErrorLabel, Label } from "../atomic";
import ControlledField from "../form/ControlledField";
import styleUnityScene from "./UnitySceneCreate.module.css";
import { useCreateUnityScene, useUpdateUnityScene } from "../../api/unityScene";
import { useEffect } from "react";

const UnitySceneCreate = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    mutateAsync: mutateAsyncCreate,
    error: errorCreate,
    isLoading: isLoadingCreate,
  } = useCreateUnityScene();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateUnityScene(id);

  const { name, loading_text, unity_file, background_image } =
    state?.item ?? {};

  const {
    Form,
    methods: {
      register,
      control,
      watch,
      setValue,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: id
      ? { name, loading_text, unity_file, background_image }
      : {},
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
      loading_text: z.string().nullable().optional(),
      unity_file: z
        .any()
        .refine(val => val.length > 0, "Unity file is required."),
      background_image: z.any().optional(),
      clear_image: z.boolean().optional(),
    }),
  });

  const watchUnityFile = watch("unity_file");
  useEffect(() => {
    if (watchUnityFile?.[0]?.name) {
      setValue(
        "name",
        watchUnityFile?.[0]?.name?.substring(
          0,
          watchUnityFile?.[0]?.name?.length - 4
        )
      );
    }
  }, [watchUnityFile, setValue]);

  const handleSubmit = data => {
    const formData = new FormData();
    if (data?.name) {
      formData.append("name", data?.name);
    }
    if (data?.loading_text) {
      formData.append("loading_text", data?.loading_text);
    }
    if (data?.unity_file?.[0]?.name) {
      formData.append("unity_file", data?.unity_file?.[0]);
    }
    if (data?.background_image?.[0]?.name) {
      formData.append("background_image", data?.background_image?.[0]);
    }
    if (data?.clear_image) {
      formData.append("background_image", "");
    }

    if (id) {
      mutateAsyncUpdate(formData)
        .then(res => {
          if (res?.data) {
            toast.success("Unity scene updated successfully.");
            navigate("/web-twinprocms/unity-scene");
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
          toast.success("Unity scene created successfully.");
          navigate("/web-twinprocms/unity-scene");
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  const downLoadFile = `${window.location.origin}/${unity_file}`;

  return (
    <main>
      <Head title="Unity Scene" />
      <div className={styleUnityScene["title-container"]}>
        <h1>Unity Scenes</h1>
      </div>
      <section className={styleUnityScene["form-wrapper"]}>
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
          <Label required>Unity File</Label>
          <p>
            Supported image extensions: PNG, SVG, JPG, JPEG Preferred Dimension:
            1920 x 1080 (W x H)
          </p>
          {unity_file && (
            <>
              <span>Currently:</span>
              <a
                href={downLoadFile}
                download={downLoadFile}
                className="text-blue-500"
              >
                {unity_file}
              </a>
              <span>Change: </span>
            </>
          )}
          <input type="file" {...register("unity_file")} />
          <ErrorLabel>{errors?.unity_file?.message}</ErrorLabel>
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.unity_file?.toString()}
          </ErrorLabel>
          <Label>Loading Image</Label>
          <p>
            Supported image extensions: PNG, SVG, JPG, JPEG Preferred Dimension:
            1920 x 1080 (W x H)
          </p>
          {background_image && (
            <>
              <div>
                <span>Currently:</span>
                <a
                  className="text-blue-500 hover:underline"
                  href={background_image}
                  target="_blank"
                  rel="noreferrer"
                >
                  {background_image}
                </a>
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
          <input type="file" {...register("background_image")} />
          <ErrorLabel>{errors?.background_image?.message}</ErrorLabel>
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.background_image?.toString()}
          </ErrorLabel>
          <ControlledField
            name="loading_text"
            label="Loading Text"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.loading_text?.toString()}
          </ErrorLabel>
          <div className={styleUnityScene["footer-btn-container"]}>
            <Button
              htmlType="submit"
              loading={isLoadingCreate || isLoadingUpdate}
              disabled={isLoadingCreate || isLoadingUpdate}
              className={styleUnityScene["submit-btn"]}
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

export default UnitySceneCreate;
