// import style from "../../Card.module.scss";
import "./SkeletonCard.scss";

export default function SkeletonCard() {
    return (
        <div className={`skeleton-card`}>
            <div className={` skeleton-img`} />
            <div className={"movie-info"}>
                <div className={"movie-content"}>
                    <p className="skeleton-text short" />
                    <ul>
                        <li className="skeleton-text tiny" />
                        <li className="skeleton-text tiny" />
                    </ul>
                </div>
                <h2 className="skeleton-text long" />
            </div>
        </div>
    );
}
