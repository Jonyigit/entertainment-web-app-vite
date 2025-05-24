import "./Slider.scss";
import SliderCard from "../../ui/SliderCard/SliderCard";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import SkeletonSliderCard from "../../ui/SliderCard/components/SkeletonSliderCard/SkeletonSliderCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";

export default function Slider() {
    const { data, isPending } = useQuery({
        queryKey: ["trendingCinema"],
        queryFn: () => apiClient.get("api/movies"),
    });

    const trendingCinema = data?.data?.filter((item) => item.isTrending) || [];

    return (
        <div className="slider-container">
            <h1>Trending</h1>
            {isPending ? (
                <div className="carrousel">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <SkeletonSliderCard key={i} />
                    ))}
                </div>
            ) : (
                <Swiper modules={[Mousewheel, Keyboard]} slidesPerView="auto" spaceBetween={24} mousewheel keyboard>
                    {trendingCinema.map((item) => {
                        let { id, title, category, rating, year, thumbnail, isBookmarked } = item;
                        return (
                            <SwiperSlide key={id}>
                                <SliderCard
                                    title={title}
                                    category={category}
                                    rating={rating}
                                    year={year}
                                    img={thumbnail.regular.large}
                                    isBookmarked={isBookmarked}
                                    id={id}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
}
