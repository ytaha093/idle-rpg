import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/AuthSlice'
import playerDataSlice from './slices/PlayerDataSlice'
import SkillDataSlice from './slices/SkillsDataSlice'
import inventorySlice from './slices/inventorySlice'
import UIDataSlice from './slices/UIDataSlice'
import equipmentSlice from './slices/EquipmentSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        playerData: playerDataSlice,
        skillData: SkillDataSlice,
        invData: inventorySlice,
        EquipmentData: equipmentSlice,
        uiData: UIDataSlice,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch