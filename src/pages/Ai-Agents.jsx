import React, { useEffect, useState, useRef } from "react";
import { MdSearch } from "react-icons/md";
import {
  FaUsers,
  FaShieldAlt,
  FaUserTie,
  FaDatabase,
  FaChartLine,
  FaBars,
  FaUser,
  FaEnvelope,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaRegCommentAlt,
  FaHeartbeat,
  FaNetworkWired,
  FaProjectDiagram,
  FaChartArea,
  FaCalculator,
  FaTools,
  FaFileInvoiceDollar,
  FaAngleLeft,
  FaRegBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaServer, FaRegHardDrive, FaComputer } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar-3.jpg";
import { Link } from "react-router-dom";

export default function AiAgents() {
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const navigate = useNavigate();
  const [activeSidebarMenu, setActiveSidebarMenu] = useState({});

  // Dummy data for AI Agents table
  const [aiAgentsData, setAiAgentsData] = useState([
    { name: "Airi Satou", deployedAt: "2025-06-01", status: "Idle" },
    { name: "Angelica Ramos", deployedAt: "2025-06-01", status: "Running" },
    { name: "Ashton Cox", deployedAt: "2025-06-01", status: "Running" },
    { name: "Bradley Greer", deployedAt: "2025-06-01", status: "Running" },
    { name: "Brielle Williamson", deployedAt: "2025-06-01", status: "Running" },
    { name: "Caesar Vance", deployedAt: "2025-06-01", status: "Running" },
    { name: "Cedric Kelly", deployedAt: "2025-06-01", status: "Running" },
    { name: "Charde Marshall", deployedAt: "2025-06-01", status: "Running" },
    { name: "Colleen Hurst", deployedAt: "2025-06-01", status: "Running" },
    { name: "Dai Rios", deployedAt: "2025-06-01", status: "Idle" },
    // Add more dummy data to reach 29 entries for pagination example
    { name: "Gavin Joyce", deployedAt: "2025-06-02", status: "Running" },
    { name: "Jennifer Chang", deployedAt: "2025-06-02", status: "Idle" },
    { name: "Michael Bruce", deployedAt: "2025-06-02", status: "Running" },
    { name: "Donna Snider", deployedAt: "2025-06-02", status: "Idle" },
    { name: "Tiger Nixon", deployedAt: "2025-06-03", status: "Running" },
    { name: "Garrett Winters", deployedAt: "2025-06-03", status: "Idle" },
    { name: "Ashton Cox", deployedAt: "2025-06-03", status: "Running" },
    { name: "Cedric Kelly", deployedAt: "2025-06-03", status: "Running" },
    { name: "Airi Satou", deployedAt: "2025-06-04", status: "Idle" },
    { name: "Brielle Williamson", deployedAt: "2025-06-04", status: "Running" },
    { name: "Herrod Chandler", deployedAt: "2025-06-04", status: "Running" },
    { name: "Rhona Davidson", deployedAt: "2025-06-04", status: "Idle" },
    { name: "Colleen Hurst", deployedAt: "2025-06-05", status: "Running" },
    { name: "Jena Gaines", deployedAt: "2025-06-05", status: "Idle" },
    { name: "Quinn Flynn", deployedAt: "2025-06-05", status: "Running" },
    { name: "Haley Kennedy", deployedAt: "2025-06-05", status: "Running" },
    { name: "Tatyana Fitzpatrick", deployedAt: "2025-06-06", status: "Idle" },
    { name: "Michael Silva", deployedAt: "2025-06-06", status: "Running" },
    { name: "Paul Byrd", deployedAt: "2025-06-06", status: "Running" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered data based on search term
  const filteredAgents = aiAgentsData.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAgents.length / entriesPerPage);

  // Get current agents for the page
  const indexOfLastAgent = currentPage * entriesPerPage;
  const indexOfFirstAgent = indexOfLastAgent - entriesPerPage;
  const currentAgents = filteredAgents.slice(
    indexOfFirstAgent,
    indexOfLastAgent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to toggle sidebar
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };

  // Function to toggle sidebar treeview menus
  const toggleTreeview = (menuName) => {
    setActiveSidebarMenu((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 bg-white shadow-md transition-all duration-500 z-50">
        <div className="container-fluid flex items-center justify-between w-full">
          <div className="cursor-pointer" onClick={toggleSidenav}>
            <FaBars className="text-base" />
          </div>
          <Link to="/dashboard" className="navbar-brand ps-3">
            <img src={logo} className="h-10" alt="Logo" />
          </Link>
          <div className="flex items-center ms-auto me-4">
            <ul className="flex items-center space-x-5">
              <li className="hidden lg:block md:block relative">
                <div
                  className={`relative h-10 rounded-full flex items-center transition-all duration-400 ${
                    isSearchBoxExpanded ? "w-72" : "w-10"
                  }`}
                  onMouseEnter={() => setIsSearchBoxExpanded(true)}
                  onMouseLeave={() => setIsSearchBoxExpanded(false)}
                >
                  <input
                    className={`border-none bg-transparent outline-none p-0 text-black text-base transition-all duration-400 flex-grow ${
                      isSearchBoxExpanded ? "w-60 px-1.5" : "w-0"
                    }`}
                    type="text"
                    placeholder="Type to Search"
                  />
                  <a
                    className="text-[#4097FF] w-10 h-10 rounded-full bg-transparent flex justify-center items-center transition-all duration-400 flex-shrink-0 hover:bg-white"
                    href="#"
                  >
                    <MdSearch className="text-2xl" />{" "}
                  </a>
                </div>
              </li>
              <li className="relative">
                <div className="dropdown">
                  <a
                    className="nav-link dropdown-toggle p-0 cursor-pointer"
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                  >
                    <img
                      src={avatar}
                      className="rounded-full"
                      width="35"
                      height="35"
                      alt="Profile"
                    />
                  </a>
                  {isProfileDropdownOpen && (
                    <ul className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 text-sm z-50">
                      <li>
                        <a
                          className="flex items-center px-4 py-2 hover:bg-[#013357] hover:text-white transition-colors duration-200"
                          href="#"
                        >
                          <FaUser className="mr-3 text-base" /> Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center px-4 py-2 hover:bg-[#013357] hover:text-white transition-colors duration-200"
                          href="#"
                        >
                          <FaEnvelope className="mr-3 text-base" /> Inbox
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center px-4 py-2 hover:bg-[#013357] hover:text-white transition-colors duration-200"
                          href="#"
                        >
                          <FaCog className="mr-3 text-base" /> Settings
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center px-4 py-2 hover:bg-[#013357] hover:text-white transition-colors duration-200"
                          href="#"
                        >
                          <FaHeadset className="mr-3 text-base" /> Support
                        </a>
                      </li>
                      <li>
                        <hr className="my-1 border-t border-gray-200" />
                      </li>
                      <li>
                        <a
                          className="flex items-center px-4 py-2 hover:bg-[#013357] hover:text-white transition-colors duration-200"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("token"); // 🔐 Remove token on logout
                            navigate("/login"); // 🔁 Redirect to login page
                          }}
                        >
                          <FaSignOutAlt className="mr-3 text-base" />
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li className="relative">
                <div className="dropdown">
                  <button
                    type="button"
                    className="p-0 relative border-0 cursor-pointer"
                    onClick={() =>
                      setIsNotificationsDropdownOpen(
                        !isNotificationsDropdownOpen
                      )
                    }
                  >
                    <FaRegBell className="text-base text-gray-900" />
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      4<span className="sr-only">unread messages</span>
                    </span>
                  </button>
                  {isNotificationsDropdownOpen && (
                    <ul className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg py-1 text-sm z-50">
                      <li>
                        <a
                          className="text-blue-500 flex justify-center items-center px-4 py-2"
                          href="#"
                        >
                          Unread
                        </a>
                      </li>
                      <li>
                        <hr className="my-1 border-t border-gray-200" />
                      </li>
                      <li>
                        <a
                          className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Another action
                        </a>
                      </li>
                      <li>
                        <a
                          className="px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                          href="#"
                        >
                          Something else here
                        </a>
                      </li>
                      <li>
                        <hr className="my-1 border-t border-gray-200" />
                      </li>
                      <li>
                        <a
                          className="text-blue-500 flex justify-center items-center px-4 py-2"
                          href="#"
                        >
                          View all Notifications
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="p-0 relative border-0 cursor-pointer"
                >
                  <FaRegCommentAlt className="text-base text-gray-700" />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    10
                    <span className="sr-only">unread messages</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Sidenav */}
      <section
        className={`fixed top-0 left-0 h-full bg-[#000030] overflow-y-auto transition-all duration-500 z-[9999] pt-16 pb-20 ${
          isSidenavOpen ? "w-72" : "w-0"
        }`}
      >
        <a
          href="#"
          className="absolute top-0 right-6 text-3xl ml-12 text-white"
          onClick={toggleSidenav}
        >
          &times;
        </a>
        <ul className="list-none pl-0 relative">
          <li className="py-3 px-4 text-white bg-[#1e2145] text-base font-semibold">
            Menu
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("cloudResources")}
            >
              <FaDatabase className="w-8 text-base" />
              <span className="flex-grow">Cloud Resources</span>
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.cloudResources ? "-rotate-90" : ""
                }`}
              />
            </a>
            {activeSidebarMenu.cloudResources && (
              <ul
                className={`list-none p-0 m-0 pl-1 bg-[#1e2145] transition-all duration-300 ease-in-out overflow-hidden ${
                  activeSidebarMenu.cloudResources ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaComputer className="w-8 text-base" />
                    Compute
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaRegHardDrive className="w-8 text-base" />
                    Storage
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaServer className="w-8 text-base" />
                    Database
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaNetworkWired className="w-8 text-base" />
                    Network
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/ai-agents"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
            >
              <FaUsers className="w-8 text-base" />
              <span>Ai Agents</span>
            </Link>
          </li>

          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("workflows")}
            >
              <FaProjectDiagram className="w-8 text-base" />
              <span>Workflows / Automations</span>
            </a>
            {/* Submenu for Workflows if needed */}
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("costOptimization")}
            >
              <FaChartLine className="w-8 text-base" />
              <span>Cost Optimization</span>
            </a>
            {/* Submenu for Cost Optimization if needed */}
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("complianceSecurity")}
            >
              <FaShieldAlt className="w-8 text-base" />
              <span>Compliance & Security</span>
            </a>
            {/* Submenu for Compliance & Security if needed */}
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("biasFairness")}
            >
              <FaChartArea className="w-8 text-base" />
              <span>Bias / Fairness Analytics</span>
            </a>
            {/* Submenu for Bias / Fairness Analytics if needed */}
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
            >
              <FaHeartbeat className="w-8 text-base" />
              <span>AgentOps (Monitoring & Health)</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
            >
              <FaCalculator className="w-8 text-base" />
              <span>Audit Logs</span>
            </a>
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("settings")}
            >
              <FaCog className="w-8 text-base" /> <span>Settings</span>
            </a>
            {/* Submenu for Settings if needed */}
          </li>
          <li className="py-3 px-4 text-white bg-[#1e2145] text-base font-semibold">
            Admin Control
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("admin")}
            >
              <FaUserTie className="w-8 text-base" />
              <span>Admin</span>
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.admin ? "-rotate-90" : ""
                }`}
              />
            </a>
            {activeSidebarMenu.admin && (
              <ul
                className={`list-none p-0 m-0 pl-1 bg-[#1e2145] transition-all duration-300 ease-in-out overflow-hidden ${
                  activeSidebarMenu.admin ? "max-h-96" : "max-h-0"
                }`}
              >
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaUser className="w-8 text-base" />
                    User Management
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaTools className="w-8 text-base" />
                    Org Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaFileInvoiceDollar className="w-8 text-base" />
                    Billing
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li className="mt-5 px-4">
            <a
              href="#"
              className="flex items-center py-2 text-white hover:bg-[#013357] rounded transition-colors duration-200"
            >
              <FaSignOutAlt className="w-8 text-base" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Main Content Area */}
      <div
        className={`p-2 pt-2 transition-all duration-500 ${
          isSidenavOpen ? "lg:ml-72" : "lg:ml-0"
        }`}
      >
        <h1 className="text-md font-bold text-[#151D48] mb-4">AI Agents</h1>
        {/* Breadcrumbs */}
        <div className="bg-white border border-dashed border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
          <div className="text-sm text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </Link>{" "}
            / <span className="text-gray-800 font-medium">AI Agents</span>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <select
              className="border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on entries change
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="text-sm text-gray-400 whitespace-nowrap">
              entries per page
            </span>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdSearch className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search:"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
          </div>
        </div>

        {/* AI Agents Table */}
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700 border-collapse">
            <thead className="text-xs text-white uppercase bg-[#000030]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 rounded-tl-lg border-r border-gray-300"
                >
                  Name
                </th>
                <th scope="col" className="px-6 py-3 border-r border-gray-300">
                  Deployed At
                </th>
                <th scope="col" className="px-6 py-3 border-r border-gray-300">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 rounded-tr-lg">
                  View Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAgents.length > 0 ? (
                currentAgents.map((agent, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap border-r border-gray-300">
                      {agent.name}
                    </td>
                    <td className="px-6 py-3 border-r border-gray-300">
                      {agent.deployedAt}
                    </td>
                    <td className="px-6 py-3 border-r border-gray-300">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          agent.status === "Running"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-400 text-gray-800"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <button className="font-medium text-blue-600 hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b">
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="flex flex-col md:flex-row justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-700 mb-4 md:mb-0">
            Showing{" "}
            <span className="text-gray-700">
              {indexOfFirstAgent + 1} to{" "}
              {Math.min(indexOfLastAgent, filteredAgents.length)}
            </span>{" "}
            of <span className="text-gray-700">{filteredAgents.length}</span>{" "}
            entries
          </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <FaAngleLeft className="w-2.5 h-2.5" />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                    currentPage === i + 1
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <FaAngleLeft className="w-2.5 h-2.5 rotate-180" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
