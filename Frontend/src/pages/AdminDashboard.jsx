
import React, { useState } from 'react';

// --- Icons (Lucide React) ---
import {
  Menu, LayoutDashboard, LineChart, Settings, User, ClipboardEdit, Map,
  AlertTriangle, Clock, CheckCircle, Users, Bell,
  ArrowLeft, Calendar, MapPin, FileText, Image, MessageSquare, PlusCircle
} from 'lucide-react';

import L from "leaflet";
const statusIcon = (status) =>
  new L.Icon({
    iconUrl:
      status === "Pending"
        ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        : status === "In Progress"
        ? "https://maps.google.com/mapfiles/ms/icons/orange-dot.png"
        : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
    iconSize: [32, 32],
  });

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


// --- Static Data (Updated with full details for all issues) ---
const reportedIssues = [
  {
    id: "A1",
    type: "Broken Street Light",
    location: "Main Street & 5th Ave",
    reporter: "John Doe",
    reporterEmail: "john.doe@gmail.com",
    date: "2025-12-01",
    timeElapsed: "2 days",
    priority: "High",
    status: "Pending",
    lat: 28.6139,
    lng: 77.2090,
    description: "Street light not working for weeks.",
  },
  {
    id: "B2",
    type: "Pothole",
    location: "Elm Street, Sector 7",
    reporter: "Jane Smith",
    reporterEmail: "jane.smith@mail.com",
    date: "2025-12-02",
    timeElapsed: "10 hours",
    priority: "Medium",
    status: "In Progress",
    lat: 28.7041,
    lng: 77.1025,
    description: "Large pothole causing traffic issues.",
  },
  {
    id: "C3",
    type: "Garbage Overflow",
    location: "Ring Road",
    reporter: "Amit Kumar",
    reporterEmail: "amit@gmail.com",
    date: "2025-12-03",
    timeElapsed: "1 day",
    priority: "High",
    status: "Pending",
    lat: 28.4595,
    lng: 77.0266,
    description: "Garbage bins overflowing.",
  },
  {
    id: "D4",
    type: "Water Leakage",
    location: "MG Road",
    reporter: "Neha Sharma",
    reporterEmail: "neha@gmail.com",
    date: "2025-12-04",
    timeElapsed: "5 hours",
    priority: "Medium",
    status: "In Progress",
    lat: 28.5355,
    lng: 77.3910,
    description: "Water pipe leakage on road.",
  },
  {
    id: "E5",
    type: "Graffiti",
    location: "North End",
    reporter: "Rahul Verma",
    reporterEmail: "rahul@gmail.com",
    date: "2025-12-05",
    timeElapsed: "3 weeks",
    priority: "Low",
    status: "Resolved",
    lat: 28.4089,
    lng: 77.3178,
    description: "Graffiti cleaned.",
  },
  {
    id: "F6",
    type: "Illegal Parking",
    location: "City Mall",
    reporter: "Sonia Gupta",
    reporterEmail: "sonia@gmail.com",
    date: "2025-12-06",
    timeElapsed: "6 hours",
    priority: "Low",
    status: "Resolved",
    lat: 28.6298,
    lng: 77.0689,
    description: "Vehicles parked illegally.",
  },
];


// --- Map Data (used for Dashboard Map View placeholders) ---


// --- Mock Data for Detail View ---
const mockActivityTimeline = [
  { time: '2025-12-01 09:30 AM', event: 'Complaint submitted by John Doe' },
  { time: '2025-12-01 10:15 AM', event: 'Complaint verified by system' },
  { time: '2025-12-01 02:30 PM', event: 'Reviewed by admin by Admin User' },
];

const mockComments = [
  { user: 'Admin User', comment: 'Issue has been verified. Forwarding to the electrical maintenance team.', date: '2025-12-01 02:35 PM' }
];


// --- Helper Functions (for color/priority) ---
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-500/10 text-red-700';
    case 'Medium':
      return 'bg-orange-500/10 text-orange-700';
    case 'Low':
      return 'bg-green-500/10 text-green-700';
    default:
      return 'bg-gray-500/10 text-gray-700';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-red-500';
    case 'In Progress':
      return 'bg-orange-500';
    case 'Resolved':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusPill = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-red-100 text-red-700';
    case 'In Progress':
      return 'bg-orange-100 text-orange-700';
    case 'Resolved':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Renders the Issue Detail View, as requested by the user's image mockup.
 * @param {Object} props - The component props.
 * @param {Object} props.issue - The data of the selected issue.
 * @param {Function} props.onBack - Function to switch back to the dashboard view.
 */
const IssueDetailView = ({ issue, onBack }) => {
  if (!issue) return <div className="p-6 text-gray-600">No issue selected.</div>;

  return (
    <main className="p-4 sm:p-6 space-y-6 flex-1">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Reported Issues
      </button>

      {/* Main Detail Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#B77A4D]">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xl font-bold text-gray-800">{issue.type}</span>
            {/* Priority pill uses helper function for dynamic color based on data */}
            <span className={`ml-4 px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(issue.priority)}`}>
              {issue.priority} Priority
            </span>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusPill(issue.status)}`}>
            {issue.status}
          </span>
        </div>
        
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-4 gap-x-6 text-sm text-gray-600 border-t pt-4 mt-4">
          {/* Location */}
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Location</p>
              <p>{issue.location}</p>
              <p className="text-xs italic">{issue.coords || 'Coordinates N/A'}</p>
            </div>
          </div>
          
          {/* Date Reported */}
          <div className="flex items-start space-x-2">
            <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Date Reported</p>
              <p>{issue.date}</p>
            </div>
          </div>
          
          {/* Reporter */}
          <div className="flex items-start space-x-2">
            <User className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Reporter</p>
              <p>{issue.reporter}</p>
              <p className="text-xs text-blue-500">{issue.reporterEmail || 'Email N/A'}</p>
            </div>
          </div>

          {/* Time Elapsed */}
          <div className="flex items-start space-x-2">
            <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-gray-800">Time Elapsed</p>
              <p>{issue.timeElapsed || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Grid: Description, Images, Comments (Left) & Timeline, Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Description, Images, Comments) - Span 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="flex items-center font-bold text-lg text-gray-700 mb-3"><FileText className="w-5 h-5 mr-2 text-[#B77A4D]" /> Description</h4>
            <p className="text-gray-700 leading-relaxed text-sm">{issue.description || 'No description provided for this issue.'}</p>
          </div>
          
          {/* Attached Images */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="flex items-center font-bold text-lg text-gray-700 mb-3"><Image className="w-5 h-5 mr-2 text-[#B77A4D]" /> Attached Images</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Image Placeholder 1</div>
              <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">Image Placeholder 2</div>
            </div>
          </div>

          {/* Comments & Notes */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="flex items-center font-bold text-lg text-gray-700 mb-4"><MessageSquare className="w-5 h-5 mr-2 text-[#B77A4D]" /> Comments & Notes</h4>
            
            {/* Existing Comments */}
            {mockComments.map((comment, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4 py-2 mb-4">
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">{comment.user}</span>
                  <span>{comment.date}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{comment.comment}</p>
              </div>
            ))}

            {/* Add Comment Form (Placeholder) */}
            <div className="mt-4 pt-4 border-t">
              <textarea 
                placeholder="Add a comment or note..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B77A4D] focus:border-transparent resize-none text-sm"
                rows="3"
              ></textarea>
              <button className="mt-2 bg-[#B77A4D] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#A36C40] transition shadow-md">
                Add Comment
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Activity Timeline, Location Map) - Span 1/3 */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Activity Timeline */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-bold text-lg text-gray-700 mb-4">Activity Timeline</h4>
            <div className="space-y-4">
              {mockActivityTimeline.map((item, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-[#B77A4D] rounded-full ring-4 ring-white"></div>
                  <p className="text-sm text-gray-700 font-medium">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Location Map */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="font-bold text-lg text-gray-700 mb-4">Location Map</h4>
            <div className="w-full h-48 bg-gray-200 rounded-lg relative flex items-center justify-center">
              <MapPin className="w-8 h-8 text-red-500" />
              <div className="absolute inset-0 opacity-10 bg-[size:20px_20px] bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.1)_20%)]"></div>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition shadow-md flex items-center justify-center">
              <Map className="w-4 h-4 mr-2" /> View Full Map
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};


/**
 * Renders the Main Dashboard View.
 * @param {Function} onIssueClick - Callback when an issue row is clicked.
 */
const DashboardView = ({
  onIssueClick,
  selectedIssue,
  setSelectedIssue,
  setView,
}) => (

  <main className="p-4 sm:p-6 space-y-6 flex-1">
    {/* Main Title */}
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800">CleanStreet Admin</h2>
      <p className="text-gray-500">Monitor and resolve civic issues in real-time</p>
    </div>

    {/* KPI Cards (Key Metrics) - Responsive Grid */}
    {/* KPI Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 grid-cols-4 xl:grid-cols-4 gap-6">

  {/* Pending */}
  <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
      <AlertTriangle className="w-6 h-6 text-red-500" />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase">Pending Issues</p>
      <p className="text-2xl font-bold text-gray-800">47</p>
      <p className="text-xs text-red-500">+12 today</p>
    </div>
  </div>

  {/* In Progress */}
  <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
      <Clock className="w-6 h-6 text-orange-500" />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase">In Progress</p>
      <p className="text-2xl font-bold text-gray-800">23</p>
      <p className="text-xs text-orange-500">+8 assigned</p>
    </div>
  </div>

  {/* Resolved */}
  <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
      <CheckCircle className="w-6 h-6 text-green-500" />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase">Resolved</p>
      <p className="text-2xl font-bold text-gray-800">156</p>
      <p className="text-xs text-green-500">+18 this week</p>
    </div>
  </div>

  {/* Active Citizens */}
  <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
      <Users className="w-6 h-6 text-blue-500" />
    </div>
    <div>
      <p className="text-xs text-gray-500 uppercase">Active Citizens</p>
      <p className="text-2xl font-bold text-gray-800">1234</p>
      <p className="text-xs text-blue-500">+45 this month</p>
    </div>
  </div>

</div>

  
    {/* Reports and Map Layout - Responsive Column/Row Switch */}
    <div className="grid grid-cols-12 gap-6">
      {/* Left Column: Reported Issues Table (Span 12 on mobile, 7 on desktop) */}
      <div className="col-span-7 bg-white p-5 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Latest Reported Issues</h3>
          <button className="text-sm bg-[#B77A4D] text-white px-3 py-1 rounded-full hover:bg-[#A36C40] transition">
            View All
          </button>
        </div>

        {/* Table Container for overflow on small screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 uppercase tracking-wider text-left bg-gray-50">
                <th className="py-3 px-2 font-medium">ID</th>
                <th className="py-3 px-2 font-medium">Issue Type</th>
                <th className="py-3 px-2 font-medium">Location</th>
                <th className="py-3 px-2 font-medium">Reporter</th>
                <th className="py-3 px-2 font-medium">Date</th>

                <th className="py-3 px-2 font-medium">Priority</th>
              </tr>
            </thead>
            <tbody>
              {reportedIssues.map((issue, index) => (
                <tr 
                  key={index} 
                  className="border-b last:border-b-0 text-gray-700 hover:bg-gray-100 cursor-pointer transition duration-150"
                  // ON CLICK INTEGRATION: Open the detail view
                  onClick={() => onIssueClick(issue)}
                >
                  <td className="py-3 px-2 font-semibold">{issue.id}</td>
                  <td className="py-3 px-2">{issue.type}</td>
                  <td className="py-3 px-2 text-xs">{issue.location}</td>
                  <td className="py-3 px-2">{issue.reporter}</td>
                  <td className="py-3 px-2">{issue.date}</td>
                  <td className="py-3 px-2">
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full shadow-inner ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Map View (Span 12 on mobile, 5 on desktop) */}
      <div className="col-span-5 bg-white p-5 rounded-xl shadow-lg flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Real-Time Issue Map</h3>
          {/* Map Refresh Icon */}
          <div className="bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-300 transform hover:rotate-45">
            <span role="img" aria-label="refresh">🔄</span>
          </div>
        </div>
        
        {/* Actual Map Area */}
        <div className="relative flex-1 min-h-[360px]">
  <MapContainer
  center={
    selectedIssue
      ? [selectedIssue.lat, selectedIssue.lng]
      : [28.6139, 77.2090]
  }
  zoom={selectedIssue ? 14 : 11}
  className="w-full h-full rounded-lg"
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="© OpenStreetMap"
  />

  {reportedIssues.map((issue) => (
    <Marker
      key={issue.id}
      position={[issue.lat, issue.lng]}
      icon={statusIcon(issue.status)}
      eventHandlers={{
        click: () => onIssueClick(issue),
      }}
    >
      <Popup>
        <b>{issue.type}</b><br />
        {issue.location}<br />
        Priority: {issue.priority}<br />
        Status: {issue.status}
      </Popup>
    </Marker>
  ))}
</MapContainer>


  {/* Legend */}
  <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow text-sm z-[1000]">
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-red-500 rounded-full" /> Pending
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-orange-500 rounded-full" /> In Progress
    </div>
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-green-500 rounded-full" /> Resolved
    </div>
    </div>
    </div>
    </div>
    </div>
    
  </main>
);

// --- Main Component (Handles State and Navigation) ---
const Admin = () => {
  // State for view: 'dashboard' or 'detail'
  const [view, setView] = useState('dashboard');
  // State to hold the data of the currently selected issue
  const [selectedIssue, setSelectedIssue] = useState(null);

  /**
   * Switches to the detail view and sets the selected issue data.
   * @param {Object} issue - The issue object to display.
   */
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setView('detail');
  };

  /**
   * Switches back to the dashboard view.
   */
  const handleBack = () => {
    setSelectedIssue(null);
    setView('dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* 1. Sidebar (Left Panel) - Brown/Orange */}
      <div className="w-64 bg-[#B77A4D] text-white flex flex-col shadow-lg">
        {/* Logo/Header */}
        <div className="p-6 text-2xl font-bold bg-[#A36C40] tracking-wider">CleanStreet</div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-2">
          {/* Dashboard */}
          <div 
            onClick={handleBack} 
            className={`flex items-center p-3 text-lg space-x-3 cursor-pointer rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02] ${view === 'dashboard' ? 'bg-[#A36C40]' : 'hover:bg-[#A36C40]'}`}
          >
            <LayoutDashboard className="text-xl" />
            <span>Dashboard</span>
          </div>

          {/* Reported Issues (Linked to Dashboard view for simplicity) */}
          <div 
            onClick={handleBack}
            className={`flex items-center p-3 text-lg space-x-3 cursor-pointer rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02] ${view === 'detail' ? 'bg-[#A36C40]' : 'hover:bg-[#A36C40]'}`}
          >
            <ClipboardEdit className="text-xl" />
            <span>Reported Issues</span>
          </div>

          {/* Other Navigation links */}
          <div className="flex items-center p-3 text-lg space-x-3 cursor-pointer hover:bg-[#A36C40] rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02]">
            <Map className="text-xl" />
            <span>Map View</span>
          </div>
          <div className="flex items-center p-3 text-lg space-x-3 cursor-pointer hover:bg-[#A36C40] rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02]">
            <Users className="text-xl" />
            <span>Manage Users</span>
          </div>
          <div className="flex items-center p-3 text-lg space-x-3 cursor-pointer hover:bg-[#A36C40] rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02]">
            <LineChart className="text-xl" />
            <span>Analytics</span>
          </div>
          <div className="flex items-center p-3 text-lg space-x-3 cursor-pointer hover:bg-[#A36C40] rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02]">
            <Settings className="text-xl" />
            <span>Settings</span>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/20 text-sm">
          Admin Profile Settings
        </div>
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-white border-b shadow-sm sticky top-0 z-10">
  {/* LEFT SIDE */}
  <div className="flex items-center gap-3">
    <h1 className="text-base sm:text-lg font-semibold text-gray-700">
      CleanStreet Admin Panel
    </h1>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-3">
  <Bell className="text-lg text-gray-600 cursor-pointer hover:text-[#B77A4D]" />
  <span className="h-6 w-px bg-gray-300"></span>


  <div className="leading-tight text-right ">
    <div className="text-sm font-medium text-gray-700">Admin User</div>
    <div className="text-xs text-gray-500">Administrator</div>
  </div>

    {/* SMALL A AVATAR (LIKE IMAGE) */}
    <div className="w-8 h-8 bg-[#B77A4D] rounded-full flex items-center justify-center cursor-pointer">
    <User className="w-4 h-4 text-white" />
    </div>
  </div>
</header>


        {/* CONDITIONAL CONTENT RENDERING */}
        {view === 'dashboard' ? (
          <DashboardView
          onIssueClick={handleIssueClick}
          selectedIssue={selectedIssue}
          setSelectedIssue={setSelectedIssue}
         setView={setView}
/>

        ) : (
          <IssueDetailView issue={selectedIssue} onBack={handleBack} />
        )}

      </div>
    </div>
  );
};

export default Admin;