import { createSlice } from "@reduxjs/toolkit";

let NODE_ID = 1;

export const notesSlice = createSlice({
    name: "folders",
    initialState: {
        folders: [],
    },
    reducers: {
        createFolder: (state, action) => {
            console.log(action.payload);
            const id = NODE_ID;
            const folder_name = action.payload.folder_name;

            state.folders.push({ id: id, folder_name: folder_name, folder_components: [] });
            NODE_ID++;
        },

        createSubFolder: (state, action) => {
            const id = NODE_ID;
            const folderPos = action.payload.folderPos;

            state.folders[folderPos].folder_components.push(
                {
                    id: id,
                    is_notepage: false,
                    elements: {
                        subfolder_name: "subfoldr 1",
                        subfolder_pages: []
                    }
                });
            NODE_ID++;
        },
        createPage: (state, action) => {
            const id = NODE_ID;
            const folderPos = action.payload.folderPos;

            state.folders[folderPos].folder_components.push(
                {
                    id: id,
                    is_notepage: true,
                    elements: {
                        notepage_name: "nameee",
                        content: "**Here, you can take notes!**"
                    }
                })
            NODE_ID++;
        }

    }
});

export const { createFolder, createSubFolder, createPage } = notesSlice.actions;
export default notesSlice.reducer;