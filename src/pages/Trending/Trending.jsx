import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOutletContext } from "react-router-dom";
import Slider from "../../components/shared/Slider/Slider";
import Tcinema from "../../components/shared/Tcinema/Tcinema";
import "./Trending.scss";

export default function Trending() {
    const { searchQuery } = useOutletContext();

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            {searchQuery === "" && <Slider />}
            <Tcinema searchQuery={searchQuery} />
        </>
    );
}
