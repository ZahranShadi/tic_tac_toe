import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import PageLogo from "../../components/PageLogo";
import { useAuthApi } from "../../hooks/useAuthApi";
import "../../styles/authStyles.css";

const LoginPage: React.FC = () => {
  const { loginUser } = useAuthApi();

  return (
    <div className="authPage">
      <PageLogo />
      <div className="verticalSeparator" />
      <AuthForm
        title="Login"
        buttonText="Login"
        errorMessage="Login failed. Please check your username and password."
        onSubmit={loginUser}
        redirectLink="/register"
        redirectText="Don't have an account?"
      />
    </div>
  );
};

export default LoginPage;
