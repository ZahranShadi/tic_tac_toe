import React from "react";
import { DashboardTab } from "../../types/types";
import "../../styles/dashboardStyles.css";

const DashboardNavigation: React.FC<{
    activeTab: string;
    handleTabChange: (tab: DashboardTab) => void;
}> = ({ activeTab, handleTabChange }) => {
    return (
        <div className="tabs">
            {Object.values(DashboardTab).map((tab, i) => (
                <React.Fragment key={tab}>
                    <input
                        type="radio"
                        id={`tab${i}`}
                        name="tab"
                        checked={activeTab === tab}
                        onChange={() => handleTabChange(tab)}
                    />
                    <label className="tabLabel" htmlFor={`tab${i}`}>
                        {tab}
                    </label>
                </React.Fragment>
            ))}
            <div className="marker">
                <div id="top"></div>
                <div id="bottom"></div>
            </div>
        </div>
    );
};

export default DashboardNavigation;
