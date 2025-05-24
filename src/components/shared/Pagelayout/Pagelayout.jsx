import { Outlet } from "react-router-dom";
import { useState } from "react";
import Aside from "../Aside/Aside";
import Search from "../Search/Search";
import "./PageLayout.scss";

export default function Pagelayout() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="main">
            <Aside />
            <section className="pages-container">
                <Search onSearch={setSearchQuery} />
                <div className="container">
                    <Outlet context={{ searchQuery }} />
                </div>
            </section>
        </main>
    );
}
