import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateFolderModal from '../Modals/CreateFolderModal';
import { useState } from 'react';
import AddNewItem from '../Modals/AddNewSubfolder';
import AddNewPage from '../Modals/AddNewPage';

export default function Sidebar() {

    const [showModal, setShowModal] = useState(false);
    const [showModalAddSubfolder, setShowModalAddfolder] = useState(false);
    const [showModalAddNotepage, setShowModalAddNotepage] = useState(false);
    const { folders } = useSelector((state) => state.folders);


    const staticjson = {
        "folders": [
            {
                "id": 1,
                "folder_name": "folder 1",
                "folder_components": []
            },
            {
                "id": 2,
                "folder_name": "folder 2",
                "folder_components": [
                    {
                        "id": 3,
                        "is_notepage": true,
                        "elements": {
                            "notepage_name": "Notes 1",
                            "content": "**Here, you can write your notes!"
                        }
                    },
                    {
                        "id": 4,
                        "is_notepage": false,
                        "elements": {
                            "subfolder_name": "subfolder 1",
                            "subfolder_pages": [
                                {
                                    "id": 5,
                                    "is_notepage": true,
                                    "elements": {
                                        "notepage_name": "Notes 2",
                                        "content": "**Here, you can write your notes!"
                                    }
                                },
                                {
                                    "id": 6,
                                    "is_notepage": true,
                                    "elements": {
                                        "notepage_name": "Notes 7",
                                        "content": "**Here, you can write your notes!"
                                    }
                                }
                            ]
                        }
                    },
                    {
                        "id": 7,
                        "is_notepage": true,
                        "elements": {
                            "notepage_name": "Notes 4",
                            "content": "**Here, you can write your notes!"
                        }
                    },
                    {
                        "id": 8,
                        "is_notepage": true,
                        "elements": {
                            "notepage_name": "Notes 5",
                            "content": "**Here, you can write your notes!"
                        }
                    }
                ]
            }
        ]
    };

    function openModal() {
        setShowModal(true);
    }

    function openModalAddSubfolder() {
        setShowModalAddfolder(true);
    }

    function openModalAddNotepage() {
        setShowModalAddNotepage(true);
    }

    return (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center w-full mx-auto ">
                <h1 className="font-light text-2xl text-gray-900">NoteTaker</h1>

                <button
                    className="mt-12 border-gray-900 border rounded-lg w-3/4 p-1 text-gray-900 hover:bg-gray-900 hover:text-white"
                    onClick={openModal}
                >
                    Create New Folder
                </button>
                <CreateFolderModal showModal={showModal} setShowModal={setShowModal} />

                <button
                    className="mt-3 hover:border-gray-900 border rounded-lg w-3/4 p-1 hover:text-gray-900 bg-gray-900 text-white hover:bg-white"
                    onClick={openModalAddSubfolder}
                >
                    Create Subfolder
                </button>
                <AddNewItem showModal={showModalAddSubfolder} setShowModal={setShowModalAddfolder} />

                <button
                    className="mt-3 border-gray-900 border rounded-lg w-3/4 p-1 text-gray-900 hover:bg-gray-900 hover:text-white"
                    onClick={openModalAddNotepage}
                >
                    Create Notepage
                </button>
                <AddNewPage showModal={showModalAddNotepage} setShowModal={setShowModalAddNotepage} />

                <div className="mt-4 border-t border-gray-700">
                    <div className="mt-8 text-gray-500">

                        <TreeView
                            // nodeId="0"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            defaultExpanded={['1']}
                        >

                            {
                                folders.map((folder, folder_index) => {
                                    return (

                                        <div className="flex justify-start items-start">
                                            <TreeItem nodeId={(folder.id).toString()} label={folder.folder_name} className="text-gray-900 w-full">
                                                {folder.folder_components.map((component, component_index) => {
                                                    if (component.is_notepage) {
                                                        return (
                                                            <Link to={"/notespage/" + folder_index + "/" + component_index + "/" + + -1 + "/" + component.uuid}>
                                                                <TreeItem nodeId={(component.id).toString()} label={component.elements.notepage_name} className="text-gray-400" />
                                                            </Link>

                                                        );
                                                    }
                                                    else {
                                                        return (
                                                            <TreeItem nodeId={(component.id).toString()} label={component.elements.subfolder_name} className="text-gray-900">
                                                                {component.elements.subfolder_pages.map((notepage, notepage_index) => {
                                                                    return (
                                                                        <Link to={"/notespage/" + folder_index + "/" + component_index + "/" + notepage_index + "/" + notepage.uuid}>
                                                                            <TreeItem nodeId={(notepage.id).toString()} label={notepage.elements.notepage_name} className="text-gray-400" />
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </TreeItem>
                                                        );
                                                    }
                                                })}
                                            </TreeItem>

                                            {/* <button
                                                onClick={openModalAdd}
                                            >
                                                +
                                            </button>
                                            <AddNewItem showModal={showModalAdd} setShowModal={setShowModalAdd} folderPos={}/> */}
                                        </div>
                                    );
                                })
                            }
                        </TreeView>
                    </div>
                </div>
            </div>
        </nav>
    );
}