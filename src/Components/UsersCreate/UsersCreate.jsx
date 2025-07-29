import z from "zod";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Head from "../Head";
import { roles } from "../../data";
import styleUserCreate from "./UsersCreate.module.css";
import { useCreateUser, useUpdateUser } from "../../api/users";
import { useRHForm, ControlledField } from "../form";
import { ErrorLabel } from "../atomic";

const UsersCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    mutateAsync: mutateAsyncCreate,
    isLoading: isLoadingCreate,
    error: errorCreate,
  } = useCreateUser();
  const {
    mutateAsync: mutateAsyncUpdate,
    isLoading: isLoadingUpdate,
    error: errorUpdate,
  } = useUpdateUser(id);

  const { first_name, last_name, email, groups } = state ?? {};

  const {
    Form,
    methods: {
      control,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: id
      ? { first_name, last_name, email, role: groups?.[0]?.role }
      : {},
    schema: z.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      role: z.string({ required_error: "Role is required." }),
      email: z.string({ required_error: "Username/email is required." }),
    }),
  });

  const handleSubmit = data => {
    const formData = new FormData();
    if (data?.first_name) {
      formData.append("first_name", data?.first_name);
    }
    if (data?.last_name) {
      formData.append("last_name", data?.last_name);
    }
    if (data?.role) {
      formData.append("role", data?.role);
    }
    if (data?.email) {
      formData.append("email", data?.email);
    }
    if (id) {
      mutateAsyncUpdate(formData)
        .then(res => {
          if (res?.data) {
            toast.success("User updated successfully.");
            navigate("/web-twinprocms/users");
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
          toast.success("User created successfully.");
          navigate("/web-twinprocms/users");
        }
      })
      .catch(error => {
        toast.error(error?.message);
      });
  };

  return (
    <main className={styleUserCreate["user-create-main-container"]}>
      <Head title="Users" />
      <div className={styleUserCreate["user-create-title-container"]}>
        <h1>User</h1>
      </div>
      <section className={styleUserCreate["user-create-form-container"]}>
        <Form onSubmit={handleSubmit}>
          <ControlledField
            name="first_name"
            label="First Name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.first_name?.toString()}
          </ErrorLabel>
          <ControlledField
            name="last_name"
            label="Last Name"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(
              errorCreate || errorUpdate
            )?.response?.data?.last_name?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            name="email"
            label="Username/Email"
            control={control}
            Component={Input}
            errors={errors}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.email?.toString()}
          </ErrorLabel>
          <ControlledField
            required
            name="role"
            label="Role"
            control={control}
            Component={Select}
            errors={errors}
            componentProps={{
              options: roles,
              placeholder: "Select role",
              allowClear: true,
              showSearch: true,
              filterOption: (inputValue, option) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >=
                0,
            }}
          />
          <ErrorLabel>
            {(errorCreate || errorUpdate)?.response?.data?.role?.toString()}
          </ErrorLabel>
          <div className={styleUserCreate["user-create-button-container"]}>
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

export default UsersCreate;
