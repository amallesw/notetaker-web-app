
import Sidebar from "../Sidebar/Sidebar";
import * as React from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Welcome from "../views/Welcome";
import NotesCreator from "../views/NoteCreator";


export default function NotesPage() {

    return (
        <>
            <Sidebar />
            
            <Switch>
                <Route path="/notespage/welcome" exact component={Welcome}/>
                <Route path="/notespage/:folderPos/:subPos/:notePos/:uuid" component={NotesCreator}/>
                <Redirect from="/notespage" to="/notespage/welcome"/>
            </Switch>

        </>
    );
};