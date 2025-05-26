import Card from "../../ui/Card/Card";
import { useQuery } from "@tanstack/react-query";
import "./Tcinema.scss";
import { apiClient } from "../../../api";
import SkeletonCard from "../../ui/Card/components/SkeletonCard/SkeletonCard";
import { useEffect } from "react";

function Cinema({ searchQuery }) {
    useEffect(() => {
        document.title = "Home | Intertainment | Jonyigit-Web";
    }, []);

    const { data, isPending } = useQuery({
        queryKey: ["movies", searchQuery],
        queryFn: () => {
            return apiClient.get("api/movies");
        },
    });

    const filteredMovies = data?.data.filter((movie) => {
        if (!searchQuery) return true;
        return movie.title.toLowerCase().includes(searchQuery) || movie.category.toLowerCase().includes(searchQuery);
    });

    return isPending ? (
        <div className="skeleton-cards">
            {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    ) : (
        <div className="cinema">
            <h1 className={filteredMovies?.length === 0 ? "none" : ""}>
                {searchQuery ? `Results for "${searchQuery}"` : "Recommended for you"}
            </h1>
            {filteredMovies?.length === 0 ? (
                <div className="noResults">No results found for "{searchQuery}"</div>
            ) : (
                <div className="cards">
                    {filteredMovies?.map((item) => (
                        <Card
                            key={item.id}
                            category={item.category}
                            rating={item.rating}
                            title={item.title}
                            year={item.year}
                            img={item.thumbnail.regular.large}
                            isBookmarked={item.isBookmarked}
                            isTrending={item.isTrending}
                            id={item._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cinema;
