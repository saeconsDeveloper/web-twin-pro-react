import { z } from "zod";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";

import { useRHForm } from "../../Components/form";
import { useAddFile } from "../../api/fileLibrary";
import { ErrorLabel } from "../../Components/atomic";

const AddFile = ({ isOpen, onClose, id, refetch }: any) => {
  const { mutateAsync, isLoading, error } = useAddFile(id);

  const {
    Form,
    methods: {
      register,
      reset,
      formState: { errors },
    },
  } = useRHForm({
    initialValues: {},
    schema: z.object({
      file: z.any().refine((val) => val.length > 0, "File is required."),
    }),
  });

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("file", data?.file?.[0]);
    mutateAsync(formData)
      .then((res) => {
        if (res?.data) {
          reset();
          onClose();
          toast.success("File created successfully.");
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  console.log(error, "err");

  return (
    <Modal
      open={isOpen}
      title="Create File"
      onOk={onClose}
      onCancel={onClose}
      footer={[]}
    >
      <Form onSubmit={handleSubmit}>
        <input type="file" {...register("file")} />
        <ErrorLabel>{errors?.file?.message}</ErrorLabel>
        <ErrorLabel>
          {(error?.response?.data as any)?.file?.toString()}
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

export default AddFile;
