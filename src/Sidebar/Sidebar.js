import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function Sidebar() {

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

    const nodeId_counter = 1;

    return (
        <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
            <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center w-full mx-auto ">
                <h1 className="font-light text-2xl text-gray-900">NoteTaker</h1>

                <button className="mt-12 border-gray-900 border rounded-lg w-2/3 p-1 text-gray-900 hover:bg-gray-900 hover:text-white">Create New Page</button>

                <div className="mt-4 border-t border-gray-700">
                    <div className="mt-8 text-gray-500">

                        <TreeView
                            // nodeId="0"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            defaultExpanded={['1']}
                        >
                            {staticjson.folders.map((folder, folder_index) => {
                                return (
                                <TreeItem nodeId={(folder.id).toString()} label={folder.folder_name} className="text-gray-900">

                                    {folder.folder_components.map((component, component_index) => {
                                        if (component.is_notepage) {
                                            return (
                                            <TreeItem nodeId={(component.id).toString()} label={component.elements.notepage_name} className="text-gray-400"/>
                                            );
                                        }
                                        else {
                                            return (
                                            <TreeItem nodeId={(component.id).toString()} label={component.elements.subfolder_name} className="text-gray-900">
                                                {component.elements.subfolder_pages.map((notepage, notepage_index) => {
                                                    return (<TreeItem nodeId={(notepage.id).toString()} label={notepage.elements.notepage_name} className="text-gray-400"/>);
                                                })}
                                            </TreeItem>
                                            );
                                        }
                                        
                                    })}

                                </TreeItem>
                                );
                            })}
                        </TreeView>
                    </div>
                </div>
            </div>
        </nav>
    );
}