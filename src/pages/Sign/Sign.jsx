import logo from "../../assets/icon/logo.svg";
import { useForm } from "react-hook-form";
import "./Sign.scss";
import Button from "../../components/ui/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../../api";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sign() {
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
            const response = await apiClient.post("/api/user/register", {
                full_name: data.fullName,
                email: data.email,
                password: data.password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }

            reset();
        } catch (err) {
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            className="sign-page"
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
                className="sign"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <h2 className="title">Sign Up</h2>
                <div className="inputs">
                    <label className="label">
                        <input
                            type="text"
                            placeholder="Full name"
                            className={`${errors.fullName ? "error" : ""}`}
                            {...register("fullName", {
                                required: "Can't be empty",
                                minLength: {
                                    value: 3,
                                    message: "At least 3 letters",
                                },
                            })}
                        />
                        {errors.fullName && <span className="errorMessage">{errors.fullName.message}</span>}
                    </label>
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
                    {loading ? "Creating..." : "Create an account"}
                </Button>
                <div className="sign-footer">
                    <span>Already have an account?</span>
                    <Link to="/login">Login</Link>
                </div>
            </motion.form>
        </motion.section>
    );
}
