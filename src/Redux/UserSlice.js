import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uname: "Abc",
  email: "",
  isLogged: false,
  Uid: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.uname = action.payload;
    },
    setMail: (state, action) => {
      state.name = action.payload;
    },
    setisLogged: (state, action) => {
      state.name = action.payload;
    },
    setUid: (state, action) => {
      state.name = action.payload;
    },
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    svalue: "",
    country: "",
  },
  reducers: {
    setValue: (state, action) => {
      state.svalue = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

// export const userEducation = createSlice({
//   name:"userEducation"
// })

export const { setName, setMail, setisLogged, setUid } = userSlice.actions;
export const { setValue, setCountry } = searchSlice.actions;
