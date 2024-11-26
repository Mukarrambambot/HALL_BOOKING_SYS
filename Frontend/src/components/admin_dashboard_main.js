import React from 'react';
function AdminDashboardMain() {
    return (
        <div className="p-5 md:p-10 md:pl-16 pb-20 bg-neutral-100 w-full text-base">
            <div className="text-4xl font-bold mb-5">
                HALLS BOOKING
            </div>
            <div>
                <a className="text-sky-500 hover:underline hover:cursor-pointer" href="/admin/dashboard/pending_requests">
                    click here
                </a>
                to check the pending requests.
                <br></br>
                Following halls were assigned to you:
                <ol className="m-6 list-decimal">
                    <li>A-Block Conf. Hall (1st Floor)</li>
                    <li>B-Block OAT (G Floor)</li>
                    <li>B-Block Auditorium (G Floor)</li>
                    <li>C Block Fintan Hall (G Floor)</li>
                    <li>C Block Conference Hall</li>
                    <li>Delany Hall</li>
                    <li>BMS Hall</li>
                    <li>Student Cafeteria</li>
                    <li>Library Reference Hall</li>
                    <li>Board Room</li>
                    <li>Computer Lab</li>
                </ol>

                <div className="font-bold mb-5">Steps to reply to a request:</div>
                <ul className="ml-6 list-disc">
                    <li>Check the calendar for the availability of the halls on specific dates.</li>
                    <li>Review the form submitted and Click "Approve" or "Deny".</li>
                    <li>You will receive an email upon responding to the form.</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboardMain;
