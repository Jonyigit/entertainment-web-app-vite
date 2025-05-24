import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import "./Movies.scss";
import { apiClient } from "../../api";
import SkeletonCard from "../../components/ui/Card/components/SkeletonCard/SkeletonCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Movies() {
    useEffect(() => {
        document.title = "Movies | Intertainment Web App | Jonyigit-Web";
    }, []);

    const { searchQuery } = useOutletContext();

    const { data, isPending } = useQuery({
        queryKey: ["moviesCategory"],
        queryFn: () => {
            return apiClient.get("api/movies");
        },
    });

    const movies = (data?.data || [])
        .filter((item) => item.category === "Movie")
        .filter((item) => item.title.toLowerCase().includes(searchQuery?.toLowerCase() || ""));

    return isPending ? (
        <div className="skeleton-cards">
            {Array.from({ length: 15 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    ) : (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="movies">
                <div className="title">
                    <h1 className={movies.length === 0 ? "none" : ""}>Movies</h1>
                </div>

                {movies.length === 0 ? (
                    <div className="noResults">No movies found</div>
                ) : (
                    <div className="movies-cards">
                        {movies.map((item) => (
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
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Movies;
