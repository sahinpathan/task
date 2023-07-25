import React from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "../../hook-form";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFormData, updateFormData } from "../../redux/common/Action";
import * as Yup from "yup";
import RHFSelect from "../../hook-form/RHFSelect";
import DOMPurify from 'dompurify';

const Schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/[^\s*].*[^\s*]/g, "Only blank spaces is not allowed!"),
  email: Yup.string()
    .required("Name is required")
    .matches(/[^\s*].*[^\s*]/g, "Only blank spaces is not allowed!"),
});

const TaskStatus= [
  {
    id: 1,
    title: "TODO",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "Done",
  },
];

const FormBuilderForm = ({ handleClose, currentRow }) => {
  const defaultValues = currentRow;
  const dispatch = useDispatch();
  const {user_id = ""} = useSelector((state) => state.Auth);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting = false, errors },
  } = methods;

  const onSubmit = (data) => {
    const formData = {
      title: DOMPurify.sanitize(data.title),
      description: DOMPurify.sanitize(data.description),
      status: data.status,
      userId: user_id,
    };
    if (data.id) {
      dispatch(updateFormData(data.id, user_id, formData));
    } else {
      dispatch(addFormData(formData,user_id));
    }
    handleClose();
  };

  return (
    <>
      <Modal
        title={"Task Form"}
        onCancel={handleClose}
        loading={isSubmitting}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} className="css-1lwbda4-MuiStack-root">
            <RHFTextField name="title" label="Title *" autoFocus={true} />
            <RHFTextField name="description" label="Description *" autoFocus={true} />
            <RHFSelect
              name="status"
              label="Task Status"
              options={TaskStatus}
            />
          </Stack>
          <div className="model-footer">
            <button
              type="button"
              onClick={handleClose}
              className="cancel-btn border-btn">
              Cancel
            </button>
            <button type="submit" className="Save-btn cmn-btn">
              Submit
            </button>
          </div>
        </FormProvider>
      </Modal>
    </>
  );
};

export default FormBuilderForm;
