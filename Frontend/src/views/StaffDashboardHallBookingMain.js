import React from 'react';
import StaffDashboardSidebar from "../components/staff_dashboard_sidebar";
import StaffDashboardHallBooking from "../components/staff_dashboard_hall_booking";

function StaffDashboardHallBookingMainPage(props) {
  return (
    <div className="flex flex-col md:flex-row">
      <StaffDashboardSidebar
        data={props.data}
        changeRefreshState={props.changeRefreshState}
      />
      <StaffDashboardHallBooking />
    </div>
  );
}

export default StaffDashboardHallBookingMainPage;
