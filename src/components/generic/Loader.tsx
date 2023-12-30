import React from "react";
import "../styles/loaderStyles.css";

const Loader: React.FC = () => {
    return (
        <div className="loaderOverlay">
            <div className="loader" />
        </div>
    );
};

export default Loader;