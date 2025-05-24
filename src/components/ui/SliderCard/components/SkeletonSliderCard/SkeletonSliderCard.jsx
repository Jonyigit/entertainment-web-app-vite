import "./SkeletonSliderCard.scss";

export default function SkeletonSliderCard() {
    return (
        <div className=" skeleton-slider-card">
            <div className="skeleton-bg" />
            <div className="skelton-movie-info">
                <div className="movie-content">
                    <ul>
                        <li className="skeleton-text tiny" />
                        <li className="skeleton-text tiny" />
                        <li className="skeleton-text tiny" />
                    </ul>
                </div>
                <h2 className="skeleton-text long" />
            </div>
        </div>
    );
}
