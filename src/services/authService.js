import API from "./api";

// /auth/me — current logged in user ka data laao
export const MyProfile = async () => {
  try {
    const response = await API.get("/auth/me");
    console.log("Profile data:", response.data);
    // Backend ka response structure dekh ke adjust karo:
    // response.data.user ya response.data — jo bhi backend return kare
    return response.data.user || response.data;
  } catch (error) {
    console.error("Profile fetch failed:", error.response?.data || error.message);
    throw error;
  }
};
