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
      <h1 className="text-2xl font-semibold text-[#151D48] mb-4">AI Agents</h1>
      <p className="text-gray-700">
        Welcome to the AI Agents section. Build and manage your agents here.
      </p>
    </div>
  );
}
