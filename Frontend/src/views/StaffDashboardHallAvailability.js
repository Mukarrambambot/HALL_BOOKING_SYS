import React from 'react';
import CalendarCom from "../components/calendar";
import StaffDashboardSidebar from "../components/staff_dashboard_sidebar";

function StaffDashboardHallAvailability(props) {
  return (
    <div className="flex flex-col md:flex-row">
      <StaffDashboardSidebar
        data={props.data}
        changeRefreshState={props.changeRefreshState}
      />
      <CalendarCom />
    </div>
  );
}

export default StaffDashboardHallAvailability;
