
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Switch, Route, Redirect } from "react-router-dom";


export default function NotesPage() {
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    const [selectedTab, setSelectedTab] = useState("preview");
    function welcomeText() {
        return `
**Welcome to NoteTaker!**

NoteTaker uses markdown in order to make writing notes easy, organized, and efficient.

Markdown allows features like:

**Bold Text**

*Italicized Text*

> Quoting

${"`and code`"}
        
        `
    };
    const [value, setValue] = useState(welcomeText())


    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-gray-50 h-screen">
                <div className="mx-24 pt-8">
                    <h3 className="text-gray-900 font-extralight text-3xl">Welcome to Notetaker!</h3>

                    <div className=" mt-16">
                        <div className="h-full border">
                            <ReactMde
                                value={value}
                                className=" p-1 block w-full pl-1 py-1 border border-gray-100 text-gray-900 rounded hover:border-gray-300"
                                onChange={setValue}
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
};