import React from 'react';
import StaffDashboardSidebar from "../components/staff_dashboard_sidebar";
import StaffDashboardMain from "../components/staff_dashboard_main";

function StaffDashboardMainPage(props) {
  return (
    <div className="flex flex-col md:flex-row">
      <StaffDashboardSidebar
        data={props.data}
        changeRefreshState={props.changeRefreshState}
      />
      <StaffDashboardMain />
    </div>
  );
}

export default StaffDashboardMainPage;
