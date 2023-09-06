import { object, string } from "yup";

export const validationSchema = object().shape({
  title: string()
    .required("Title required")
    .max(40, "No more than 40 characters"),
  description: string().max(100, "No more than 100 characters"),
  priority: string().required()
});
