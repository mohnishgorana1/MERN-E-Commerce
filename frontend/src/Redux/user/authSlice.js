import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: loadUserFromLocalStorage(), // it will be an object containing user's info
  isAuthenticated: !!loadUserFromLocalStorage(),
  token: null,
};

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const response = await axios.post("/api/v1/user/register", userData);
      if (response?.status === 200) {
        toast.success("User Registered Successfully");
      }
      console.log("register res: ", response);
      return response.data;
    } catch (error) {
      toast.error("API Error on Register!");
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (userData) => {
    try {
      const response = await axios.post("/api/v1/user/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
        toast.success("User LoggedIn Successfully");
        toast("User LoggedIn Successfully", { duration: "2000" });
      }
      console.log("login res: ", response.data);
      return response.data;
    } catch (error) {
      toast.error("Error Login");
      return;
    }
  }
);

export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  const response = await axios.get("/api/v1/user/logout");
  console.log("Logout Response", response);
  if (response?.data?.success === true) {
    toast.success(response?.data?.message);
  }
  return response.data;
});

export const getProfileAsync = createAsyncThunk("user/getProfile", async () => {
  const response = await axios.get("/api/v1/user/me");
  return response.data;
});

export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async (updatedData) => {
    const response = await axios.put("/api/v1/user/update", updatedData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.user = action.payload?.newUser;
      state.status = "succeeded";

      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // Reducer for loginUser
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.user = action.payload?.user;
      state.status = "succeeded";

      localStorage.setItem("user", JSON.stringify(state.user));
    });

    // Reducer for logoutUser
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.user = null;
      state.status = "succeeded";
      localStorage.clear();
    });

    // Reducer for getProfile
    builder.addCase(getProfileAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "succeeded";
    });

    // Reducer for updateProfile
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "succeeded";
    });
  },
});

export default userSlice.reducer;
