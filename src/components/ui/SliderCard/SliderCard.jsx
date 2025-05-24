import { motion } from "framer-motion";
import "./SliderCard.scss";
import Save from "../Save/Save";
import playIcon from "../../../assets/icon/play.svg";

export default function SliderCard({ title, category, img, rating, year, isBookmarked, id }) {
    return (
        <motion.div
            className="card"
            style={{ backgroundImage: `url(${img})` }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(0,0,0,0.3)",
            }}
        >
            <div className="bg">
                <div className="play-box">
                    <img src={playIcon} alt="no foto" />
                    <span>Play</span>
                </div>
            </div>

            <Save isBookmarked={isBookmarked} movieId={id} />

            <div className="movie-info">
                <div className="movie-content">
                    <p className="year">{year}</p>
                    <ul>
                        <li>
                            {category === "Movie" ? <MovieIcon /> : <TVIcon />}
                            {category}
                        </li>
                        <li>{rating}</li>
                    </ul>
                </div>
                <h2 className="cinema-name">{title}</h2>
            </div>
        </motion.div>
    );
}

function MovieIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                opacity="0.75"
                d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6Z"
                fill="white"
            />
        </svg>
    );
}

function TVIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                opacity="0.75"
                d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z"
                fill="white"
            />
        </svg>
    );
}
