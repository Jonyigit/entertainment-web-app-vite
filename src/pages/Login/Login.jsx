import Button from "../../components/ui/Button/Button";
import logo from "../../assets/icon/logo.svg";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../api/index";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await apiClient.post("/api/user/login", {
                email: data.email,
                password: data.password,
            });

            const token = response.data.token;
            localStorage.setItem("token", token);

            reset();
            navigate("/trending", { replace: true });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    toast.error("Email yoki parol noto'g'ri!", {
                        style: {
                            background: "#10141e",
                            color: "white",
                            border: "1px solid red",
                        },
                    });
                } else {
                    toast.error("Tizimda xatolik. Iltimos, qayta urinib ko'ring.", {
                        style: {
                            background: "#10141e",
                            color: "white",
                            border: "1px solid red",
                        },
                    });
                }
            } else {
                toast.error("Kutilmagan xatolik yuz berdi.", {
                    style: {
                        background: "#10141e",
                        color: "white",
                        border: "1px solid red",
                    },
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <motion.section
                className="login-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.img
                    src={logo}
                    alt="logo"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.form
                    className="login"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="title">Login</h2>
                    <div className="inputs">
                        <label className="label">
                            <input
                                type="email"
                                placeholder="Email address"
                                className={`${errors.email ? "error" : ""}`}
                                {...register("email", {
                                    required: "Can't be empty",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <span className="errorMessage">{errors.email.message}</span>}
                        </label>
                        <label className="label">
                            <input
                                type="password"
                                placeholder="Password"
                                className={`${errors.password ? "error" : ""}`}
                                {...register("password", {
                                    required: "Can't be empty",
                                    minLength: {
                                        value: 6,
                                        message: "At least 6 letters",
                                    },
                                })}
                            />
                            {errors.password && <span className="errorMessage">{errors.password.message}</span>}
                        </label>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Logging..." : "Login to your account"}
                    </Button>
                    <div className="login-footer">
                        <span>Don’t have an account?</span>
                        <Link to={"/sign"}>Sign Up</Link>
                    </div>
                </motion.form>
            </motion.section>
        </>
    );
}
