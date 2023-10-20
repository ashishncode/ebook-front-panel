import { configureStore } from "@reduxjs/toolkit";
import createnewbookReducer from "./createnewbookSlice";
import maincharacterReducer from "./maincharacterSlice";

const store = configureStore({
  reducer: {
    createnewbook: createnewbookReducer,
    createmaincharacter: maincharacterReducer,

    // You can add more reducers here if needed
  },
});

export default store;
