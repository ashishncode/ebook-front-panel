// createnewbookSlice.js (Separate file for your slice)
import { createSlice } from "@reduxjs/toolkit";
const email = localStorage.getItem("userEmail");

const createnewbookSlice = createSlice({
  name: "createnewbook",
  initialState: {
    formData: {
      bookTitle: "",
      genre: "",
      targetAudience: "",
      chapterIntroductions: false,
      chapterConclusions: false,
      characterName: "",
      Role: "",
      Description: "",
      timePeriod: "",
      location: "",
      additionalDetails: "",
      plotSummary: "",
      writingStyle: "",
      additionalInstruction: "",
      editingtools: "",
      chapters: [],
      createdBy: email,
    },
  },
  reducers: {
    updateCreateNewBookField: (state, action) => {
      const { field, value, index } = action.payload;
      // state[field] = value;
      // state.formData = {
      //     ...state.formData,
      //     [field]: value,
      // };

      if (Array.isArray(field) && field === state.formData.chapters) {
        const updatedChapters = [...state.formData.chapters];
        // Update the specific chapter at the given index
        updatedChapters[index] = { ...updatedChapters[index], ...value };
        // Update the chapters array in the state
        state.formData.chapters = updatedChapters;
      } else {
        state.formData[field] = value;
      }
    },
  },
});

export const { updateCreateNewBookField } = createnewbookSlice.actions;
export const selectCreateNewBookData = (state) => state.createnewbook;
export default createnewbookSlice.reducer;
