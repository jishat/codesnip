import React from "react";
import { Routes, Route } from "react-router-dom";
import AllSnippets from "./pages/AllSnippets";
import AddNew from "./pages/AddNew";
import EditSnippet from "./pages/EditSnippet";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AllSnippets />} />
      <Route path="/add-new" element={<AddNew />} />
      <Route path="/edit/:id" element={<EditSnippet />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
