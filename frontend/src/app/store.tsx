import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/category/categorySlice";
import commentReducer from "./features/comment/commentSlice";
import commentLikeReducer from "./features/commentLike/commentLikeSlice";
import ratingReducer from "./features/rating/ratingSlice";
import userReducer from "./features/user/userSlice";
import contentReducer from "./features/content/contentSlice";
import tagReducer from "./features/tag/tagSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    comment: commentReducer,
    commentLike: commentLikeReducer,
    rating: ratingReducer,
    user: userReducer,
    content: contentReducer,
    tag: tagReducer,
  },
});

export default store;
// RootState türünü buradan export edin
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
