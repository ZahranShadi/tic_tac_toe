import React from "react";
import "../../styles/customPopupStyles.css";
import "../../styles/buttonsStyles.css";

type CustomPopupProps = {
    text: string;
    onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ text, onClose }) => {
    return (
        <div className="customPopupContainer">
            <div className="customPopup">
                <p>{text}</p>
                <button className="customButton" onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default CustomPopup;
