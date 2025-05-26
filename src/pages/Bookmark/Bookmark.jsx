import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { apiClient } from "../../api";
import Card from "../../components/ui/Card/Card";
import SkeletonCard from "../../components/ui/Card/components/SkeletonCard/SkeletonCard";
import emptyBasketImg from "../../assets/images/empty-basket.png";
import "./BookMark.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function BookMark() {
    useEffect(() => {
        document.title = "Bookmark | Intertainment | Jonyigit-Web";
    }, []);
    const { searchQuery } = useOutletContext();

    const { data, isPending } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => {
            return apiClient.get("api/movies");
        },
    });

    const filtered = (data?.data || []).filter((item) => item.isBookmarked);

    const movies = filtered
        .filter((item) => item.category === "Movie")
        .filter((item) => item.title.toLowerCase().includes(searchQuery?.toLowerCase() || ""));

    const series = filtered
        .filter((item) => item.category === "TV Series")
        .filter((item) => item.title.toLowerCase().includes(searchQuery?.toLowerCase() || ""));

    const renderSkeletons = () => {
        return Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bookmark">
                <div className="moviesbook">
                    <div className="title">
                        <h1>Bookmarked Movies</h1>
                    </div>
                    <div className="cards">
                        {isPending ? (
                            renderSkeletons()
                        ) : movies.length > 0 ? (
                            movies.map((item) => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    category={item.category}
                                    rating={item.rating}
                                    year={item.year}
                                    img={item.thumbnail.regular.large}
                                    isBookmarked={item.isBookmarked}
                                    id={item._id}
                                />
                            ))
                        ) : (
                            <div className="card-empty">
                                <img src={emptyBasketImg} alt="no foto" />
                                <h1>Movies Bookmark Empty...(</h1>
                            </div>
                        )}
                    </div>
                </div>

                <div className="seriesbook">
                    <div className="title">
                        <h1>Bookmarked TV Series</h1>
                    </div>
                    <div className="cards">
                        {isPending ? (
                            renderSkeletons()
                        ) : series.length > 0 ? (
                            series.map((item) => (
                                <Card
                                    key={item.id}
                                    title={item.title}
                                    category={item.category}
                                    rating={item.rating}
                                    year={item.year}
                                    img={item.thumbnail.regular.large}
                                    isBookmarked={item.isBookmarked}
                                    id={item._id}
                                />
                            ))
                        ) : (
                            <div className="card-empty">
                                <img src={emptyBasketImg} alt="no foto" />
                                <h1>TV Series Bookmark Empty...(</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookMark;
