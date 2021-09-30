import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes } from "../features/notesSlice";

export default function NotesCreator() {

    const dispatch = useDispatch();

    const { folderPos, subPos, notePos } = useParams();

    const { folders } = useSelector((state) => state.folders);

    let notepage = "";
    const folder_components = folders[folderPos].folder_components;

    if (notePos === "-1") {
        notepage = folder_components[subPos].elements;
    }

    else {
        notepage = folder_components[subPos].elements.subfolder_pages[notePos].elements;
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const [selectedTab, setSelectedTab] = useState("write");

    function handleChange(evt) {
        dispatch(updateNotes({ "content": evt, "notePos": notePos, "subPos": subPos, "folderPos": folderPos}))
    }


    return (
        <>
            <div className="relative md:ml-64 bg-gray-50 h-screen">
                <div className="mx-24 pt-8">
                    <h3 className="text-gray-900 font-extralight text-3xl">{notepage.notepage_name}</h3>

                    <div className=" mt-16">
                        <div className="h-full border">
                            <ReactMde
                                value={notepage.content}
                                className=" p-1 block w-full pl-1 py-1 border border-gray-100 text-gray-900 rounded hover:border-gray-300"
                                onChange={handleChange}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={markdown =>
                                    Promise.resolve(converter.makeHtml(markdown))
                                }
                                maxEditorHeight={1000}
                                minEditorHeight={700}
                                minPreviewHeight={700}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}