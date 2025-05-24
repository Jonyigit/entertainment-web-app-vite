import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import Card from "../../components/ui/Card/Card";
import { apiClient } from "../../api";
import "./TvSeries.scss";
import SkeletonCard from "../../components/ui/Card/components/SkeletonCard/SkeletonCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function TvSeries() {
    useEffect(() => {
        document.title = "Tv Series | Intertainment Web App | Jonyigit-Web";
    }, []);
    const { searchQuery } = useOutletContext();

    const { data, isPending } = useQuery({
        queryKey: ["seriesCategory"],
        queryFn: () => {
            return apiClient.get("api/movies");
        },
    });

    const series = (data?.data || [])
        .filter((item) => item.category === "TV Series")
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
            <div className="tvseries">
                <div className="title">
                    <h1 className={series.length === 0 ? "none" : ""}>TV Series</h1>
                </div>

                {series.length === 0 ? (
                    <div className="noResults">No TV series found</div>
                ) : (
                    <div className="tvseries-cards">
                        {series.map((item) => (
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

export default TvSeries;
