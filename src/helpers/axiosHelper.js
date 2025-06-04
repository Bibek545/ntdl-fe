import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllTasks = () => {
  //   return axios.get(apiUrl + "/task");
  return apiProcessor({ method: "get", url: apiUrl + "/task" });
};

export const updateTask = (id, updatedTaskObj) => {
  //   return axios.patch(apiUrl + "/task/" + id, updatedTaskObj);

  return apiProcessor({
    method: "patch",
    url: apiUrl + "/task/" + id,
    data: updatedTaskObj,
  });
};

export const postTask = (taskObj) => {
  //   return axios.post(apiUrl + "/task", taskObj);

  return apiProcessor({
    method: "post",
    url: apiUrl + "/task",
    data: taskObj,
  });
};
