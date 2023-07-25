import { toast } from "react-hot-toast";
import {
  addForm,
  deleteForm,
  getAllForm,
  updateForm,
} from "../../services/FormService";
import * as types from "./ActionType";

export const handleNav = () => {
  return {
    type: types.IS_NAV_EXPANDED,
  };
};
export const getAllFormSuccess = (payload) => {
  return { type: types.GET_ALL_FORM_SUCCESS, payload };
};

export const addFormSuccess = (payload) => {
  return { type: types.ADD_FORM_SUCCESS, payload };
};

export const updateFormSuccess = (payload) => {
  return { type: types.UPDATE_FORM_SUCCESS, payload };
};

export const deleteFormSuccess = (payload) => {
  return { type: types.DELETE_FORM_SUCCESS, payload };
};

export const getAllFormData = (id) => {
  return function (dispatch) {
    getAllForm({"userId":id})
      .then((res) => {
        dispatch(getAllFormSuccess(res));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
};



export const addFormData = (data,user_id) => {
  return function (dispatch) {
    addForm(data)
      .then((res) => {
        dispatch(addFormSuccess(res));
        toast.success("Task created successfully!");
        dispatch(getAllFormData(user_id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateFormData = (id, user_id, data) => {
  return function (dispatch) {
    updateForm(id, data)
      .then((res) => {
        dispatch(updateFormSuccess(res));
        toast.success("Task updated successfully!");
        dispatch(getAllFormData(user_id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteFormData = (id,user_id) => {
  return function (dispatch) {
    deleteForm(id)
      .then((res) => {
        dispatch(deleteFormSuccess(res.message));
        toast.success(res.message);
        dispatch(getAllFormData(user_id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
