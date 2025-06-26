import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ImageTypeRespose } from '~/types/images/imageType';

interface ImageSideBarState {
    sideBar: boolean;
    selectedMetadata?: ImageTypeRespose;
}

const initialState: ImageSideBarState = {
    sideBar: false,
    selectedMetadata: undefined,
};

const imageSideBarSlice = createSlice({
    name: 'imageSideBar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sideBar = !state.sideBar;
        },
        openSidebar: (state) => {
            state.sideBar = true;
        },
        closeSidebar: (state) => {
            state.sideBar = false;
        },
        setSelectedMetadata: (
            state,
            action: PayloadAction<ImageTypeRespose>
        ) => {
            state.selectedMetadata = action.payload;
        },
        clearSelectedMetadata: (state) => {
            state.selectedMetadata = undefined;
        },
    },
});

export const {
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setSelectedMetadata,
    clearSelectedMetadata,
} = imageSideBarSlice.actions;
export default imageSideBarSlice.reducer;
