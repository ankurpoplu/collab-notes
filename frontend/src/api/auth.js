import api from "./axios";

export const signup = async (formData) => {
    console.log(formData);
  const res = await api.post("/auth/signup", formData);
  console.log(res.data);
  return res.data;
};

export const login = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};
