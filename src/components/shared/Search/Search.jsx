import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import searchIcon from "../../../assets/icon/search.svg";
import "./Search.scss";

function Search({ onSearch }) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch?.(inputValue.toLowerCase());
        }, 300);

        return () => clearTimeout(handler);
    }, [inputValue, onSearch]);

    return (
        <motion.div
            className="search"
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.img
                src={searchIcon}
                alt="Search icon"
                className="search-icon"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
            <input
                type="text"
                placeholder="Search for movies or TV series"
                className="search-input"
                aria-label="Search for movies or TV series"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </motion.div>
    );
}

export default Search;
