import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MetaDataResponseType } from '~/types/metaDataResponseType';

interface ImageSideBarState {
    sideBar: boolean;
    selectedMetadata?: MetaDataResponseType;
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
            action: PayloadAction<MetaDataResponseType>
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
