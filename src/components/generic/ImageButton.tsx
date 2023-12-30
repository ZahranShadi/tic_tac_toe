import React from "react";
import "../../styles/buttonsStyles.css";

type ImageButtonProps = {
    onClick: () => void;
    imageUrl: string;
    altText: string;
    height: number;
    text?: string;
    disabled?: boolean;
    imgStyle?: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ onClick, imageUrl, altText, text, height, disabled = false, imgStyle = "" }) => {
    return (
        <div style={{ textAlign: "left" }}>
            {text}
            <button onClick={onClick} disabled={disabled} className="imageButton">
                <img className={imgStyle} src={imageUrl} alt={altText} height={height} draggable="false" />
            </button>
        </div>
    );
};

export default ImageButton;
