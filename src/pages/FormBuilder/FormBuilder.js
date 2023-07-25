import React, { useEffect, useState } from "react";
import ConfirmDialog from "../../components/ConFirmDialog";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/Iconify";
import Layout from "../../Layout";
import FormBuilderForm from "./FormBuilderForm";
import { deleteFormData, getAllFormData } from "../../redux/common/Action";
import { useTableSearch } from "../../hook/useTableSearch";
import { Tooltip } from "@mui/material";
import RHFSelect from "../../hook-form/RHFSelect";

const initialValues = {
  id: "",
  title: "",
  description: "",
  status: "",
};

const TaskStatus= [
  {
    id: 0,
    title: "ALL",
  },
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
const FormBuilder = () => {
  const [currentRow, setCurrentRow] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.Common.FormData);
  const {user_id = ""} = useSelector((state) => state.Auth);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: data,
  });
  useEffect(() => {
    dispatch(getAllFormData(user_id));
  }, []);

  useEffect(() => {
    const arr =
      formData?.length > 0 &&
      formData?.map((item, index) => ({
        index: index + 1,
        id: item.id,
        title: item.title,
        description: item.description,
        status:item.status
      }));
    setData(arr);
  }, [formData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setCurrentRow(initialValues);
    setOpen(true);
  };

  const onDelete = (row) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteFormData(row.id,user_id));
  };

  const handleDeleteClick = (row) => (event) => {
    event.stopPropagation();
    setConfirmDialog({
      isOpen: true,
      title: "Are you sure to delete this record?",
      onConfirm: () => {
        onDelete(row);
      },
    });
  };

  const handleEditClick = (row) => (event) => {
    event.stopPropagation();
    setCurrentRow({
      title: row.title ? row.title : initialValues.title,
      id: row.id,
      description: row.description ? row.description : initialValues.description,
      status: row.status
        ? row.status
        : initialValues.status,
    });
    setOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchVal(e.target.value.trimStart());
  };

  const column = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "super-app-theme--header",
      width: 300,
    },

    {
      field: "description",
      headerName: "Description",
      headerClassName: "super-app-theme--header",
      width: 380,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: ({ row }) => (
        <>
          <strong strong>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Edit" placement="top" arrow>
              <span className="table-cell-trucate">
                {" "}
                <Iconify
                  icon="akar-icons:edit"
                  onClick={handleEditClick(row)}
                />
              </span>
            </Tooltip>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Delete" placement="top" arrow>
              <span className="table-cell-trucate">
                {" "}
                <Iconify
                  icon="ant-design:delete-outlined"
                  onClick={handleDeleteClick(row)}
                />
              </span>
            </Tooltip>
          </strong>
        </>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <div className="page-row">
          <div className="titlebox">
            <h2>Task List</h2>
            <div className="top-search">
              <form>
               <select name="status" onChange={handleSearch}>
               {TaskStatus.map((task)=> <option value={task.title}>{task.title}</option>)}
              </select>
              </form>
            </div>
          </div>
          <div className="custom-btn-grp">
            <Tooltip title="Create Task">
              <a onClick={handleClickOpen} className="add-btn">
                Create Task
              </a>
            </Tooltip>
          </div>
        </div>
        <div className="main-table">
          <Table columns={column} rows={filteredData} />
        </div>
        {open && (
          <FormBuilderForm handleClose={handleClose} currentRow={currentRow} />
        )}
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Layout>
    </>
  );
};

export default FormBuilder;
