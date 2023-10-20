// createnewbookSlice.js (Separate file for your slice)
import { createSlice } from "@reduxjs/toolkit";

const maincharacterSlice = createSlice({
  name: "createmaincharacter",
  initialState: {
    formDatacharacter: {
      characterName: "",
      Role: "",
      Description: "",
    },
  },
  reducers: {
    updatMainCharacterField: (state, action) => {
      const { field, value } = action.payload;
      // state[field] = value;
      state.formDatacharacter = {
        ...state.formDatacharacter,
        [field]: value,
      };
    },
  },
});

export const { updatMainCharacterField } = maincharacterSlice.actions;
export const selectMainCharacterData = (state) => state.createmaincharacter;
export default maincharacterSlice.reducer;
