import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	REGISTER,
	PURGE,
	PERSIST,
	PAUSE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { alertReducer } from "../reducers/alertSlice";
import { userReducer } from "../reducers/userSlice";
import { welcomeApi } from "../../api/welcomeQuery";
import { usersApi } from "../../api/users";
import { authReducer } from "../reducers/authSlice";
import { chatsApi } from "../../api/chats";
import { relationsApi } from "../../api/relations";
import { messageApi } from "../../api/message";
import { modalReducer } from "../reducers/modalSlice";

const rootReducer = combineReducers({
	alert: alertReducer,
	user: userReducer,
	auth: authReducer,
	modal: modalReducer,
	[welcomeApi.reducerPath]: welcomeApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[chatsApi.reducerPath]: chatsApi.reducer,
	[relationsApi.reducerPath]: relationsApi.reducer,
	[messageApi.reducerPath]: messageApi.reducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	//
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(welcomeApi.middleware)
			.concat(usersApi.middleware)
			.concat(chatsApi.middleware)
			.concat(relationsApi.middleware)
			.concat(messageApi.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
