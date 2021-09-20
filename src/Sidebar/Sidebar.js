import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function Sidebar() {

    const staticjson = {
        "folders": [
            {
                "folder_name": "folder 1",
                "notepages": []
            },
            {
                "folder_name": "folder 2",
                "notepages": [
                    {
                        "notepage_name": "Notes 1",
                        "content": "**Here, you can write your notes!"
                    },
                    {
                        "notepage_name": "Notes 2",
                        "content": "**Here, you can write your notes!"
                    },
                    {
                        "notepage_name": "Notes 3",
                        "content": "**Here, you can write your notes!"
                    }
                ]
            }
        ]
    };

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
                                <TreeItem nodeId={(1 + folder_index).toString()} label={folder.folder_name} >
                                    {folder.notepages.map((notepage, notepage_index) => {
                                        return (<TreeItem nodeId={(1 + folder_index + notepage_index + 1).toString()} label={notepage.notepage_name}/>);
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