import { z } from "zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Input, Modal } from "antd";

import { ErrorLabel } from "../../Components/atomic";
import { useEditFolder } from "../../api/fileLibrary";
import { ControlledField, useRHForm } from "../../Components/form";

const EditFolder = ({ name, isOpen, onClose, id, refetch }: any) => {
  const { mutateAsync, isLoading, error } = useEditFolder(id);

  const {
    Form,
    methods: {
      control,
      setValue,
      reset,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      name: z.string(),
    }),
  });

  useEffect(() => {
    if (name) {
      setValue("name", name);
    }
  }, [name, setValue]);

  const handleSubmit = (data: any) => {
    mutateAsync(data)
      .then((res) => {
        if (res?.data) {
          reset();
          onClose();
          toast.success("Folder updated successfully.");
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <Modal
      open={isOpen}
      title="Update SubFolder"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
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
          {(error?.response?.data as any)?.name?.toString()}
        </ErrorLabel>
        <div className="flex justify-end pt-4 ">
          <button
            className="bg-[#3d4e65] py-2 px-4 text-white rounded mr-4"
            onClick={onClose}
          >
            Close
          </button>
          ,
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="bg-[#299aff] py-2 px-4 text-white rounded"
          >
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditFolder;
