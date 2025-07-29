import * as z from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import Panel from "rc-color-picker/lib/Panel";
import { Button, Dropdown, Input } from "antd";
import Color from "rc-color-picker/lib/helpers/color";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  useCreateSceneGroup,
  useUpdateSceneGroup,
} from "../../../../api/settings";
import Head from "../../../../Components/Head";
import styles from "./SceneGroupCreate.module.css";
import { ErrorLabel, Label } from "../../../../Components/atomic";
import { useRHForm, ControlledField } from "../../../../Components/form";

const SceneCreate = () => {
  const { ID } = useParams();
  const colors = new Color();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, color } = state ?? {};
  const {
    mutateAsync: mutateAsyncCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useCreateSceneGroup();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateSceneGroup(ID);
  const [internalColor, setInternalColor] = useState(
    color ?? `#${colors?.hex}`
  );

  const {
    Form,
    methods: {
      control,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: ID ? { name, color } : {},
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
    }),
  });

  const handleSubmit = data => {
    if (ID) {
      mutateAsyncUpdate({
        data: {
          name: data?.name,
          color: internalColor,
        },
      })
        .then(res => {
          if (res?.data) {
            toast.success(res?.data?.message);
            navigate("/web-twinprocms/scene-group");
          }
        })
        .catch(err => {
          toast.error(err?.message);
        });
      return;
    }

    mutateAsyncCreate({
      data: {
        name: data?.name,
        color: internalColor,
      },
    })
      .then(res => {
        if (res?.data) {
          toast.success(res?.data?.message);
          navigate("/web-twinprocms/scene-group");
        }
      })
      .catch(err => {
        toast.error(err?.message);
      });
  };

  const handleChange = color => {
    setInternalColor(color?.color);
  };

  const items = [
    {
      key: 1,
      label: (
        <Panel
          color={internalColor}
          enableAlpha={false}
          onChange={handleChange}
        />
      ),
      disabled: true,
    },
  ];

  return (
    <div>
      <Head title="Scene Group" />
      <h1 className={`${styles.heading} font-bold text-2xl p-8`}>
        Scene Group
      </h1>
      <hr />
      <Form onSubmit={handleSubmit}>
        <div className="w-[75rem] p-8 flex flex-col gap-6">
          <div>
            <ControlledField
              required
              control={control}
              name="name"
              label="Name"
              Component={Input}
              errors={errors}
            />
            <ErrorLabel>
              {(errorCreate || errorUpdate)?.response?.data?.name?.toString()}
            </ErrorLabel>
          </div>
          <div>
            <Label required>Color</Label>
            <Dropdown
              trigger={["click"]}
              menu={{ items }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <div>
                <Input
                  value={internalColor || ""}
                  onChange={e => setInternalColor(e.target.value)}
                />
              </div>
            </Dropdown>
            <ErrorLabel>
              {(errorCreate || errorUpdate)?.response?.data?.color?.toString()}
            </ErrorLabel>
          </div>
          <Button
            htmlType="submit"
            className={styles["save-btn"]}
            loading={isLoadingCreate || isLoadingUpdate}
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SceneCreate;
