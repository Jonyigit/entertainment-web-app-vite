import "./Button.scss";

const Button = ({ children, onClick, type = "button", isLoading }) => {
    return (
        <button type={type} onClick={onClick} className="submit-btn" disabled={isLoading}>
            {children}
        </button>
    );
};

export default Button;
