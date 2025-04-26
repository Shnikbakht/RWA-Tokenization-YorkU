"use client";

import React, { useState } from "react";
import Link from "next/link";
import DashboardSelector from "../../components/DashboardSelector";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  FaBars,
  FaBell,
  FaBuilding,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCog,
  FaCoins,
  FaExchangeAlt,
  FaFileAlt,
  FaHome,
  FaListAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPlus,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

// Mock data for asset issuer
const mockIssuerData = {
  properties: [
    {
      id: 1,
      name: "Luxury Downtown Apartment",
      location: "New York, NY",
      image: "/images/property1.jpg",
      status: "Active",
      tokenPrice: 115,
      tokensIssued: 1000,
      tokensSold: 800,
      fundingProgress: 80,
      value: 1500000,
      monthlyRevenue: 25000,
      occupancyRate: 94,
      annualReturn: 5.2,
      nextDistribution: "May 15, 2025",
    },
    {
      id: 2,
      name: "Commercial Office Building",
      location: "Austin, TX",
      image: "/images/property2.jpg",
      status: "Active",
      tokenPrice: 575,
      tokensIssued: 2000,
      tokensSold: 1800,
      fundingProgress: 90,
      value: 3000000,
      monthlyRevenue: 42000,
      occupancyRate: 87,
      annualReturn: 6.5,
      nextDistribution: "June 1, 2025",
    },
    {
      id: 3,
      name: "Residential Complex",
      location: "Miami, FL",
      image: "/images/property3.jpg",
      status: "Funding",
      tokenPrice: 250,
      tokensIssued: 5000,
      tokensSold: 2100,
      fundingProgress: 42,
      value: 8500000,
      monthlyRevenue: 95000,
      occupancyRate: 88,
      annualReturn: 4.8,
      nextDistribution: "Pending Completion",
    },
  ],
  drafts: [
    {
      id: 4,
      name: "Retail Plaza Project",
      location: "Chicago, IL",
      image: "/images/property4.jpg",
      status: "Draft",
      estimatedValue: 4200000,
      completionPercentage: 65,
    },
    {
      id: 5,
      name: "Industrial Warehouse",
      location: "Dallas, TX",
      image: "/images/property5.jpg",
      status: "Draft",
      estimatedValue: 2800000,
      completionPercentage: 25,
    },
  ],
  investors: [
    { id: 1, name: "Shahla Nikbakht", investments: 15000, tokens: 150, joinDate: "Oct 10, 2024" },
    { id: 2, name: "Sarah Williams", investments: 25000, tokens: 250, joinDate: "Oct 15, 2024" },
    { id: 3, name: "Michael Brown", investments: 10000, tokens: 100, joinDate: "Oct 18, 2024" },
    { id: 4, name: "Jessica Davis", investments: 30000, tokens: 300, joinDate: "Oct 20, 2024" },
    { id: 5, name: "David Miller", investments: 20000, tokens: 200, joinDate: "Oct 22, 2024" },
  ],
  recentActivities: [
    {
      id: 1,
      type: "Sale",
      property: "Luxury Downtown Apartment",
      amount: 5000,
      date: "Apr 10, 2025",
      user: "Sarah Williams",
    },
    {
      id: 2,
      type: "Distribution",
      property: "Commercial Office Building",
      amount: 12500,
      date: "Apr 1, 2025",
      user: "All Investors",
    },
    { id: 3, type: "Sale", property: "Residential Complex", amount: 7500, date: "Mar 28, 2025", user: "David Miller" },
    {
      id: 4,
      type: "Distribution",
      property: "Luxury Downtown Apartment",
      amount: 8750,
      date: "Mar 15, 2025",
      user: "All Investors",
    },
  ],
  upcomingSchedules: [
    {
      id: 1,
      event: "Dividend Distribution",
      property: "Luxury Downtown Apartment",
      date: "May 15, 2025",
      amount: 9000,
    },
    {
      id: 2,
      event: "Dividend Distribution",
      property: "Commercial Office Building",
      date: "June 1, 2025",
      amount: 13000,
    },
    { id: 3, event: "Property Inspection", property: "Residential Complex", date: "May 5, 2025", amount: null },
    {
      id: 4,
      event: "Annual Report Release",
      property: "Luxury Downtown Apartment",
      date: "July 10, 2025",
      amount: null,
    },
  ],
  performanceSummary: {
    totalProperties: 3,
    totalValueUnderManagement: 13000000,
    totalTokensIssued: 8000,
    totalTokensSold: 4700,
    averageOccupancyRate: 90,
    averageAnnualReturn: 5.5,
    totalMonthlyRevenue: 162000,
  },
};

// Main dashboard component
export default function IssuerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <FaChartLine className="w-5 h-5" /> },
    { id: "properties", label: "My Properties", icon: <FaBuilding className="w-5 h-5" /> },
    { id: "tokenization", label: "Tokenization", icon: <FaExchangeAlt className="w-5 h-5" /> },
    { id: "investors", label: "Investors", icon: <FaUsers className="w-5 h-5" /> },
    { id: "distributions", label: "Distributions", icon: <FaCoins className="w-5 h-5" /> },
    { id: "reports", label: "Reports", icon: <FaChartBar className="w-5 h-5" /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt className="w-5 h-5" /> },
  ];

  return (
    <>
      <main className="flex min-h-screen bg-base-100">
        {/* Dashboard Selector for Demo */}
        <DashboardSelector currentRole="issuer" />

        {/* Mobile menu toggle button - visible only on small screens */}
        <button
          className="fixed bottom-4 right-4 z-50 lg:hidden btn btn-circle btn-primary shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Sidebar Navigation - hidden on mobile unless toggled */}
        <div
          className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-estate-600 shadow-lg transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          {/* Dashboard User Info */}
          <div className="p-4 border-b border-estate-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-estate-500 flex items-center justify-center text-white">
                <FaBuilding />
              </div>
              <div>
                <h2 className="font-semibold text-white">ABC Properties</h2>
                <p className="text-sm text-estate-200">Asset Issuer</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false); // Close mobile menu on navigation
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        activeTab === item.id
                          ? "bg-estate-500 text-white"
                          : "text-estate-200 hover:bg-estate-500/50 hover:text-white"
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-estate-500">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-estate-200 hover:bg-estate-500/50 hover:text-white transition-colors">
                <FaSignOutAlt className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-x-hidden">
          {/* Dashboard Header */}
          <div className="bg-estate-600 py-6">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {navItems.find(item => item.id === activeTab)?.label || "Dashboard"}
                  </h1>
                  <p className="text-estate-100">Asset Issuer Panel</p>
                </div>
                <div className="flex gap-3">
                  <button className="btn btn-circle btn-sm bg-estate-500 border-none text-white">
                    <FaBell />
                  </button>
                  <div className="hidden lg:block">
                    <button className="btn btn-circle btn-sm bg-estate-500 border-none text-white">
                      <FaUser />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="container mx-auto px-4 py-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Performance Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Assets Under Management</p>
                        <p className="text-2xl font-bold">
                          ${(mockIssuerData.performanceSummary.totalValueUnderManagement / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaBuilding className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Monthly Revenue</p>
                        <p className="text-2xl font-bold">
                          ${mockIssuerData.performanceSummary.totalMonthlyRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaMoneyBillWave className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Tokens Issued</p>
                        <p className="text-2xl font-bold">
                          {mockIssuerData.performanceSummary.totalTokensIssued.toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaCoins className="text-estate-300 text-xl" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm">
                        {Math.round(
                          (mockIssuerData.performanceSummary.totalTokensSold /
                            mockIssuerData.performanceSummary.totalTokensIssued) *
                            100,
                        )}
                        % sold
                      </span>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Avg. Occupancy</p>
                        <p className="text-2xl font-bold">{mockIssuerData.performanceSummary.averageOccupancyRate}%</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaUsers className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Properties */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Active Properties</h2>
                    <button
                      onClick={() => setActiveTab("properties")}
                      className="text-estate-300 hover:text-estate-200"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockIssuerData.properties
                      .filter(p => p.status === "Active")
                      .map(property => (
                        <div key={property.id} className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                          <div className="relative h-40 bg-estate-400">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-estate-100">Property Image</span>
                            </div>
                            <div className="absolute top-4 right-4 px-2 py-1 bg-token-green bg-opacity-90 text-white text-xs rounded-full">
                              {property.annualReturn}% APY
                            </div>
                          </div>

                          <div className="p-5">
                            <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                            <p className="text-estate-100 text-sm mb-4 flex items-center">
                              <FaMapMarkerAlt className="mr-1" /> {property.location}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-estate-100">Token Price</p>
                                <p className="font-semibold">${property.tokenPrice}</p>
                              </div>
                              <div>
                                <p className="text-xs text-estate-100">Tokens Sold</p>
                                <p className="font-semibold">
                                  {property.tokensSold} / {property.tokensIssued}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-estate-100">Monthly Revenue</p>
                                <p className="font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-estate-100">Occupancy</p>
                                <p className="font-semibold">{property.occupancyRate}%</p>
                              </div>
                            </div>

                            <Link
                              href={`/dashboard/issuer/property/${property.id}`}
                              className="btn btn-primary btn-sm w-full"
                            >
                              Manage Property
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Tokenization in Progress */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Tokenization in Progress</h2>
                    <button
                      onClick={() => setActiveTab("tokenization")}
                      className="text-estate-300 hover:text-estate-200"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Funding Property */}
                    {mockIssuerData.properties
                      .filter(p => p.status === "Funding")
                      .map(property => (
                        <div key={property.id} className="bg-base-200 rounded-lg shadow-md p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{property.name}</h3>
                              <p className="text-estate-100 text-sm flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {property.location}
                              </p>
                            </div>
                            <div className="px-2 py-1 bg-token-blue bg-opacity-20 text-token-blue text-xs rounded-full">
                              Funding
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-estate-100">Funding Progress</span>
                              <span className="text-sm text-estate-100">{property.fundingProgress}%</span>
                            </div>
                            <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                              <div
                                className="bg-token-blue h-2 rounded-full"
                                style={{ width: `${property.fundingProgress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-estate-100">Property Value</p>
                              <p className="font-semibold">${property.value.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Tokens Sold</p>
                              <p className="font-semibold">
                                {property.tokensSold} / {property.tokensIssued}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Token Price</p>
                              <p className="font-semibold">${property.tokenPrice}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Est. Return</p>
                              <p className="font-semibold">{property.annualReturn}%</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Link
                              href={`/dashboard/issuer/property/${property.id}`}
                              className="btn btn-primary btn-sm flex-1"
                            >
                              Manage
                            </Link>
                            <button className="btn btn-outline btn-sm flex-1 border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                              Edit Details
                            </button>
                          </div>
                        </div>
                      ))}

                    {/* Draft Properties */}
                    {mockIssuerData.drafts.map(draft => (
                      <div key={draft.id} className="bg-base-200 rounded-lg shadow-md p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{draft.name}</h3>
                            <p className="text-estate-100 text-sm flex items-center">
                              <FaMapMarkerAlt className="mr-1" /> {draft.location}
                            </p>
                          </div>
                          <div className="px-2 py-1 bg-estate-200 bg-opacity-20 text-estate-200 text-xs rounded-full">
                            Draft
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-estate-100">Setup Completion</span>
                            <span className="text-sm text-estate-100">{draft.completionPercentage}%</span>
                          </div>
                          <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                            <div
                              className="bg-estate-200 h-2 rounded-full"
                              style={{ width: `${draft.completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-estate-100">Estimated Value</p>
                          <p className="font-semibold">${draft.estimatedValue.toLocaleString()}</p>
                        </div>

                        <div className="flex gap-2">
                          <button className="btn btn-primary btn-sm flex-1">Continue Setup</button>
                          <button className="btn btn-outline btn-sm flex-1 border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                            Delete Draft
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities & Upcoming Events */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Activities */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                    <div className="bg-base-200 rounded-lg shadow-md p-4">
                      <div className="space-y-4">
                        {mockIssuerData.recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-start gap-3 p-3 bg-base-300 rounded-lg">
                            <div
                              className={`rounded-full p-2 flex-shrink-0 ${
                                activity.type === "Distribution"
                                  ? "bg-token-green bg-opacity-20"
                                  : "bg-token-blue bg-opacity-20"
                              }`}
                            >
                              {/* You can replace this with an icon or initial */}
                              <span className="text-sm font-medium">{activity.type}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{activity.description}</span>
                              <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Distributions Tab */}
                  {activeTab === "distributions" && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-semibold">Distributions</h2>
                          <p className="text-estate-100">Manage dividend payments to investors</p>
                        </div>

                        <button className="btn btn-primary gap-2">
                          <FaCoins className="mr-1" /> New Distribution
                        </button>
                      </div>

                      {/* Distribution Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Total Distributed</p>
                              <p className="text-2xl font-bold">$42,500</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaCoins className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Next Distribution</p>
                              <p className="text-2xl font-bold">May 15, 2025</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaCalendarAlt className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Upcoming Amount</p>
                              <p className="text-2xl font-bold">$9,000</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaMoneyBillWave className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Scheduled Distributions */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Scheduled Distributions</h3>

                        <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="table w-full">
                              <thead className="bg-base-300">
                                <tr>
                                  <th className="text-estate-50">Property</th>
                                  <th className="text-estate-50">Distribution Date</th>
                                  <th className="text-estate-50">Amount</th>
                                  <th className="text-estate-50">Status</th>
                                  <th className="text-estate-50">Investors</th>
                                  <th className="text-estate-50">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    id: 1,
                                    property: "Luxury Downtown Apartment",
                                    date: "May 15, 2025",
                                    amount: 9000,
                                    status: "Scheduled",
                                    investors: 5,
                                  },
                                  {
                                    id: 2,
                                    property: "Commercial Office Building",
                                    date: "June 1, 2025",
                                    amount: 13000,
                                    status: "Scheduled",
                                    investors: 4,
                                  },
                                ].map(distribution => (
                                  <tr key={distribution.id} className="hover:bg-base-300/50">
                                    <td>{distribution.property}</td>
                                    <td>{distribution.date}</td>
                                    <td>${distribution.amount.toLocaleString()}</td>
                                    <td>
                                      <span className="px-2 py-1 rounded-full bg-estate-200 bg-opacity-20 text-estate-200 text-xs">
                                        {distribution.status}
                                      </span>
                                    </td>
                                    <td>{distribution.investors}</td>
                                    <td>
                                      <div className="flex gap-1">
                                        <button className="btn btn-xs btn-ghost">Edit</button>
                                        <button className="btn btn-xs btn-ghost">Cancel</button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Distribution History */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Distribution History</h3>

                        <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="table w-full">
                              <thead className="bg-base-300">
                                <tr>
                                  <th className="text-estate-50">Property</th>
                                  <th className="text-estate-50">Distribution Date</th>
                                  <th className="text-estate-50">Amount</th>
                                  <th className="text-estate-50">Status</th>
                                  <th className="text-estate-50">Investors</th>
                                  <th className="text-estate-50">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    id: 1,
                                    property: "Commercial Office Building",
                                    date: "Apr 1, 2025",
                                    amount: 12500,
                                    status: "Completed",
                                    investors: 4,
                                  },
                                  {
                                    id: 2,
                                    property: "Luxury Downtown Apartment",
                                    date: "Mar 15, 2025",
                                    amount: 8750,
                                    status: "Completed",
                                    investors: 5,
                                  },
                                  {
                                    id: 3,
                                    property: "Commercial Office Building",
                                    date: "Jan 1, 2025",
                                    amount: 12500,
                                    status: "Completed",
                                    investors: 4,
                                  },
                                  {
                                    id: 4,
                                    property: "Luxury Downtown Apartment",
                                    date: "Dec 15, 2024",
                                    amount: 8750,
                                    status: "Completed",
                                    investors: 5,
                                  },
                                ].map(distribution => (
                                  <tr key={distribution.id} className="hover:bg-base-300/50">
                                    <td>{distribution.property}</td>
                                    <td>{distribution.date}</td>
                                    <td>${distribution.amount.toLocaleString()}</td>
                                    <td>
                                      <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                                        {distribution.status}
                                      </span>
                                    </td>
                                    <td>{distribution.investors}</td>
                                    <td>
                                      <div className="flex gap-1">
                                        <button className="btn btn-xs btn-primary">View Details</button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* Create New Distribution */}
                      <div className="bg-base-200 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Schedule New Distribution</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Property</span>
                              </label>
                              <select className="select select-bordered w-full">
                                <option disabled selected>
                                  Select property
                                </option>
                                {mockIssuerData.properties.map(property => (
                                  <option key={property.id} value={property.id}>
                                    {property.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Distribution Date</span>
                              </label>
                              <input type="date" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Distribution Amount ($)</span>
                              </label>
                              <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Distribution Type</span>
                              </label>
                              <select className="select select-bordered w-full">
                                <option disabled selected>
                                  Select type
                                </option>
                                <option>Regular Dividend</option>
                                <option>Special Dividend</option>
                                <option>Capital Return</option>
                              </select>
                            </div>

                            <div className="form-control">
                              <label className="label cursor-pointer justify-start">
                                <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                                <span className="label-text">Send notification to investors</span>
                              </label>
                            </div>
                          </div>

                          <div className="bg-base-300 rounded-lg p-4">
                            <h4 className="font-medium mb-3">Distribution Preview</h4>

                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between">
                                <span className="text-estate-100">Total Tokens:</span>
                                <span>1,000</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-estate-100">Tokens Sold:</span>
                                <span>800</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-estate-100">Number of Investors:</span>
                                <span>5</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-estate-100">Distribution per Token:</span>
                                <span>$11.25</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Total Distribution:</span>
                                <span>$9,000.00</span>
                              </div>
                            </div>

                            <div className="bg-base-200 p-3 rounded-lg mb-4">
                              <p className="text-sm">
                                Distributions are made to all token holders proportional to their ownership as of the
                                snapshot date (24 hours before the distribution date).
                              </p>
                            </div>

                            <div className="flex justify-end">
                              <button className="btn btn-primary">Schedule Distribution</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reports Tab */}
                  {activeTab === "reports" && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
                          <p className="text-estate-100">View performance reports and analytics</p>
                        </div>

                        <div className="flex gap-2">
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-outline">
                              <FaCalendarAlt className="mr-2" />
                              Last 30 Days
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-lg w-52"
                            >
                              <li>
                                <a>Last 7 Days</a>
                              </li>
                              <li>
                                <a>Last 30 Days</a>
                              </li>
                              <li>
                                <a>Last 90 Days</a>
                              </li>
                              <li>
                                <a>Last 12 Months</a>
                              </li>
                              <li>
                                <a>All Time</a>
                              </li>
                            </ul>
                          </div>

                          <button className="btn btn-outline">
                            <FaFileAlt className="mr-2" />
                            Export
                          </button>
                        </div>
                      </div>

                      {/* Performance Overview */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <div className="bg-base-200 rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-xl font-semibold">Portfolio Performance</h3>
                              <div className="flex gap-1">
                                <button className="btn btn-xs">Monthly</button>
                                <button className="btn btn-xs btn-ghost">Quarterly</button>
                                <button className="btn btn-xs btn-ghost">Yearly</button>
                              </div>
                            </div>

                            <div className="h-64 bg-base-300 rounded-lg flex items-center justify-center">
                              <p className="text-estate-100">Performance Chart</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-4">
                              <div className="bg-base-300 p-3 rounded-lg text-center">
                                <p className="text-sm text-estate-100">Revenue</p>
                                <p className="font-semibold">$162,000</p>
                                <p className="text-xs text-token-green">↑ 5.2%</p>
                              </div>
                              <div className="bg-base-300 p-3 rounded-lg text-center">
                                <p className="text-sm text-estate-100">Expenses</p>
                                <p className="font-semibold">$48,600</p>
                                <p className="text-xs text-token-red">↑ 2.1%</p>
                              </div>
                              <div className="bg-base-300 p-3 rounded-lg text-center">
                                <p className="text-sm text-estate-100">Net Income</p>
                                <p className="font-semibold">$113,400</p>
                                <p className="text-xs text-token-green">↑ 6.5%</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="bg-base-200 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Property Metrics</h3>

                            <div className="space-y-4">
                              {mockIssuerData.properties.map(property => (
                                <div key={property.id} className="bg-base-300 p-3 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">{property.name}</h4>
                                    <span className="badge bg-token-green text-white">{property.annualReturn}%</span>
                                  </div>

                                  <div className="space-y-2">
                                    <div>
                                      <div className="flex justify-between mb-1 text-xs">
                                        <span className="text-estate-100">Occupancy</span>
                                        <span>{property.occupancyRate}%</span>
                                      </div>
                                      <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-1.5">
                                        <div
                                          className="bg-token-green h-1.5 rounded-full"
                                          style={{ width: `${property.occupancyRate}%` }}
                                        ></div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex justify-between mb-1 text-xs">
                                        <span className="text-estate-100">Token Sales</span>
                                        <span>{property.fundingProgress}%</span>
                                      </div>
                                      <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-1.5">
                                        <div
                                          className="bg-token-blue h-1.5 rounded-full"
                                          style={{ width: `${property.fundingProgress}%` }}
                                        ></div>
                                      </div>
                                    </div>

                                    <div className="flex justify-between text-xs">
                                      <span className="text-estate-100">Monthly Revenue:</span>
                                      <span>${property.monthlyRevenue.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Generate Reports */}
                      <div className="bg-base-200 rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Generate Reports</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaFileAlt className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Financial Report</h4>
                            <p className="text-xs text-estate-100">Revenue, expenses, income</p>
                          </div>

                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaUsers className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Investor Report</h4>
                            <p className="text-xs text-estate-100">Investor metrics and activity</p>
                          </div>

                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaBuilding className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Property Report</h4>
                            <p className="text-xs text-estate-100">Property performance and metrics</p>
                          </div>

                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaCoins className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Distribution Report</h4>
                            <p className="text-xs text-estate-100">Dividend history and projections</p>
                          </div>

                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaChartBar className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Performance Report</h4>
                            <p className="text-xs text-estate-100">ROI and performance metrics</p>
                          </div>

                          <div className="bg-base-300 p-4 rounded-lg text-center hover:bg-base-400 cursor-pointer">
                            <div className="rounded-full bg-estate-500/20 w-12 h-12 flex items-center justify-center mx-auto mb-3">
                              <FaExchangeAlt className="text-estate-300" />
                            </div>
                            <h4 className="font-medium mb-1">Market Report</h4>
                            <p className="text-xs text-estate-100">Secondary market activity</p>
                          </div>
                        </div>
                      </div>

                      {/* Recent Reports */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Recent Reports</h3>

                        <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="table w-full">
                              <thead className="bg-base-300">
                                <tr>
                                  <th className="text-estate-50">Report Name</th>
                                  <th className="text-estate-50">Generated On</th>
                                  <th className="text-estate-50">Type</th>
                                  <th className="text-estate-50">Properties</th>
                                  <th className="text-estate-50">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="hover:bg-base-300/50">
                                  <td>Q1 2025 Financial Report</td>
                                  <td>Apr 15, 2025</td>
                                  <td>Financial</td>
                                  <td>All Properties</td>
                                  <td>
                                    <div className="flex gap-1">
                                      <button className="btn btn-xs btn-primary">Download</button>
                                      <button className="btn btn-xs btn-ghost">View</button>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="hover:bg-base-300/50">
                                  <td>Luxury Downtown Performance</td>
                                  <td>Apr 10, 2025</td>
                                  <td>Property</td>
                                  <td>Luxury Downtown Apartment</td>
                                  <td>
                                    <div className="flex gap-1">
                                      <button className="btn btn-xs btn-primary">Download</button>
                                      <button className="btn btn-xs btn-ghost">View</button>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="hover:bg-base-300/50">
                                  <td>March 2025 Dividend Report</td>
                                  <td>Apr 2, 2025</td>
                                  <td>Distribution</td>
                                  <td>All Properties</td>
                                  <td>
                                    <div className="flex gap-1">
                                      <button className="btn btn-xs btn-primary">Download</button>
                                      <button className="btn btn-xs btn-ghost">View</button>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="hover:bg-base-300/50">
                                  <td>Q1 2025 Investor Report</td>
                                  <td>Apr 1, 2025</td>
                                  <td>Investor</td>
                                  <td>All Properties</td>
                                  <td>
                                    <div className="flex gap-1">
                                      <button className="btn btn-xs btn-primary">Download</button>
                                      <button className="btn btn-xs btn-ghost">View</button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Documents Tab */}
                  {activeTab === "documents" && (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-2xl font-semibold">Documents</h2>
                          <p className="text-estate-100">Manage property and legal documents</p>
                        </div>

                        <button className="btn btn-primary gap-2">
                          <FaFileAlt className="mr-1" /> Upload Document
                        </button>
                      </div>

                      {/* Document Categories */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Property Documents</p>
                              <p className="text-2xl font-bold">15</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaBuilding className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Legal Documents</p>
                              <p className="text-2xl font-bold">8</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaFileAlt className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Financial Documents</p>
                              <p className="text-2xl font-bold">12</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaChartLine className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-base-200 rounded-lg p-6 shadow-md">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-estate-100 text-sm">Token Documents</p>
                              <p className="text-2xl font-bold">6</p>
                            </div>
                            <div className="rounded-full bg-estate-500/20 p-3">
                              <FaCoins className="text-estate-300 text-xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Document List */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Property Documents */}
                        <div className="bg-base-200 rounded-lg shadow-lg p-6 lg:col-span-2">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Property Documents</h3>
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
                                Filter
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-lg w-40"
                              >
                                <li>
                                  <a>All Properties</a>
                                </li>
                                <li>
                                  <a>Luxury Downtown</a>
                                </li>
                                <li>
                                  <a>Commercial Office</a>
                                </li>
                                <li>
                                  <a>Residential Complex</a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {[
                              {
                                name: "Property Deed - Luxury Downtown",
                                type: "PDF",
                                date: "Jan 15, 2024",
                                size: "2.5 MB",
                              },
                              {
                                name: "Floor Plans - Commercial Office",
                                type: "PDF",
                                date: "Feb 10, 2024",
                                size: "4.8 MB",
                              },
                              {
                                name: "Appraisal Report - Residential Complex",
                                type: "PDF",
                                date: "Mar 5, 2024",
                                size: "3.2 MB",
                              },
                              {
                                name: "Property Inspection - Luxury Downtown",
                                type: "PDF",
                                date: "Jan 20, 2024",
                                size: "5.1 MB",
                              },
                              {
                                name: "Tenant Agreements - Commercial Office",
                                type: "PDF",
                                date: "Feb 15, 2024",
                                size: "1.7 MB",
                              },
                            ].map((doc, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-base-300 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className="bg-estate-500/20 p-2 rounded">
                                    <FaFileAlt className="text-estate-300" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{doc.name}</p>
                                    <p className="text-xs text-estate-100">
                                      {doc.type} • {doc.size} • Uploaded {doc.date}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <button className="btn btn-xs btn-ghost">View</button>
                                  <button className="btn btn-xs btn-ghost">Download</button>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button className="btn btn-outline btn-sm w-full mt-4">View All Documents</button>
                        </div>

                        {/* Upload New Document */}
                        <div className="bg-base-200 rounded-lg shadow-lg p-6">
                          <h3 className="text-xl font-semibold mb-4">Upload Document</h3>

                          <div className="space-y-4">
                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Document Title</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter document title"
                                className="input input-bordered w-full"
                              />
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Document Type</span>
                              </label>
                              <select className="select select-bordered w-full">
                                <option disabled selected>
                                  Select document type
                                </option>
                                <option>Property Document</option>
                                <option>Legal Document</option>
                                <option>Financial Document</option>
                                <option>Token Document</option>
                              </select>
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Related Property</span>
                              </label>
                              <select className="select select-bordered w-full">
                                <option disabled selected>
                                  Select property
                                </option>
                                <option>All Properties</option>
                                {mockIssuerData.properties.map(property => (
                                  <option key={property.id}>{property.name}</option>
                                ))}
                              </select>
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Visibility</span>
                              </label>
                              <select className="select select-bordered w-full">
                                <option>Private (Issuer Only)</option>
                                <option>Investors Only</option>
                                <option>Public</option>
                              </select>
                            </div>

                            <div className="bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg p-8 text-center">
                              <div className="mx-auto w-12 h-12 rounded-full bg-estate-500/20 flex items-center justify-center mb-2">
                                <FaFileAlt className="text-estate-300" />
                              </div>
                              <p className="text-sm mb-2">Drag and drop file here or click to browse</p>
                              <p className="text-xs text-estate-100">
                                Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                              </p>
                              <button className="btn btn-sm btn-outline mt-4">Select File</button>
                            </div>

                            <button className="btn btn-primary w-full">Upload Document</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Upcoming Events */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                    <div className="bg-base-200 rounded-lg shadow-md p-4">
                      <div className="space-y-4">
                        {mockIssuerData.upcomingSchedules.map(schedule => (
                          <div key={schedule.id} className="flex items-start gap-3 p-3 bg-base-300 rounded-lg">
                            <div className="rounded-full bg-token-purple bg-opacity-20 p-2 flex-shrink-0">
                              <FaCalendarAlt className="text-token-purple" />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                                <p className="font-medium">{schedule.event}</p>
                                <p className="text-sm text-estate-100">{schedule.date}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-sm text-estate-100">{schedule.property}</p>
                                {schedule.amount && <p className="font-medium">${schedule.amount.toLocaleString()}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Create New Property Button */}
                <div className="text-center">
                  <button onClick={() => setActiveTab("tokenization")} className="btn btn-primary btn-lg gap-2">
                    <FaPlus /> Tokenize New Property
                  </button>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === "properties" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold">My Properties</h2>
                    <p className="text-estate-100">Manage your real estate portfolio</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-outline">
                        <FaListAlt className="mr-2" />
                        Filter
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-lg w-52"
                      >
                        <li>
                          <a>All Properties</a>
                        </li>
                        <li>
                          <a>Active Properties</a>
                        </li>
                        <li>
                          <a>Funding Properties</a>
                        </li>
                        <li>
                          <a>Draft Properties</a>
                        </li>
                      </ul>
                    </div>

                    <button onClick={() => setActiveTab("tokenization")} className="btn btn-primary gap-2">
                      <FaPlus /> Add Property
                    </button>
                  </div>
                </div>

                {/* Property Cards */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Active Properties */}
                  {mockIssuerData.properties.map(property => (
                    <div key={property.id} className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/4 h-48 md:h-auto bg-estate-400">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-estate-100">Property Image</span>
                          </div>
                          <div
                            className="absolute top-4 right-4 px-2 py-1 bg-opacity-90 text-white text-xs rounded-full
                            ${property.status === 'Active' ? 'bg-token-green' : property.status === 'Funding' ? 'bg-token-blue' : 'bg-estate-200'}
                          "
                          >
                            {property.status}
                          </div>
                        </div>

                        <div className="p-6 md:w-3/4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-xl mb-1">{property.name}</h3>
                              <p className="text-estate-100 text-sm flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {property.location}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <span className="badge bg-token-purple text-white">{property.annualReturn}% APY</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-estate-100">Property Value</p>
                              <p className="font-semibold">${property.value.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Monthly Revenue</p>
                              <p className="font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Occupancy Rate</p>
                              <p className="font-semibold">{property.occupancyRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Token Price</p>
                              <p className="font-semibold">${property.tokenPrice}</p>
                            </div>
                          </div>

                          {property.status !== "Draft" && (
                            <div className="mb-4">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-estate-100">Funding Progress</span>
                                <span className="text-sm text-estate-100">{property.fundingProgress}%</span>
                              </div>
                              <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${property.status === "Active" ? "bg-token-green" : "bg-token-blue"}`}
                                  style={{ width: `${property.fundingProgress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1 text-xs text-estate-100">
                                <span>{property.tokensSold} tokens sold</span>
                                <span>{property.tokensIssued} tokens total</span>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            <Link href={`/dashboard/issuer/property/${property.id}`} className="btn btn-primary btn-sm">
                              Manage Property
                            </Link>
                            <button className="btn btn-outline btn-sm border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                              View Investors
                            </button>
                            <button className="btn btn-outline btn-sm border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                              Distribution
                            </button>
                            <button className="btn btn-outline btn-sm border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                              Reports
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Draft Properties */}
                  {mockIssuerData.drafts.map(draft => (
                    <div key={draft.id} className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative md:w-1/4 h-48 md:h-auto bg-estate-400">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-estate-100">Property Image</span>
                          </div>
                          <div className="absolute top-4 right-4 px-2 py-1 bg-estate-200 bg-opacity-90 text-white text-xs rounded-full">
                            Draft
                          </div>
                        </div>

                        <div className="p-6 md:w-3/4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-xl mb-1">{draft.name}</h3>
                              <p className="text-estate-100 text-sm flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> {draft.location}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-estate-100">Setup Completion</span>
                              <span className="text-sm text-estate-100">{draft.completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                              <div
                                className="bg-estate-200 h-2 rounded-full"
                                style={{ width: `${draft.completionPercentage}%` }}
                              ></div>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-estate-100">Estimated Value</p>
                            <p className="font-semibold">${draft.estimatedValue.toLocaleString()}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            <button className="btn btn-primary btn-sm">Continue Setup</button>
                            <button className="btn btn-outline btn-sm border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                              Edit Details
                            </button>
                            <button className="btn btn-outline btn-sm border-token-red text-token-red hover:bg-token-red hover:text-white">
                              Delete Draft
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tokenization Tab */}
            {activeTab === "tokenization" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold">Tokenization</h2>
                    <p className="text-estate-100">Create and manage property tokenization</p>
                  </div>

                  <button className="btn btn-primary gap-2">
                    <FaPlus /> New Property
                  </button>
                </div>

                {/* Create New Property Form */}
                <div className="bg-base-200 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Create New Tokenization Project</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-4">Property Details</h4>

                      <div className="space-y-4">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Property Name</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter property name"
                            className="input input-bordered w-full"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Property Address</span>
                          </label>
                          <input type="text" placeholder="Enter address" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Property Type</span>
                          </label>
                          <select className="select select-bordered w-full">
                            <option disabled selected>
                              Select property type
                            </option>
                            <option>Residential</option>
                            <option>Commercial</option>
                            <option>Industrial</option>
                            <option>Mixed-Use</option>
                            <option>Retail</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">Property Value ($)</span>
                            </label>
                            <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                          </div>

                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">Monthly Revenue ($)</span>
                            </label>
                            <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                          </div>
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Property Description</span>
                          </label>
                          <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Enter property description"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">Tokenization Details</h4>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">Number of Tokens</span>
                            </label>
                            <input type="text" placeholder="1000" className="input input-bordered w-full" />
                          </div>

                          <div className="form-control w-full">
                            <label className="label">
                              <span className="label-text">Token Price ($)</span>
                            </label>
                            <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                          </div>
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Minimum Investment ($)</span>
                          </label>
                          <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Expected Annual Return (%)</span>
                          </label>
                          <input type="text" placeholder="0.0" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Distribution Schedule</span>
                          </label>
                          <select className="select select-bordered w-full">
                            <option disabled selected>
                              Select schedule
                            </option>
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Semi-Annually</option>
                            <option>Annually</option>
                          </select>
                        </div>

                        <div className="form-control">
                          <label className="label cursor-pointer justify-start">
                            <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                            <span className="label-text">Early redemption after 5 years (with penalty)</span>
                          </label>
                        </div>

                        <div className="form-control">
                          <label className="label cursor-pointer justify-start">
                            <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                            <span className="label-text">Full redemption after 7 years</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button className="btn btn-outline border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400">
                      Save as Draft
                    </button>
                    <button className="btn btn-primary">Continue</button>
                  </div>
                </div>

                {/* Active Tokenization Projects */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Active Tokenization Projects</h3>

                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead className="bg-base-300">
                        <tr>
                          <th className="text-estate-50">Property</th>
                          <th className="text-estate-50">Location</th>
                          <th className="text-estate-50">Status</th>
                          <th className="text-estate-50">Progress</th>
                          <th className="text-estate-50">Value</th>
                          <th className="text-estate-50">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockIssuerData.properties.map(property => (
                          <tr key={property.id} className="hover:bg-base-300/50">
                            <td>{property.name}</td>
                            <td>{property.location}</td>
                            <td>
                              <span
                                className={`px-2 py-1 rounded-full text-xs
                                ${
                                  property.status === "Active"
                                    ? "bg-token-green bg-opacity-20 text-token-green"
                                    : property.status === "Funding"
                                      ? "bg-token-blue bg-opacity-20 text-token-blue"
                                      : "bg-estate-200 bg-opacity-20 text-estate-200"
                                }`}
                              >
                                {property.status}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2 max-w-24">
                                  <div
                                    className={`h-2 rounded-full ${property.status === "Active" ? "bg-token-green" : "bg-token-blue"}`}
                                    style={{ width: `${property.fundingProgress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{property.fundingProgress}%</span>
                              </div>
                            </td>
                            <td>${property.value.toLocaleString()}</td>
                            <td>
                              <div className="flex gap-1">
                                <button className="btn btn-xs btn-primary">Manage</button>
                                <button className="btn btn-xs btn-ghost">Edit</button>
                              </div>
                            </td>
                          </tr>
                        ))}

                        {mockIssuerData.drafts.map(draft => (
                          <tr key={draft.id} className="hover:bg-base-300/50">
                            <td>{draft.name}</td>
                            <td>{draft.location}</td>
                            <td>
                              <span className="px-2 py-1 rounded-full bg-estate-200 bg-opacity-20 text-estate-200 text-xs">
                                Draft
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2 max-w-24">
                                  <div
                                    className="bg-estate-200 h-2 rounded-full"
                                    style={{ width: `${draft.completionPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{draft.completionPercentage}%</span>
                              </div>
                            </td>
                            <td>${draft.estimatedValue.toLocaleString()}</td>
                            <td>
                              <div className="flex gap-1">
                                <button className="btn btn-xs btn-primary">Continue</button>
                                <button className="btn btn-xs btn-ghost">Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Investors Tab */}
            {activeTab === "investors" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold">Investors</h2>
                    <p className="text-estate-100">Manage your property investors</p>
                  </div>

                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="Search investors..." className="input input-bordered" />
                      <button className="btn btn-square">
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Investor Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Investors</p>
                        <p className="text-2xl font-bold">{mockIssuerData.investors.length}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaUsers className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Investment</p>
                        <p className="text-2xl font-bold">
                          $
                          {mockIssuerData.investors
                            .reduce((sum, investor) => sum + investor.investments, 0)
                            .toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaMoneyBillWave className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Avg. Investment</p>
                        <p className="text-2xl font-bold">
                          $
                          {Math.round(
                            mockIssuerData.investors.reduce((sum, investor) => sum + investor.investments, 0) /
                              mockIssuerData.investors.length,
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaChartLine className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Tokens</p>
                        <p className="text-2xl font-bold">
                          {mockIssuerData.investors
                            .reduce((sum, investor) => sum + investor.tokens, 0)
                            .toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaCoins className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investors Table */}
                <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead className="bg-base-300">
                        <tr>
                          <th className="text-estate-50">Investor</th>
                          <th className="text-estate-50">Join Date</th>
                          <th className="text-estate-50">Total Investment</th>
                          <th className="text-estate-50">Tokens</th>
                          <th className="text-estate-50">Properties</th>
                          <th className="text-estate-50">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockIssuerData.investors.map(investor => (
                          <tr key={investor.id} className="hover:bg-base-300/50">
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-estate-500 flex items-center justify-center text-white">
                                  <FaUser />
                                </div>
                                <div>
                                  <p className="font-medium">{investor.name}</p>
                                  <p className="text-xs text-estate-100">ID: {investor.id}</p>
                                </div>
                              </div>
                            </td>
                            <td>{investor.joinDate}</td>
                            <td>${investor.investments.toLocaleString()}</td>
                            <td>{investor.tokens}</td>
                            <td>
                              <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-token-green/20 flex items-center justify-center ring-2 ring-base-200 z-10">
                                  <FaBuilding className="text-token-green text-xs" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-token-blue/20 flex items-center justify-center ring-2 ring-base-200 z-0">
                                  <FaBuilding className="text-token-blue text-xs" />
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex gap-1">
                                <button className="btn btn-xs btn-primary">View</button>
                                <button className="btn btn-xs btn-ghost">Message</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Investor Distribution Chart */}
                <div className="bg-base-200 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Investor Distribution by Property</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-base-300 rounded-lg h-60 flex items-center justify-center">
                      <p className="text-estate-100">Investor Distribution Chart</p>
                    </div>

                    <div className="space-y-4">
                      {mockIssuerData.properties.map(property => (
                        <div key={property.id} className="bg-base-300 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{property.name}</h4>
                            <span className="text-xs text-estate-100">{property.tokensSold} tokens</span>
                          </div>

                          <div className="mb-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-estate-100">Invested</span>
                              <span className="text-estate-100">{property.investmentPercentage}%</span>
                            </div>
                            <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${property.status === "Active" ? "bg-token-green" : "bg-token-blue"}`}
                                style={{ width: `${property.investmentPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

// </div>
// </div>

// {/* Overlay for mobile navigation */}
// {mobileMenuOpen && (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//     onClick={() => setMobileMenuOpen(false)}
//   ></div>
// )}
// </main>
// <Footer />
// </>
// );
// }
