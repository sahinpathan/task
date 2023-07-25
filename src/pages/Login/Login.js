import { IconButton, InputAdornment, Stack } from "@mui/material/node";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { logIn } from "../../redux/Auth/Action";
import { useDispatch } from "react-redux";
import Iconify from "../../components/Iconify";
import { FormProvider, RHFTextField } from "../../hook-form";
import { useNavigate } from "react-router-dom/dist";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim("The Email should not include leading and trailing spaces")
    .strict(true)
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultValues = useMemo(() => ({
    email: "",
    password: "",
    rememberPassword: false,
  }));

  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
    };
    dispatch(logIn(loginData,navigate));
  };

  const handleSignUp = () =>{
    navigate("/");
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
              <h2>Login</h2>
              <p>Enter Your Details Below.</p>
            </div>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <RHFTextField name="email" label="Email address" />
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
                  defaultValue="Login"
                  loading={isSubmitting}
                />
                <input
                  type="button"
                  className="cmn-login"
                  defaultValue="Sign Up"
                  loading={isSubmitting}
                  onClick={handleSignUp}
                />
              </div>
            </FormProvider>
          </div>
        </div>
      </section>
    </>
  );
}
