import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../generic/Loader";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import "../../styles/buttonsStyles.css";
import "../../styles/authStyles.css";

type AuthFormProps = {
    title: string;
    buttonText: string;
    errorMessage: string;
    onSubmit: (username: string, password: string) => Promise<void>;
    redirectLink: string;
    redirectText: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
    title,
    buttonText,
    errorMessage,
    onSubmit,
    redirectLink,
    redirectText,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { loading, error, handleAsyncOperation } = useAsyncOperation();
    const navigate = useNavigate();

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await handleAsyncOperation(
            async () => {
                await onSubmit(username, password);
                navigate(redirectLink);
            },
            errorMessage
        );
    };

    return (
        <div>
            {loading && <Loader />}
            {error && <div className="authErrorMessage">{error}</div>}
            <form className="authContainer" onSubmit={handleFormSubmit}>
                <h1>{title}</h1>
                <div className="authInput">
                    <label>Username:</label>
                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="authInput">
                    <label>Password:</label>
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="customButton" type="submit">
                    {buttonText}
                </button>
                <p>
                    {redirectText} <Link className="redirectLink" to={redirectLink}>
                        {redirectLink}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AuthForm;