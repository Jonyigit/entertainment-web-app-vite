import "./Slider.scss";
import SliderCard from "../../ui/SliderCard/SliderCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import SkeletonSliderCard from "../../ui/SliderCard/components/SkeletonSliderCard/SkeletonSliderCard";

export default function Slider() {
    const { data, isPending } = useQuery({
        queryKey: ["trendingCinema"],
        queryFn: () => {
            return apiClient.get("api/movies");
        },
    });

    const trendingCinema = data?.data?.filter((item) => item.isTrending) || [];

    return (
        <div className="slider-container">
            <h1>Trending</h1>
            <div className="carrousel">
                {isPending
                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonSliderCard key={i} />)
                    : trendingCinema.map((item) => {
                          let { id, title, category, rating, year, thumbnail, isBookmarked } = item;

                          return (
                              <SliderCard
                                  key={id}
                                  title={title}
                                  category={category}
                                  rating={rating}
                                  year={year}
                                  img={thumbnail.regular.large}
                                  isBookmarked={isBookmarked}
                                  id={id}
                              />
                          );
                      })}
            </div>
        </div>
    );
}
