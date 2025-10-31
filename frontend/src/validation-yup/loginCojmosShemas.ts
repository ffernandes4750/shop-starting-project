import * as yup from "yup";

export const loginCojmosSchema = yup.object({
  username: yup.string().trim().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
});
