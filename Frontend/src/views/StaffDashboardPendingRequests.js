import StaffDashboardSidebar from "../components/staff_dashboard_sidebar";

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
