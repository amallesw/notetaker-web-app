import { createSlice, nanoid } from "@reduxjs/toolkit";


let NODE_ID = 1;

export const notesSlice = createSlice({
    name: "folders",
    initialState: {
        folders: [],
    },
    reducers: {
        createFolder: (state, action) => {
            const id = NODE_ID;
            const folder_name = action.payload.folder_name;

            state.folders.push({ id: id, folder_name: folder_name, folder_components: [] });
            NODE_ID++;
        },

        createSubFolder: (state, action) => {
            const id = NODE_ID;
            const folderPos = action.payload.folderPos.value;

            state.folders[folderPos].folder_components.push(
                {
                    id: id,
                    is_notepage: false,
                    elements: {
                        subfolder_name: action.payload.subfolder_name,
                        subfolder_pages: []
                    }
                });
            NODE_ID++;
        },
        createPage: (state, action) => {
            const id = NODE_ID;
            const folderPos = action.payload.folderPos;
            const subfolderPos = action.payload.subfolderPos?.value;



            if (action.payload.subfolderPos) {
                state.folders[folderPos].folder_components[subfolderPos].elements.subfolder_pages.push(
                    {
                        id: id,
                        is_notepage: false,
                        uuid: nanoid(),
                        elements: {
                            notepage_name: action.payload.notepage_name,
                            content: "**Here, you can take notes!**"
                        }
                    }
                );
            }
            else {
                state.folders[folderPos].folder_components.push(
                    {
                        id: id,
                        is_notepage: true,
                        uuid: nanoid(),
                        elements: {
                            notepage_name: action.payload.notepage_name,
                            content: "**Here, you can take notes!**"
                        }
                    })
            }
            NODE_ID++;
        },
        createPageV2: (state, action) => {
            const id = NODE_ID;
            const folderPos = action.payload.folderPos;
            const subfolderPos = action.payload.subfolderPos.value;

            state.folders[folderPos].folder_components[subfolderPos].elements.subfolder_pages.push(
                {
                    id: id,
                    is_notepage: false,
                    elements: {
                        notepage_name: "nameeeeeeeeeee",
                        content: "**Here, you can take notes!**"
                    }
                }
            );
            NODE_ID++;
        }

    }
});

export const { createFolder, createSubFolder, createPage, createPageV2 } = notesSlice.actions;
export default notesSlice.reducer;