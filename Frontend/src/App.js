import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePageCenterContent from "./components/HomePageCenterContent";
import LoginCenterContent from "./components/LoginCenterContent";
import RegisterCenterContent from "./components/RegisterCenterContent";
import StaffDashboardMainPage from "./views/StaffDashboardMainPage";
import StaffDashboardHallBookingMainPage from "./views/StaffDashboardHallBookingMain";
import StaffDashboardPendingRequests from "./views/StaffDashboardPendingRequests";
import StaffDashboardHallAvailability from "./views/StaffDashboardHallAvailability";
import AdminDashboardMainPage from "./views/AdminDashboardMainPage";
import AdminDashboardPendingRequests from "./views/AdminDashboardPendingRequests";
import AdminDashboardHallAvailability from "./views/AdminDashboardHallAvailability";
import CalendarCom from "./components/calendar";
import HallDetailMain from "./components/staff_dashboard_hall_booking";
import Admin_Login from "./components/Admin_Login";


function App() {
  const [refresh, setRefresh] = useState(false);

  const changeRefreshState = () => {
    setRefresh(!refresh);
  };

  const isHeader = () => {
    const pathname = window.location.pathname;
    return (
      pathname === "/" ||
      pathname === "/calendar" ||
      pathname.startsWith("/hall_details") ||
      pathname.startsWith("/admin_login")
    );
  };

  useEffect(() => {
    isHeader();
  }, [refresh]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {isHeader() && <Header data={{ flag: true }} />} {/* Display header conditionally */}
        <Routes>
          <Route path="/" element={<HomePageCenterContent />} />
          <Route path="/admin_login" element={<Admin_Login />} />
          <Route path="/login" element={<LoginCenterContent />} />
          <Route path="/register" element={<RegisterCenterContent />} />
          <Route
            path="/Staff/dashboard"
            element={<StaffDashboardMainPage data={"dashboard"} changeRefreshState={changeRefreshState} />}
          />
          <Route
            path="/Staff/dashboard/hall_booking"
            element={<StaffDashboardHallBookingMainPage data={"hall_booking"} changeRefreshState={changeRefreshState} />}
          />
          <Route
            path="/Staff/dashboard/pending_requests"
            element={<StaffDashboardPendingRequests data={"pending_requests"} changeRefreshState={changeRefreshState} />}
          />
          <Route
            path="/Staff/dashboard/hall_availability"
            element={<StaffDashboardHallAvailability data={"hall_availability"} changeRefreshState={changeRefreshState} />}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardMainPage data={"dashboard"} changeRefreshState={changeRefreshState} />}
          />
          <Route
            path="/admin/dashboard/pending_requests"
            element={<AdminDashboardPendingRequests data={"pending_requests"} />}
          />
          <Route
            path="/admin/dashboard/hall_availability"
            element={<AdminDashboardHallAvailability data={"hall_availability"} />}
          />
          <Route path="/calendar" element={<CalendarCom />} />
          <Route path="/hall_details" element={<HallDetailMain />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
