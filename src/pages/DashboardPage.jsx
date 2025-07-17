import React, { useEffect, useState, useRef } from "react";
import ApexCharts from "apexcharts";
import {
  FaUsers,
  FaShieldAlt,
  FaUserTie,
  FaDatabase,
  FaChartLine,
  FaArrowUp,
  FaBars,
  FaUser,
  FaEnvelope,
  FaCog,
  FaHeadset,
  FaSignOutAlt,
  FaRegCommentAlt,
  FaHeartbeat,
  FaExternalLinkAlt,
  FaNetworkWired,
  FaProjectDiagram,
  FaChartArea,
  FaCalculator,
  FaTools,
  FaFileInvoiceDollar,
  FaArrowDown,
  FaAngleLeft,
  FaRegBell,
} from "react-icons/fa";
import {
  FaPersonCircleExclamation,
  FaPersonCircleCheck,
  FaServer,
  FaRegHardDrive,
  FaComputer,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TbMoneybag, TbCloudUpload } from "react-icons/tb";
import { MdRule, MdMonitorHeart, MdSearch } from "react-icons/md";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar-3.jpg";
import { Link } from "react-router-dom";

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
        toolbar: { show: true },
      },
      title: {
        text: "Radar with Polygon Fill",
        align: "left",
        style: {
          color: "#151D48",
          fontSize: "14px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
        },
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
        toolbar: { show: true },
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
            colorAboveThreshold: "#B3E5FC",
            colorBelowThreshold: "#B3E5FC",
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
        toolbar: { show: true },
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
          name: "Revenue",
          data: [9, 15, 6, 10, 16, 9, 13, 17, 12, 10, 14, 17], // sample data
        },
        {
          name: "Order",
          data: [5, 3, 12, 5, 9, 14, 18, 9, 3, 13, 10, 8], // sample data
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: { show: false },
      },
      colors: ["#7367F0", "#28C76F"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 95, 100],
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        markers: {
          radius: 12,
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
        labels: {
          style: {
            colors: "#6e6b7b",
            fontSize: "13px",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => `$${val}K`,
          style: {
            colors: "#6e6b7b",
            fontSize: "13px",
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val}K`,
        },
      },
      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 4,
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
      <nav className="fixed top-0 left-0 w-full h-20 flex items-center justify-between px-6 bg-white shadow-md transition-all duration-500 z-50">
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
      <main
        className={`pt-24 transition-all duration-500 ${
          isSidenavOpen ? "lg:ml-72" : "lg:ml-0"
        }`}
      >
        {/* KPI Widgets Section */}
        <section className="mt-5 px-4">
          <div className="container-fluid">
            <h1 className="text-lg text-[#151D48] font-semibold my-3 font-open-sans text-center lg:text-left">
              KPI Widgets
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 items-center justify-center">
              {/* Card 1: Cloud Spend */}
              <div className="bg-white rounded-lg shadow-md p-4 min-h-[110px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TbCloudUpload className="text-[#6c5ffc] text-xl" />
                    <h5 className="text-base font-medium text-[#151D48]">
                      Cloud Spend
                    </h5>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-black">$102</p>
                    <p className="text-sm text-black -mt-1">
                      -10 <FaArrowUp className="inline-block" />
                    </p>
                  </div>
                </div>
                <svg
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                  className="w-full h-12 mt-2"
                >
                  <defs>
                    <linearGradient
                      id="cloudGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#00CFE8" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00CFE8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 35 C 20 25, 40 30, 60 20 C 80 10, 100 30, 100 30 L100 40 L0 40 Z"
                    fill="url(#cloudGradient)"
                  />
                  <path
                    d="M0 35 C 20 25, 40 30, 60 20 C 80 10, 100 30, 100 30"
                    fill="none"
                    stroke="#00CFE8"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Cost Savings Card */}
              <div className="bg-white rounded-lg shadow-md p-4 min-h-[130px] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TbMoneybag className="text-[#6c5ffc] text-xl" />
                    <h5 className="text-base font-medium text-[#151D48]">
                      Cost Savings
                    </h5>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-black">$102</p>
                    <p className="text-sm text-black -mt-1">
                      -10 <FaArrowDown className="inline-block" />
                    </p>
                  </div>
                </div>
                <svg
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                  className="w-full h-12 mt-2"
                >
                  <defs>
                    <linearGradient
                      id="savingsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#28C76F" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#28C76F" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 30 C 20 20, 40 25, 60 25 C 80 25, 100 20, 100 20 L100 40 L0 40 Z"
                    fill="url(#savingsGradient)"
                  />
                  <path
                    d="M0 30 C 20 20, 40 25, 60 25 C 80 25, 100 20, 100 20"
                    fill="none"
                    stroke="#28C76F"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Card 3: Compliance Status */}
              <div className="bg-white rounded-lg shadow-md p-4 min-h-[130px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MdRule className="text-[#6c5ffc] text-xl" />
                    <h5 className="text-base font-medium text-[#151D48]">
                      Compliance Status
                    </h5>
                  </div>
                  <p className="text-base font-semibold text-black">$101.21</p>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[25%]"></div>
                </div>
                <div className="flex justify-between text-xs text-[#151D48] mt-2 px-1">
                  <span>
                    Start Date: <strong>10th JAN</strong>
                  </span>
                  <span>
                    End Date: <strong>29th JAN</strong>
                  </span>
                </div>
              </div>

              {/* Card 4: Agent Health */}
              <div className="bg-white rounded-lg shadow-md p-4 min-h-[130px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MdMonitorHeart className="text-[#6c5ffc] text-xl" />
                    <h5 className="text-base font-medium text-[#151D48]">
                      Agent Health
                    </h5>
                  </div>
                  <p className="text-base font-semibold text-black">$102</p>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[40%]"></div>
                </div>
                <div className="flex justify-between text-xs text-[#151D48] mt-2 px-1">
                  <span>
                    Start Date: <strong>10th JAN</strong>
                  </span>
                  <span>
                    End Date: <strong>29th JAN</strong>
                  </span>
                </div>
              </div>

              {/* Card 5: Open Incidents */}
              <div className="bg-white rounded-lg shadow-md p-4 min-h-[130px] flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaExternalLinkAlt className="text-[#6c5ffc] text-xl" />
                    <h5 className="text-base font-medium text-[#151D48]">
                      Open Incidents
                    </h5>
                  </div>
                  <p className="text-base font-semibold text-black">$102</p>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[30%]"></div>
                </div>
                <div className="flex justify-between text-xs text-[#151D48] mt-2 px-1">
                  <span>
                    Start Date: <strong>10th JAN</strong>
                  </span>
                  <span>
                    End Date: <strong>29th JAN</strong>
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
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans mt-5 mb-2">
                  Usage Graph
                </h2>
                <hr className="my-2 border-gray-400" />
                <div
                  id="sales-overtime"
                  ref={salesOvertimeChartRef}
                  className="apex-charts w-full h-[350px]"
                ></div>
              </div>
              {/* Recent Activity Feed */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans mt-5 mb-2">
                  Recent Activity Feed
                </h2>
                <hr className="my-2 border-gray-400" />
                <ul className="list-none p-0">
                  <li className="flex items-center py-5 border-b border-[#cdd6dd]">
                    <FaServer className="mr-3 text-base text-[#6c5ffc]" />
                    <span className="text-base text-[#151D48]">
                      Agent deployed on server X
                    </span>
                  </li>
                  <li className="flex items-center py-5 border-b border-[#cdd6dd]">
                    <FaPersonCircleCheck className="mr-3 text-base text-[#6c5ffc]" />
                    <span className="text-base text-[#151D48]">
                      User John approved resource change
                    </span>
                  </li>
                  <li className="flex items-center py-5">
                    <FaPersonCircleExclamation className="mr-3 text-base text-[#6c5ffc]" />
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
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans mt-5 mb-2">
                  Resource Usage Pie Chart
                </h2>
                <hr className="my-2 border-gray-400" />
                <div
                  id="pie-chart"
                  ref={pieChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Cost Trend Line */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans  mt-5 mb-2">
                  Cost Trend Line
                </h2>
                <hr className="my-2 border-gray-400" />
                <div
                  id="cost-trend-chart"
                  ref={costTrendChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Compliance Heatmap */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans  mt-5 mb-2">
                  Compliance Heatmap
                </h2>
                <hr className="my-2 border-gray-400" />
                <div
                  id="Compliance-Heatmap-chart"
                  ref={complianceHeatmapChartRef}
                  className="apex-charts flex justify-center w-full h-[350px]"
                ></div>
              </div>
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-md p-4 pt-2">
                <h2 className="text-base text-[#151D48] font-semibold font-open-sans mt-5 mb-2">
                  Quick Actions
                </h2>
                <hr className="my-2 border-gray-400" />
                <ul className="list-none p-0">
                  <li className="py-5 border-b border-[#cdd6dd]">
                    <span className="text-base text-[#151D48]">
                      Agent deployed on server X
                    </span>
                  </li>
                  <li className="py-5 border-b border-[#cdd6dd]">
                    <span className="text-base text-[#151D48]">
                      User John approved resource change
                    </span>
                  </li>
                  <li className="py-5">
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
