import axios from "axios";
const BASE_URL = "http://localhost:3001";

const save = async (data: any) => {
  return await axios.post(BASE_URL + "/property", data);
};

const uploadImage = async (data: any) => {
  const formData = new FormData();
  formData.append("file", data);
  return await axios.post(BASE_URL + "/file/upload", formData);
};

const updateImage = async (data: any) => {
  return await axios.patch(`${BASE_URL}/property/${data.id}`, {
    image: data.image,
  });
};

const getAll = async (query: string) => {
  return await axios.get(`${BASE_URL}/property?${query}`);
};

const deleteProperty = async (id: string) => {
  return await axios.delete(`${BASE_URL}/property/${id}`);
};

export { save, uploadImage, updateImage, getAll, deleteProperty };
