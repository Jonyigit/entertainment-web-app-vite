import Sign from "../pages/Sign/Sign/";
import Login from "../pages/Login/Login";
import Movies from "../pages/Movies/Movies";
import { Route, Routes } from "react-router-dom";
import TvSeries from "../pages/TvSeries/TvSeries";
import Trending from "../pages/Trending/Trending";
import Bookmark from "../pages/Bookmark/Bookmark";
import Pagelayout from "../components/shared/PageLayout/Pagelayout";

export default function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/" element={<Pagelayout />}>
                <Route index element={<Trending />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tvseries" element={<TvSeries />} />
                <Route path="/bookmark" element={<Bookmark />} />
            </Route>
        </Routes>
    );
}
