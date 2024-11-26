import React from 'react';
import StaffDashboardSidebar from "../components/staff_dashboard_sidebar";
import StudentPendingRequests from '../components/staff_dashboard_pending_requests';


function StaffDashboardPendingRequests(props) {
  return (
    <div className="flex flex-col md:flex-row">
      <StaffDashboardSidebar
        data={props.data}
        changeRefreshState={props.changeRefreshState}
      />
      <StudentPendingRequests />
    </div>
  );
}

export default StaffDashboardPendingRequests;
