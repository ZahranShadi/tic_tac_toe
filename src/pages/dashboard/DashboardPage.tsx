import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GamesPage from "../games/GamesPage";
import UsersPage from "../users/UsersPage";
import DashboardNavigation from "../../components/dashboard/DashboardNavigation";
import PaginationNavigation from "../../components/generic/PaginationNavigation";
import ImageButton from "../../components/generic/ImageButton";
import CustomPopup from "../../components/generic/CustomPopup";
import Loader from "../../components/generic/Loader";
import { useAuthApi } from "../../hooks/useAuthApi";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { DashboardTab } from "../../types/types";
import logoutImage from "../../assets/logout.svg";
import "../../styles/dashboardStyles.css";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(DashboardTab.GAMES);
  const [totalResults, setTotalResults] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const { logoutUser } = useAuthApi();
  const navigate = useNavigate();
  const { loading, handleAsyncOperation, error, resetError } = useAsyncOperation();

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    setPageIndex(0);
    setTotalResults(0);
  };

  const handleLogout = async () => {
    await handleAsyncOperation(async () => {
      await logoutUser();
      navigate("/");
    }, "Logout failed.");
  };

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <CustomPopup text={error} onClose={resetError} />
      )}
      <header>
        <h1>Dashboard</h1>
        <div className="logoutButton">
          <ImageButton
            text="Logout"
            onClick={handleLogout}
            imageUrl={logoutImage}
            altText="Button Image"
            height={35}
            imgStyle="filterGrey"
          />
        </div>
      </header>
      <div className="dashboardContent">
        <DashboardNavigation activeTab={activeTab} handleTabChange={(tab: DashboardTab) => handleTabChange(tab)} />

        <div className="tabContent">
          {activeTab === DashboardTab.USERS && <UsersPage pageIndex={pageIndex} onDataLoaded={setTotalResults} />}
          {activeTab === DashboardTab.GAMES && <GamesPage pageIndex={pageIndex} onDataLoaded={setTotalResults} />}
          <PaginationNavigation pageIndex={pageIndex} totalResults={totalResults} onPageChange={setPageIndex} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;