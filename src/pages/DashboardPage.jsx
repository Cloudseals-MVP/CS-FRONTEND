import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";
import {
  FaUsers,
  FaShieldAlt,
  FaUserTie,
  FaDatabase,
  FaChartLine,
  FaArrowUp,
  FaServer,
  FaUserCheck,
  FaExclamationCircle,
  FaBars,
  FaUser,
  FaEnvelope,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaBell,
  FaCommentAlt,
  FaCloudUploadAlt,
  FaMoneyBillAlt,
  FaClipboardList,
  FaHeartbeat,
  FaExternalLinkAlt,
  FaDesktop,
  FaHdd,
  FaNetworkWired,
  FaProjectDiagram,
  FaChartArea,
  FaCalculator,
  FaTools,
  FaFileInvoiceDollar,
  FaArrowDown,
  FaAngleLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import avatar from "../assets/avatar-3.jpg";

export default function DashboardPage() {
  const navigate = useNavigate();

  // State for UI elements
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isSearchBoxExpanded, setIsSearchBoxExpanded] = useState(false);
  const [activeSidebarMenu, setActiveSidebarMenu] = useState({}); // To manage treeview open/close

  // Refs for chart elements
  const pieChartRef = useRef(null);
  const costTrendChartRef = useRef(null);
  const complianceHeatmapChartRef = useRef(null);
  const salesOvertimeChartRef = useRef(null);

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

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/[^0-9.-]/g, ""));
      let current = 0;
      const duration = 4000; 
      const increment = target / (duration / 10); 

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target; 
        }
      };
      updateCounter();
    });
  }, []);

  // use effect for Prevent back button
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // use effect for Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const pieChartOptions = {
      series: [
        {
          name: "Series 1",
          data: [20, 100, 40, 30, 50, 80, 33],
        },
      ],
      chart: {
        height: 350,
        type: "radar",
        toolbar: { show: false },
      },
      dataLabels: { enabled: true },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: { colors: ["#f8f8f8", "#fff"] },
          },
        },
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
      yaxis: {
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
        },
      },
    };
    const pieChart = new ApexCharts(pieChartRef.current, pieChartOptions);
    pieChart.render();

    // Cost Trend Line Chart
    const costTrendOptions = {
      series: [{ data: [0, -41, 35, -51, 0, 62, -69, 32, -32, 54, 16, -50] }],
      chart: {
        height: 350,
        type: "area",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      title: {
        text: "Negative color for values less than 0",
        align: "left",
        style: {
          color: "#151D48",
          fontSize: "14px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      stroke: { width: 0 },
      plotOptions: {
        line: {
          colors: {
            threshold: 0,
            colorAboveThreshold: "#0088ee",
            colorBelowThreshold: "#ff0000",
          },
        },
      },
    };
    const costTrendChart = new ApexCharts(
      costTrendChartRef.current,
      costTrendOptions
    );
    costTrendChart.render();

    // Compliance Heatmap Chart
    const complianceHeatmapOptions = {
      series: [
        {
          data: [
            { x: "2008", y: [2800, 4500] },
            { x: "2009", y: [3200, 4100] },
            { x: "2010", y: [2950, 7800] },
            { x: "2011", y: [3000, 4600] },
            { x: "2012", y: [3500, 4100] },
            { x: "2013", y: [4500, 6500] },
            { x: "2014", y: [4100, 5600] },
          ],
        },
      ],
      chart: {
        height: 350,
        type: "rangeBar",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          isDumbbell: true,
          columnWidth: 3,
          dumbbellColors: [["#008FFB", "#00E396"]],
        },
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        position: "top",
        horizontalAlign: "left",
        customLegendItems: ["Product A", "Product B"],
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          gradientToColors: ["#00E396"],
          inverseColors: true,
          stops: [0, 100],
        },
      },
      grid: {
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      xaxis: { tickPlacement: "on" },
    };
    const complianceHeatmapChart = new ApexCharts(
      complianceHeatmapChartRef.current,
      complianceHeatmapOptions
    );
    complianceHeatmapChart.render();

    // Sales Overtime Chart (Line Chart)
    const salesOvertimeOptions = {
      series: [
        {
          name: "Sales",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 110, 130, 150],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: { format: "dd/MM/yy HH:mm" },
      },
    };
    const salesOvertimeChart = new ApexCharts(
      salesOvertimeChartRef.current,
      salesOvertimeOptions
    );
    salesOvertimeChart.render();

    // Cleanup function for charts
    return () => {
      pieChart.destroy();
      costTrendChart.destroy();
      complianceHeatmapChart.destroy();
      salesOvertimeChart.destroy();
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <div className="font-poppins bg-[#F0F3F9] min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full h-18 flex items-center justify-between px-4 bg-white shadow-md transition-all duration-500 z-50">
        <div className="container-fluid flex items-center justify-between w-full">
          <div className="cursor-pointer" onClick={toggleSidenav}>
            <FaBars className="text-base" />
          </div>
          <a className="navbar-brand ps-3" href="#">
            <img src={logo} className="h-10" alt="Logo" />
          </a>
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
                    <FaBars className="text-xl" />{" "}
                    {/* Using FaBars for search icon as fas-search is not imported */}
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
                    <FaBell className="text-base text-gray-700" />
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
                  <FaCommentAlt className="text-base text-gray-700" />
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
        className={`fixed top-0 left-0 h-full bg-[#000030] overflow-x-hidden transition-all duration-500 z-[9999] pt-16 ${
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
              <ul className="list-none p-0 m-0 pl-1 bg-[#1e2145]">
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaDesktop className="w-8 text-base" />
                    Compute
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center py-1.5 px-4 text-sm text-[#8aa4af] bg-[#1e2145] hover:text-white transition-colors duration-200"
                  >
                    <FaHdd className="w-8 text-base" />
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
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
            >
              <FaUsers className="w-8 text-base" />
              <span>Ai Agents</span>
            </a>
          </li>
          <li className="treeview">
            <a
              href="#"
              className="flex items-center py-3 px-4 border-l-3 border-transparent text-[#b8c7ce] text-sm hover:text-white hover:bg-[#013357] hover:border-[#6c5ffc] transition-colors duration-200"
              onClick={() => toggleTreeview("workflows")}
            >
              <FaProjectDiagram className="w-8 text-base" />
              <span>Workflows / Automations</span>
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.workflows ? "-rotate-90" : ""
                }`}
              />
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
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.costOptimization ? "-rotate-90" : ""
                }`}
              />
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
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.complianceSecurity ? "-rotate-90" : ""
                }`}
              />
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
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.biasFairness ? "-rotate-90" : ""
                }`}
              />
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
              <FaAngleLeft
                className={`ml-auto text-sm transition-transform duration-300 ${
                  activeSidebarMenu.settings ? "-rotate-90" : ""
                }`}
              />
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
              <ul className="list-none p-0 m-0 pl-1 bg-[#1e2145]">
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
        </ul>
        <div className="absolute bottom-5 left-0 right-0 text-center">
          <a href="#" className="text-white">
            <FaSignOutAlt className="text-lg inline-block" />
          </a>
        </div>
      </section>

      {/* Main Content Area */}
      <main
        className={`pt-24 transition-all duration-500 ${
          isSidenavOpen ? "lg:ml-72" : "lg:ml-0"
        }`}
      >
        {/* KPI Widgets Section */}
        <section className="mt-8 px-4">
          <div className="container-fluid">
            <h1 className="text-lg text-[#151D48] font-semibold my-5 font-open-sans text-center lg:text-left">
              KPI Widgets
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 items-center justify-center">
              {/* Card 1: Cloud Spend */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="m-1 ps-1 text-2xl text-[#6c5ffc]">
                      <FaCloudUploadAlt />
                    </span>
                    <h5 className="text-base font-medium text-[#151D48] whitespace-nowrap">
                      Cloud Spend
                    </h5>
                  </div>
                  <div className="text-right">
                    <h5 className="text-base font-medium text-[#151D48]">
                      <span>$</span>
                      <span className="counter">101.21</span>
                    </h5>
                    <h6 className="text-base text-[#151D48]">
                      <span className="counter">-10.9 </span>
                      <FaArrowUp className="text-gray-400 inline-block" />
                    </h6>
                  </div>
                </div>
                <canvas
                  height="100"
                  className="blog-overview-stats-small-1 w-full"
                ></canvas>
              </div>

              {/* Card 2: Cost Savings */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="m-1 ps-1 text-2xl text-[#6c5ffc]">
                      <FaMoneyBillAlt />
                    </span>
                    <h5 className="text-base font-medium text-[#151D48] whitespace-nowrap">
                      Cost Savings
                    </h5>
                  </div>
                  <div className="text-right">
                    <h5 className="text-base font-medium text-[#151D48]">
                      <span>$</span>
                      <span className="counter">101.21</span>
                    </h5>
                    <h6 className="text-base text-[#151D48]">
                      <span className="counter">-10.9 </span>
                      <FaArrowDown className="text-gray-400 inline-block" />
                    </h6>
                  </div>
                </div>
                <canvas
                  height="100"
                  className="blog-overview-stats-small-2 w-full"
                ></canvas>
              </div>

              {/* Card 3: Compliance Status */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="m-1 text-2xl text-[#6c5ffc]">
                      <FaClipboardList />
                    </span>
                    <h5 className="text-base font-medium text-[#151D48] whitespace-nowrap">
                      Compliance Status
                    </h5>
                  </div>
                  <div className="text-right">
                    <h5 className="text-base font-medium text-[#151D48]">
                      <span>$</span>
                      <span className="counter">101.21</span>
                    </h5>
                  </div>
                </div>
                <div className="px-8 py-4 w-full">
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-semibold px-2 pb-2 text-[#151D48]">
                  <span>
                    Start Date: <span className="font-normal">10th JAN</span>
                  </span>
                  <span>
                    End Date: <span className="font-normal">29th JAN</span>
                  </span>
                </div>
              </div>

              {/* Card 4: Agent Health */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="m-1 text-2xl text-[#6c5ffc]">
                      <FaHeartbeat />
                    </span>
                    <h5 className="text-base font-medium text-[#151D48] whitespace-nowrap">
                      Agent Health
                    </h5>
                  </div>
                  <div className="text-right">
                    <h5 className="text-base font-medium text-[#151D48]">
                      <span>$</span>
                      <span className="counter">101.21</span>
                    </h5>
                  </div>
                </div>
                <div className="px-8 py-4 w-full">
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-semibold px-2 pb-2 text-[#151D48]">
                  <span>
                    Start Date: <span className="font-normal">10th JAN</span>
                  </span>
                  <span>
                    End Date: <span className="font-normal">29th JAN</span>
                  </span>
                </div>
              </div>

              {/* Card 5: Open Incidents */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="m-1 text-2xl text-[#6c5ffc]">
                      <FaExternalLinkAlt />
                    </span>
                    <h5 className="text-base font-medium text-[#151D48] whitespace-nowrap">
                      Open Incidents
                    </h5>
                  </div>
                  <div className="text-right">
                    <h5 className="text-base font-medium text-[#151D48]">
                      <span>$</span>
                      <span className="counter">101.21</span>
                    </h5>
                  </div>
                </div>
                <div className="px-8 py-4 w-full">
                  <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-semibold px-2 pb-2 text-[#151D48]">
                  <span>
                    Start Date: <span className="font-normal">10th JAN</span>
                  </span>
                  <span>
                    End Date: <span className="font-normal">29th JAN</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Total Revenue Section */}
        <section className="mt-8 px-4">
          <div className="container-fluid">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5">
              {/* Usage Graph */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Usage Graph
                </h2>
                <hr className="my-2 border-gray-200" />
                <div
                  id="sales-overtime"
                  ref={salesOvertimeChartRef}
                  className="apex-charts w-full h-[350px]"
                ></div>
              </div>
              {/* Recent Activity Feed */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Recent Activity Feed
                </h2>
                <hr className="my-2 border-gray-200" />
                <ul className="list-none p-0">
                  <li className="flex items-center py-2 border-b border-[#cdd6dd]">
                    <FaServer className="mr-3 text-base text-[#6c5ffc]" />
                    <span className="text-base text-[#151D48]">
                      Agent deployed on server X
                    </span>
                  </li>
                  <li className="flex items-center py-2 border-b border-[#cdd6dd]">
                    <FaUserCheck className="mr-3 text-base text-[#6c5ffc]" />
                    <span className="text-base text-[#151D48]">
                      User John approved resource change
                    </span>
                  </li>
                  <li className="flex items-center py-2">
                    <FaExclamationCircle className="mr-3 text-base text-[#6c5ffc]" />
                    <span className="text-base text-[#151D48]">
                      Alert triggered: High CPU Usage
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Content Section */}
        <section className="mt-8 px-4 mb-20">
          <div className="container-fluid">
            <h1 className="text-lg text-[#151D48] font-semibold my-5 font-open-sans text-center lg:text-left">
              Visualization
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Resource Usage Pie Chart */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Resource Usage Pie Chart
                </h2>
                <hr className="my-2 border-gray-200" />
                <div
                  id="pie-chart"
                  ref={pieChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Cost Trend Line */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Cost Trend Line
                </h2>
                <hr className="my-2 border-gray-200" />
                <div
                  id="cost-trend-chart"
                  ref={costTrendChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Compliance Heatmap */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Compliance Heatmap
                </h2>
                <hr className="my-2 border-gray-200" />
                <div
                  id="Compliance-Heatmap-chart"
                  ref={complianceHeatmapChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans">
                  Quick Actions
                </h2>
                <hr className="my-2 border-gray-200" />
                <ul className="list-none p-0">
                  <li className="py-2 border-b border-[#cdd6dd]">
                    <span className="text-base text-[#151D48]">
                      Agent deployed on server X
                    </span>
                  </li>
                  <li className="py-2 border-b border-[#cdd6dd]">
                    <span className="text-base text-[#151D48]">
                      User John approved resource change
                    </span>
                  </li>
                  <li className="py-2">
                    <span className="text-base text-[#151D48]">
                      Alert triggered: High CPU Usage
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
