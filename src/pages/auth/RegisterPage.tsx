import React from "react";
import AuthForm from "../../components/auth/AuthForm";
import PageLogo from "../../components/PageLogo";
import { useAuthApi } from "../../hooks/useAuthApi";
import "../../styles/authStyles.css";

const RegisterPage: React.FC = () => {
  const { registerUser } = useAuthApi();

  return (
    <div className="authPage">
      <PageLogo />
      <div className="verticalSeparator" />
      <AuthForm
        title="Register"
        buttonText="Register"
        errorMessage="Registration failed. Please choose a different username."
        onSubmit={registerUser}
        redirectLink="/login"
        redirectText="Already have an account?"
      />
    </div>
  );
};

export default RegisterPage;
