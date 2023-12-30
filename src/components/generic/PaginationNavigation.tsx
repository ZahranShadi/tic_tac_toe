import React from "react";
import ImageButton from "./ImageButton";
import { RESULTS_PER_PAGE } from "../../utils/common";
import backButton from "../../assets/chevron-left.svg";
import nextButton from "../../assets/chevron-right.svg";
import "../../styles/paginationNavigationStyles.css";

type PaginationNavigationProps = {
    pageIndex: number;
    totalResults: number;
    onPageChange: (newPageIndex: number) => void;
}

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({ pageIndex, totalResults, onPageChange }) => {
    const handlePrevPage = () => {
        onPageChange(pageIndex - 1);
    };

    const handleNextPage = () => {
        onPageChange(pageIndex + 1);
    };

    const startIndex = pageIndex * RESULTS_PER_PAGE + 1;
    const endIndex = Math.min((pageIndex + 1) * RESULTS_PER_PAGE, totalResults);

    const getButtonStyle = (disabled: boolean): string => {
        return disabled ? "navigationButtonDisabled" : "navigationButton";
    }

    return (
        <div className="paginationContainer">
            <ImageButton imgStyle={getButtonStyle(pageIndex === 0)} onClick={handlePrevPage} imageUrl={backButton} altText="Previous Page" height={35} disabled={pageIndex === 0} />
            <span>{`${startIndex}-${endIndex} of ${totalResults}`}</span>
            <ImageButton imgStyle={getButtonStyle(endIndex === totalResults)} onClick={handleNextPage} imageUrl={nextButton} altText="Previous Page" height={35} disabled={endIndex === totalResults} />
        </div >
    );
};

export default PaginationNavigation;
