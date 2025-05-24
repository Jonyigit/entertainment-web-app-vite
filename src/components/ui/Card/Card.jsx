import { motion } from "framer-motion";
import Save from "../Save/Save";
import playIcon from "../../../assets/icon/play.svg";
import styleCard from "./Card.module.scss";

function Card({ category, rating, title, year, img, isBookmarked, id }) {
    return (
        <motion.div
            className={styleCard.card}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
        >
            <Save isBookmarked={isBookmarked} movieId={id} />

            <div className={styleCard.picture}>
                <img src={img} alt="no foto" className={styleCard["cinema-img"]} />

                <div className={styleCard.bg}>
                    <div className={styleCard["play-box"]}>
                        <img src={playIcon} alt="play icon" />
                        <span>Play</span>
                    </div>
                </div>
            </div>

            <div className={styleCard["movie-info"]}>
                <div className={styleCard["movie-content"]}>
                    <p className={styleCard.year}>{year}</p>
                    <ul>
                        <li>
                            {category === "Movie" ? (
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.75"
                                        d="M10.1733 0H1.82667C0.817827 0 0 0.817827 0 1.82667V10.1733C0 11.1822 0.817827 12 1.82667 12H10.1733C10.6578 12 11.1224 11.8075 11.465 11.465C11.8075 11.1224 12 10.6578 12 10.1733V1.82667C12 1.3422 11.8075 0.877585 11.465 0.535018C11.1224 0.192452 10.6578 0 10.1733 0ZM2.4 5.4H1.2V4.2H2.4V5.4ZM2.4 6.6H1.2V7.8H2.4V6.6ZM10.8 5.4H9.6V4.2H10.8V5.4ZM10.8 6.6H9.6V7.8H10.8V6.6ZM10.8 1.644V2.4H9.6V1.2H10.356C10.4738 1.2 10.5867 1.24678 10.67 1.33004C10.7532 1.41331 10.8 1.52624 10.8 1.644ZM2.4 1.2H1.644C1.52624 1.2 1.41331 1.24678 1.33004 1.33004C1.24678 1.41331 1.2 1.52624 1.2 1.644V2.4H2.4V1.2ZM1.2 10.356V9.6H2.4V10.8H1.644C1.52624 10.8 1.41331 10.7532 1.33004 10.67C1.24678 10.5867 1.2 10.4738 1.2 10.356ZM10.356 10.8C10.6012 10.8 10.8 10.6012 10.8 10.356V9.6H9.6V10.8H10.356Z"
                                        fill="white"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.75"
                                        d="M5.448 2.68865H12V12H0V2.68865H2.952L1.332 0.72163L2.268 0.0174588L4.2 2.3453L6.132 0L7.068 0.72163L5.448 2.68865ZM1.2 3.85257V10.8361H7.2V3.85257H1.2ZM10.2 8.50824H9V7.34433H10.2V8.50824ZM9 6.18041H10.2V5.01649H9V6.18041Z"
                                        fill="white"
                                    />
                                </svg>
                            )}
                            {category}
                        </li>
                        <li>{rating}</li>
                    </ul>
                </div>
                <h2 className={styleCard["cinema-name"]}>{title}</h2>
            </div>
        </motion.div>
    );
}

export default Card;
