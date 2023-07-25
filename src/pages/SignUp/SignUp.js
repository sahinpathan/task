import { IconButton, InputAdornment, Stack } from "@mui/material/node";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import Iconify from "../../components/Iconify";
import { FormProvider, RHFTextField } from "../../hook-form";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { signUpAction } from "../../redux/Auth/Action";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .trim("The Email should not include leading and trailing spaces")
    .strict(true)
    .email("Email must be a valid email address")
    .required("Email is required"),
  name:Yup.string().required("name is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = useMemo(() => ({
    email: "",
    password: "",
    name:"",
    rememberPassword: false,
  }));

  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
      name:data.name
    };
    dispatch(signUpAction(loginData,navigate));
  };
  const handleLogin = () =>{
    navigate("/login");
  }
  return (
    <>
      <section className="loginFormMain">
        <div className="fullBgImg" />
        <div className="welcome">
          <span>L</span>ogo
        </div>
        <div className="ct-row">
          <div className="left-col">
            <div className="logo-img"></div>
          </div>
          <div className="form-main">
            <div className="title">
              <h2>signUp</h2>
              <p>Enter Your Details Below.</p>
            </div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <RHFTextField name="email" label="Email address" />
                <RHFTextField name="name" label="name" />
                <RHFTextField
                  autoComplete="off"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end">
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <br />
              <div className="form-group btn-row">
                <input
                  type="submit"
                  className="cmn-btn"
                  defaultValue="submit"
                  loading={isSubmitting}
                />
                 <input
                  type="button"
                  className="cmn-login"
                  defaultValue="Login"
                  loading={isSubmitting}
                  onClick={handleLogin}
                />
              </div>
            </FormProvider>
          </div>
        </div>
      </section>
    </>
  );
}
