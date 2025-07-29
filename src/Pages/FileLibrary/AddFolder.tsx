import { z } from "zod";
import { toast } from "react-toastify";
import { Button, Input, Modal } from "antd";

import { useAddFolder } from "../../api/fileLibrary";
import { ErrorLabel } from "../../Components/atomic";
import { useRHForm, ControlledField } from "../../Components/form";

const AddFolder = ({ isOpen, onClose, id, refetch }: any) => {
  const { mutateAsync, isLoading, error } = useAddFolder(id);

  const {
    Form,
    methods: {
      control,
      formState: { errors },
      reset,
    },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      name: z.string({ required_error: "Name is required." }),
    }),
  });

  const handleSubmit = (data: any) => {
    mutateAsync(data)
      .then((res) => {
        if (res?.data) {
          reset();
          onClose();
          toast.success("Folder created successfully.");
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
      title="Create SubFolder"
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
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="bg-[#299aff] py-2 px-4 text-white rounded"
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddFolder;
