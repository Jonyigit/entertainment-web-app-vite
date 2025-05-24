import { useNavigate } from "react-router-dom";
import "./Save.scss";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Save({ isBookmarked, movieId }) {
    const [isActive, setActive] = useState(isBookmarked);
    const navigate = useNavigate();

    const AddBookMark = (data) => {
        return apiClient.post("/api/user/add_bookmark", {
            movieId: data,
        });
    };

    const removeBookMaker = (data) => {
        return apiClient.delete(`/api/user/remove_bookmark/${data}`);
    };

    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        if (isActive) {
            removeBookmark(movieId);
        } else {
            addBookmark(movieId);
        }
    };

    const { mutate: addBookmark } = useMutation({
        mutationFn: AddBookMark,
        onSuccess: () => {
            setActive(true);
            toast.success("Bookmark qo‘shildi!", {
                style: {
                    background: "#10141e",
                    color: "white",
                    border: "1px solid green",
                },
            });
        },
        onError: () => {
            toast.error("Bookmark qo‘shishda xatolik yuz berdi.", {
                style: {
                    background: "#10141e",
                    color: "white",
                    border: "1px solid red",
                },
            });
        },
    });

    const { mutate: removeBookmark } = useMutation({
        mutationFn: removeBookMaker,
        onSuccess: () => {
            setActive(false);
            toast.info("Bookmark olib tashlandi.", {
                style: {
                    background: "#10141e",
                    color: "white",
                    border: "1px solid blue",
                },
            });
        },
        onError: () => {
            toast.error("Bookmark olib tashlashda xatolik yuz berdi.", {
                style: {
                    background: "#10141e",
                    color: "white",
                    border: "1px solid red",
                },
            });
        },
    });

    return (
        <div className={isActive ? "save-active" : "save-cirlce"} onClick={handleClick}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.05762 0.75H10.6094C10.628 0.75 10.6454 0.751403 10.6621 0.754883L10.7109 0.771484L10.7217 0.775391L10.7314 0.779297C10.7986 0.80616 10.8383 0.840443 10.8701 0.886719C10.9028 0.934312 10.917 0.977751 10.917 1.03613V12.9639C10.917 13.0222 10.9028 13.0657 10.8701 13.1133C10.8383 13.1596 10.7986 13.1938 10.7314 13.2207L10.7236 13.2236L10.7158 13.2275C10.7109 13.2296 10.6807 13.2412 10.6094 13.2412C10.5318 13.2412 10.4733 13.225 10.418 13.1885L10.3633 13.1445L6.35742 9.23438L5.83301 8.72363L5.30957 9.23438L1.30273 13.1455C1.21581 13.2264 1.14401 13.2499 1.05762 13.25C1.02036 13.25 0.987856 13.2428 0.955078 13.2285L0.945312 13.2246L0.93457 13.2207L0.852539 13.1738L0.795898 13.1133C0.76325 13.0657 0.750034 13.0222 0.75 12.9639V1.03613C0.750017 1.00715 0.753389 0.981911 0.760742 0.958008L0.795898 0.886719C0.827746 0.840293 0.867275 0.806216 0.93457 0.779297L0.945312 0.775391L0.955078 0.771484C0.971542 0.764321 0.988101 0.758351 1.00488 0.754883L1.05762 0.75Z"
                    stroke="white"
                />
            </svg>
        </div>
    );
}
