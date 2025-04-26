"use client";

import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaBuilding,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaCog,
  FaCoins,
  FaExchangeAlt,
  FaFileAlt,
  FaListAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSearch,
  FaSignOutAlt,
  FaTimesCircle,
  FaUser,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for the dashboard
const mockDashboardData = {
  platformStats: {
    totalProperties: 18,
    activeProperties: 12,
    pendingProperties: 6,
    totalInvestors: 258,
    totalAssetIssuers: 8,
    totalValueSecuritized: 28500000,
    totalTokensIssued: 285000,
    tokensSold: 224300,
    platformFees: 42500,
    pendingVerifications: 12,
  },

  transactionVolume: [
    { month: "Jan", primary: 320000, secondary: 240000 },
    { month: "Feb", primary: 400000, secondary: 139000 },
    { month: "Mar", primary: 550000, secondary: 221000 },
    { month: "Apr", primary: 490000, secondary: 250000 },
    { month: "May", primary: 620000, secondary: 310000 },
    { month: "Jun", primary: 590000, secondary: 290000 },
  ],

  userGrowth: [
    { month: "Jan", investors: 92, issuers: 3 },
    { month: "Feb", investors: 130, issuers: 4 },
    { month: "Mar", investors: 168, issuers: 5 },
    { month: "Apr", investors: 202, issuers: 6 },
    { month: "May", investors: 236, issuers: 7 },
    { month: "Jun", investors: 258, issuers: 8 },
  ],

  transactions: [
    {
      id: "TX-58294",
      type: "Primary Sale",
      property: "Luxury Downtown Apartment",
      user: "Shahla Nikbakht",
      amount: 5000,
      date: "Apr 21, 2025",
      status: "Completed",
    },
    {
      id: "TX-58293",
      type: "Distribution",
      property: "Commercial Office Building",
      user: "Multiple Recipients",
      amount: 12500,
      date: "Apr 19, 2025",
      status: "Completed",
    },
    {
      id: "TX-58292",
      type: "Secondary Sale",
      property: "Residential Complex",
      user: "David Miller",
      amount: 7500,
      date: "Apr 18, 2025",
      status: "Completed",
    },
    {
      id: "TX-58291",
      type: "Platform Fee",
      property: "Commercial Office Building",
      user: "System",
      amount: 625,
      date: "Apr 19, 2025",
      status: "Completed",
    },
    {
      id: "TX-58290",
      type: "Primary Sale",
      property: "Retail Plaza",
      user: "Jessica Davis",
      amount: 10000,
      date: "Apr 17, 2025",
      status: "Completed",
    },
    {
      id: "TX-58289",
      type: "Redemption",
      property: "Luxury Downtown Apartment",
      user: "Michael Brown",
      amount: 2500,
      date: "Apr 15, 2025",
      status: "Completed",
    },
    {
      id: "TX-58288",
      type: "Distribution",
      property: "Luxury Downtown Apartment",
      user: "Multiple Recipients",
      amount: 8750,
      date: "Apr 15, 2025",
      status: "Completed",
    },
    {
      id: "TX-58287",
      type: "Platform Fee",
      property: "Luxury Downtown Apartment",
      user: "System",
      amount: 437.5,
      date: "Apr 15, 2025",
      status: "Completed",
    },
  ],

  properties: [
    {
      id: 1,
      name: "Luxury Downtown Apartment",
      location: "New York, NY",
      issuer: "ABC Properties",
      tokenPrice: 115,
      progress: 80,
      status: "Active",
      value: 1500000,
      tokensSold: 800,
      fundingProgress: 80,
      apy: 5.2,
      performance: 8.5,
    },
    {
      id: 2,
      name: "Commercial Office Building",
      location: "Austin, TX",
      issuer: "ABC Properties",
      tokenPrice: 575,
      progress: 90,
      status: "Active",
      value: 3000000,
      tokensSold: 1800,
      fundingProgress: 90,
      apy: 6.5,
      performance: 12.4,
    },
    {
      id: 3,
      name: "Residential Complex",
      location: "Miami, FL",
      issuer: "ABC Properties",
      tokenPrice: 250,
      progress: 42,
      status: "Funding",
      value: 8500000,
      tokensSold: 2100,
      fundingProgress: 42,
      apy: 4.8,
      performance: 6.2,
    },
    {
      id: 4,
      name: "Urban Commercial Tower",
      location: "Chicago, IL",
      issuer: "Skyline Properties",
      tokenPrice: 320,
      progress: 0,
      status: "Pending",
      value: 4800000,
      tokensSold: 0,
      fundingProgress: 0,
      apy: 5.8,
      performance: 0,
    },
    {
      id: 5,
      name: "Retail Plaza",
      location: "Seattle, WA",
      issuer: "Metro Development Group",
      tokenPrice: 180,
      progress: 75,
      status: "Active",
      value: 2200000,
      tokensSold: 1650,
      fundingProgress: 75,
      apy: 5.5,
      performance: 9.1,
    },
  ],

  assetDistribution: [
    { name: "Residential", value: 45 },
    { name: "Commercial", value: 30 },
    { name: "Retail", value: 15 },
    { name: "Mixed Use", value: 10 },
  ],

  assetIssuers: [
    { id: 1, name: "ABC Properties", properties: 3, status: "Active", joinDate: "Sep 15, 2023" },
    { id: 2, name: "Skyline Properties", properties: 4, status: "Active", joinDate: "Oct 10, 2023" },
    { id: 3, name: "Metro Development Group", properties: 2, status: "Active", joinDate: "Apr 18, 2025" },
    { id: 4, name: "Urban Living", properties: 2, status: "Active", joinDate: "Dec 5, 2023" },
    { id: 5, name: "Eagle Investments", properties: 1, status: "Active", joinDate: "Jan 15, 2024" },
  ],

  pendingVerifications: [
    {
      id: 1,
      name: "Emily Johnson",
      type: "Investor",
      documentType: "ID Verification",
      submittedDate: "Apr 20, 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "Michael Smith",
      type: "Investor",
      documentType: "Proof of Address",
      submittedDate: "Apr 19, 2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "Clearwater Holdings",
      type: "Asset Issuer",
      documentType: "Business Verification",
      submittedDate: "Apr 18, 2025",
      status: "Pending",
    },
    {
      id: 4,
      name: "Jennifer Lee",
      type: "Investor",
      documentType: "ID Verification",
      submittedDate: "Apr 18, 2025",
      status: "Pending",
    },
    {
      id: 5,
      name: "David Williams",
      type: "Investor",
      documentType: "Accredited Investor",
      submittedDate: "Apr 17, 2025",
      status: "Pending",
    },
  ],
};

// Component for the platform dashboard
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Colors for charts
  const COLORS = ["#2563eb", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="flex min-h-screen bg-base-100">
      {/* Mobile menu toggle button - visible only on small screens */}
      <button
        className="fixed bottom-4 right-4 z-50 lg:hidden btn btn-circle btn-primary shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <FaListAlt />
      </button>

      {/* Sidebar Navigation - hidden on mobile unless toggled */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Dashboard User Info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
              <FaUserShield />
            </div>
            <div>
              <h2 className="font-semibold text-white">NikTokenize</h2>
              <p className="text-sm text-slate-300">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: <FaChartLine className="w-5 h-5" /> },
              { id: "properties", label: "Properties", icon: <FaBuilding className="w-5 h-5" /> },
              { id: "users", label: "Users", icon: <FaUsers className="w-5 h-5" /> },
              { id: "transactions", label: "Transactions", icon: <FaExchangeAlt className="w-5 h-5" /> },
              { id: "verifications", label: "Verifications", icon: <FaUserShield className="w-5 h-5" /> },
              { id: "reports", label: "Reports", icon: <FaChartBar className="w-5 h-5" /> },
              { id: "settings", label: "Settings", icon: <FaCog className="w-5 h-5" /> },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false); // Close mobile menu on navigation
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      activeTab === item.id
                        ? "bg-slate-700 text-white"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors">
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden">
        {/* Dashboard Header */}
        <div className="bg-slate-800 py-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {activeTab === "overview"
                    ? "Dashboard Overview"
                    : activeTab === "properties"
                      ? "Property Management"
                      : activeTab === "users"
                        ? "User Management"
                        : activeTab === "transactions"
                          ? "Transaction Management"
                          : activeTab === "verifications"
                            ? "Verification Management"
                            : activeTab === "reports"
                              ? "Platform Reports"
                              : activeTab === "settings"
                                ? "Platform Settings"
                                : "Admin Dashboard"}
                </h1>
                <p className="text-slate-300">Real Estate Tokenization Platform</p>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-circle btn-sm bg-slate-700 border-none text-white">
                  <FaBell />
                </button>
                <div className="hidden lg:block">
                  <button className="btn btn-circle btn-sm bg-slate-700 border-none text-white">
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
              {/* Platform Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Properties</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.totalProperties}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaBuilding className="text-blue-500 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm">
                      {mockDashboardData.platformStats.activeProperties} active,{" "}
                      {mockDashboardData.platformStats.pendingProperties} pending
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Users</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.platformStats.totalInvestors +
                          mockDashboardData.platformStats.totalAssetIssuers}
                      </p>
                    </div>
                    <div className="rounded-full bg-purple-500/20 p-3">
                      <FaUsers className="text-purple-500 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm">
                      {mockDashboardData.platformStats.totalInvestors} investors,{" "}
                      {mockDashboardData.platformStats.totalAssetIssuers} issuers
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Securitized Value</p>
                      <p className="text-2xl font-bold">
                        ${(mockDashboardData.platformStats.totalValueSecuritized / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <FaMoneyBillWave className="text-green-500 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm">
                      {Math.round(
                        (mockDashboardData.platformStats.tokensSold /
                          mockDashboardData.platformStats.totalTokensIssued) *
                          100,
                      )}
                      % tokens sold
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Platform Fees</p>
                      <p className="text-2xl font-bold">
                        ${mockDashboardData.platformStats.platformFees.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-full bg-amber-500/20 p-3">
                      <FaCoins className="text-amber-500 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-green-500">YTD total</span>
                  </div>
                </div>
              </div>

              {/* Action Required & Asset Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Action Required */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Action Required</h2>
                    <span className="badge bg-red-500 text-white">
                      {mockDashboardData.platformStats.pendingVerifications} Pending
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-red-500/20 p-2">
                          <FaUserShield className="text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium">Pending KYC Verifications</p>
                          <p className="text-sm text-slate-500">
                            {
                              mockDashboardData.pendingVerifications.filter(
                                v => v.documentType.includes("ID") || v.documentType.includes("Address"),
                              ).length
                            }{" "}
                            documents awaiting review
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("verifications")}
                        className="btn btn-sm btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        Review
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-500/20 p-2">
                          <FaBuilding className="text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">Property Approval</p>
                          <p className="text-sm text-slate-500">
                            {mockDashboardData.properties.filter(p => p.status === "Pending").length} properties pending
                            approval
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("properties")}
                        className="btn btn-sm btn-outline border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                      >
                        Review
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-slate-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-500/20 p-2">
                          <FaUser className="text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">Business Verifications</p>
                          <p className="text-sm text-slate-500">
                            {
                              mockDashboardData.pendingVerifications.filter(v => v.documentType.includes("Business"))
                                .length
                            }{" "}
                            issuer verifications pending
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab("verifications")}
                        className="btn btn-sm btn-outline border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>

                {/* Asset Distribution */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Asset Distribution</h2>
                    <button className="text-slate-500 hover:text-slate-700">View Details</button>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockDashboardData.assetDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockDashboardData.assetDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-100 p-3 rounded-lg text-center">
                      <p className="text-sm text-slate-500">Total Properties</p>
                      <p className="font-semibold">{mockDashboardData.platformStats.totalProperties}</p>
                    </div>
                    <div className="bg-slate-100 p-3 rounded-lg text-center">
                      <p className="text-sm text-slate-500">Funding Rate</p>
                      <p className="font-semibold">78.5%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Volume Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Transaction Volume</h2>
                  <div className="flex gap-1">
                    <button className="btn btn-xs">Weekly</button>
                    <button className="btn btn-xs btn-ghost">Monthly</button>
                    <button className="btn btn-xs btn-ghost">Yearly</button>
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={mockDashboardData.transactionVolume}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={value => [`$${value.toLocaleString()}`, "Volume"]} />
                      <Legend />
                      <Bar dataKey="primary" name="Primary Sales" fill="#2563eb" />
                      <Bar dataKey="secondary" name="Secondary Market" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Primary Sales (YTD)</p>
                    <p className="font-semibold">$3.2M</p>
                    <p className="text-xs text-green-500">↑ 12.5%</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Secondary Sales (YTD)</p>
                    <p className="font-semibold">$985K</p>
                    <p className="text-xs text-green-500">↑ 24.8%</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Platform Fees (YTD)</p>
                    <p className="font-semibold">$42.5K</p>
                    <p className="text-xs text-green-500">↑ 15.3%</p>
                  </div>
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">User Growth</h2>
                  <button className="text-slate-500 hover:text-slate-700" onClick={() => setActiveTab("users")}>
                    View All Users
                  </button>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={mockDashboardData.userGrowth}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="investors"
                        name="Investors"
                        stroke="#2563eb"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="issuers" name="Asset Issuers" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Total Investors</p>
                    <p className="font-semibold">{mockDashboardData.platformStats.totalInvestors}</p>
                    <p className="text-xs text-green-500">↑ 18.4% MoM</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Asset Issuers</p>
                    <p className="font-semibold">{mockDashboardData.platformStats.totalAssetIssuers}</p>
                    <p className="text-xs text-green-500">↑ 14.3% MoM</p>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                  <button onClick={() => setActiveTab("transactions")} className="text-slate-500 hover:text-slate-700">
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Transaction ID</th>
                        <th className="text-slate-700">Type</th>
                        <th className="text-slate-700">Property</th>
                        <th className="text-slate-700">User</th>
                        <th className="text-slate-700">Amount</th>
                        <th className="text-slate-700">Date</th>
                        <th className="text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.transactions.slice(0, 5).map((transaction, index) => (
                        <tr key={index} className="hover:bg-slate-100/50">
                          <td>{transaction.id}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.property}</td>
                          <td>{transaction.user}</td>
                          <td>${transaction.amount.toLocaleString()}</td>
                          <td>{transaction.date}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === "properties" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Properties Management</h2>
                  <p className="text-slate-500">Manage all properties on the platform</p>
                </div>

                <div className="flex gap-2">
                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="Search properties..." className="input input-bordered" />
                      <button className="btn btn-square bg-slate-800 border-slate-800">
                        <FaSearch className="text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                      <FaListAlt className="mr-2" />
                      Filter
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52">
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
                        <a>Pending Approval</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Properties Status Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Properties</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.totalProperties}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaBuilding className="text-blue-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Active Properties</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.activeProperties}</p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <FaCheckCircle className="text-green-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Funding Properties</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.properties.filter(p => p.status === "Funding").length}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaCoins className="text-blue-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Pending Approval</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.properties.filter(p => p.status === "Pending").length}
                      </p>
                    </div>
                    <div className="rounded-full bg-amber-500/20 p-3">
                      <FaTimesCircle className="text-amber-500 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Approval Properties */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Pending Approval</h2>

                {mockDashboardData.properties.filter(p => p.status === "Pending").length > 0 ? (
                  <div className="space-y-4">
                    {mockDashboardData.properties
                      .filter(p => p.status === "Pending")
                      .map(property => (
                        <div key={property.id} className="bg-slate-100 rounded-lg p-4">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{property.name}</h3>
                              <p className="text-sm text-slate-500">{property.location}</p>
                              <p className="text-sm mt-1">Issuer: {property.issuer}</p>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                              <div>
                                <p className="text-xs text-slate-500">Token Price</p>
                                <p className="font-semibold">${property.tokenPrice}</p>
                              </div>

                              <div>
                                <p className="text-xs text-slate-500">Submission Date</p>
                                <p className="font-semibold">Apr 18, 2025</p>
                              </div>

                              <div className="flex gap-2">
                                <button className="btn btn-sm btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                  Approve
                                </button>
                                <button className="btn btn-sm btn-outline">Reject</button>
                                <button className="btn btn-sm btn-ghost">View Details</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-slate-100 rounded-lg">
                    <p className="text-slate-500">No properties pending approval</p>
                  </div>
                )}
              </div>

              {/* All Properties */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 pb-0">
                  <h2 className="text-xl font-semibold mb-4">All Properties</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Property</th>
                        <th className="text-slate-700">Location</th>
                        <th className="text-slate-700">Issuer</th>
                        <th className="text-slate-700">Token Price</th>
                        <th className="text-slate-700">Funding</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.properties.map(property => (
                        <tr key={property.id} className="hover:bg-slate-100/50">
                          <td>{property.name}</td>
                          <td>{property.location}</td>
                          <td>{property.issuer}</td>
                          <td>${property.tokenPrice}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-slate-300 rounded-full h-2 max-w-24">
                                <div
                                  className={`h-2 rounded-full ${
                                    property.status === "Active"
                                      ? "bg-green-500"
                                      : property.status === "Funding"
                                        ? "bg-blue-500"
                                        : "bg-amber-500"
                                  }`}
                                  style={{ width: `${property.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{property.progress}%</span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                property.status === "Active"
                                  ? "bg-green-500/20 text-green-600"
                                  : property.status === "Funding"
                                    ? "bg-blue-500/20 text-blue-600"
                                    : "bg-amber-500/20 text-amber-600"
                              }`}
                            >
                              {property.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                View
                              </button>
                              <button className="btn btn-xs btn-ghost">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    Showing 1-{mockDashboardData.properties.length} of {mockDashboardData.platformStats.totalProperties}{" "}
                    properties
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline">Previous</button>
                    <button className="btn btn-sm btn-outline">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Transaction Management</h2>
                  <p className="text-slate-500">Monitor and manage platform transactions</p>
                </div>

                <div className="flex gap-2">
                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="Search transactions..." className="input input-bordered" />
                      <button className="btn btn-square bg-slate-800 border-slate-800">
                        <FaSearch className="text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                      <FaListAlt className="mr-2" />
                      Filter
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52">
                      <li>
                        <a>All Transactions</a>
                      </li>
                      <li>
                        <a>Primary Sales</a>
                      </li>
                      <li>
                        <a>Secondary Sales</a>
                      </li>
                      <li>
                        <a>Distributions</a>
                      </li>
                      <li>
                        <a>Platform Fees</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Transaction Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Transaction Volume</p>
                      <p className="text-2xl font-bold">$4.8M</p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaExchangeAlt className="text-blue-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Primary Sales</p>
                      <p className="text-2xl font-bold">$3.2M</p>
                    </div>
                    <div className="rounded-full bg-purple-500/20 p-3">
                      <FaCoins className="text-purple-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Secondary Sales</p>
                      <p className="text-2xl font-bold">$985K</p>
                    </div>
                    <div className="rounded-full bg-indigo-500/20 p-3">
                      <FaExchangeAlt className="text-indigo-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Platform Fees</p>
                      <p className="text-2xl font-bold">$42.5K</p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <FaMoneyBillWave className="text-green-500 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Transaction ID</th>
                        <th className="text-slate-700">Type</th>
                        <th className="text-slate-700">Property</th>
                        <th className="text-slate-700">User</th>
                        <th className="text-slate-700">Amount</th>
                        <th className="text-slate-700">Date</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.transactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-slate-100/50">
                          <td>{transaction.id}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.property}</td>
                          <td>{transaction.user}</td>
                          <td>${transaction.amount.toLocaleString()}</td>
                          <td>{transaction.date}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs">
                              {transaction.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                View
                              </button>
                              <button className="btn btn-xs btn-ghost">Export</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="text-sm text-slate-500">Showing 1-8 of 248 transactions</div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline">Previous</button>
                    <button className="btn btn-sm btn-outline">Next</button>
                  </div>
                </div>
              </div>

              {/* Transaction Volume Chart */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Transaction Volume</h2>

                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={mockDashboardData.transactionVolume}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={value => [`${value.toLocaleString()}`, "Volume"]} />
                      <Legend />
                      <Bar dataKey="primary" name="Primary Sales" fill="#2563eb" />
                      <Bar dataKey="secondary" name="Secondary Market" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Primary Sales (YTD)</p>
                    <p className="font-semibold">$3.2M</p>
                    <p className="text-xs text-green-500">↑ 12.5%</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Secondary Sales (YTD)</p>
                    <p className="font-semibold">$985K</p>
                    <p className="text-xs text-green-500">↑ 24.8%</p>
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg text-center">
                    <p className="text-sm text-slate-500">Platform Fees (YTD)</p>
                    <p className="font-semibold">$42.5K</p>
                    <p className="text-xs text-green-500">↑ 15.3%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">User Management</h2>
                  <p className="text-slate-500">Manage all platform users</p>
                </div>

                <div className="flex gap-2">
                  <div className="form-control">
                    <div className="input-group">
                      <input type="text" placeholder="Search users..." className="input input-bordered" />
                      <button className="btn btn-square bg-slate-800 border-slate-800">
                        <FaSearch className="text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                      <FaListAlt className="mr-2" />
                      Filter
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52">
                      <li>
                        <a>All Users</a>
                      </li>
                      <li>
                        <a>Investors</a>
                      </li>
                      <li>
                        <a>Asset Issuers</a>
                      </li>
                      <li>
                        <a>Admins</a>
                      </li>
                      <li>
                        <a>Pending Verification</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* User Type Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Total Users</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.platformStats.totalInvestors +
                          mockDashboardData.platformStats.totalAssetIssuers}
                      </p>
                    </div>
                    <div className="rounded-full bg-slate-500/20 p-3">
                      <FaUsers className="text-slate-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Investors</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.totalInvestors}</p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaUser className="text-blue-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Asset Issuers</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.totalAssetIssuers}</p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <FaBuilding className="text-green-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Pending Verification</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.pendingVerifications}</p>
                    </div>
                    <div className="rounded-full bg-amber-500/20 p-3">
                      <FaUserShield className="text-amber-500 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Issuers */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Asset Issuers</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Issuer Name</th>
                        <th className="text-slate-700">Business Type</th>
                        <th className="text-slate-700">Properties</th>
                        <th className="text-slate-700">Join Date</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.assetIssuers.map(issuer => (
                        <tr key={issuer.id} className="hover:bg-slate-100/50">
                          <td>{issuer.name}</td>
                          <td>Real Estate Investment</td>
                          <td>{issuer.properties}</td>
                          <td>{issuer.joinDate}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs">
                              {issuer.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                View
                              </button>
                              <button className="btn btn-xs btn-ghost">Edit</button>
                              <button className="btn btn-xs btn-ghost">Properties</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Investors */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Investors</h2>
                  <button className="btn btn-sm btn-outline">View All Investors</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Name</th>
                        <th className="text-slate-700">Email</th>
                        <th className="text-slate-700">Join Date</th>
                        <th className="text-slate-700">Properties</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          name: "Shahla Nikbakht",
                          email: "alex.johnson@example.com",
                          date: "Apr 21, 2025",
                          properties: 2,
                          status: "Active",
                        },
                        {
                          id: 2,
                          name: "Emily Williams",
                          email: "emily.williams@example.com",
                          date: "Apr 20, 2025",
                          properties: 0,
                          status: "Pending",
                        },
                        {
                          id: 3,
                          name: "Michael Brown",
                          email: "michael.brown@example.com",
                          date: "Apr 18, 2025",
                          properties: 1,
                          status: "Active",
                        },
                        {
                          id: 4,
                          name: "Jessica Davis",
                          email: "jessica.davis@example.com",
                          date: "Apr 15, 2025",
                          properties: 3,
                          status: "Active",
                        },
                        {
                          id: 5,
                          name: "David Miller",
                          email: "david.miller@example.com",
                          date: "Apr 10, 2025",
                          properties: 2,
                          status: "Active",
                        },
                      ].map(investor => (
                        <tr key={investor.id} className="hover:bg-slate-100/50">
                          <td>{investor.name}</td>
                          <td>{investor.email}</td>
                          <td>{investor.date}</td>
                          <td>{investor.properties}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                investor.status === "Active"
                                  ? "bg-green-500/20 text-green-600"
                                  : "bg-amber-500/20 text-amber-600"
                              }`}
                            >
                              {investor.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                View
                              </button>
                              <button className="btn btn-xs btn-ghost">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 flex justify-between items-center">
                  <div className="text-sm text-slate-500">
                    Showing 1-5 of {mockDashboardData.platformStats.totalInvestors} investors
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline">Previous</button>
                    <button className="btn btn-sm btn-outline">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verifications Tab */}
          {activeTab === "verifications" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Verification Management</h2>
                  <p className="text-slate-500">Review and process identity and business verifications</p>
                </div>

                <div className="flex gap-2">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                      <FaListAlt className="mr-2" />
                      Filter
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52">
                      <li>
                        <a>All Verifications</a>
                      </li>
                      <li>
                        <a>Pending</a>
                      </li>
                      <li>
                        <a>Approved</a>
                      </li>
                      <li>
                        <a>Rejected</a>
                      </li>
                      <li>
                        <a>ID Verification</a>
                      </li>
                      <li>
                        <a>Address Verification</a>
                      </li>
                      <li>
                        <a>Business Verification</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Verification Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Pending Verifications</p>
                      <p className="text-2xl font-bold">{mockDashboardData.platformStats.pendingVerifications}</p>
                    </div>
                    <div className="rounded-full bg-amber-500/20 p-3">
                      <FaUserShield className="text-amber-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">ID Verifications</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.pendingVerifications.filter(v => v.documentType.includes("ID")).length}
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-500/20 p-3">
                      <FaUser className="text-blue-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Address Verifications</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.pendingVerifications.filter(v => v.documentType.includes("Address")).length}
                      </p>
                    </div>
                    <div className="rounded-full bg-purple-500/20 p-3">
                      <FaMapMarkerAlt className="text-purple-500 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Business Verifications</p>
                      <p className="text-2xl font-bold">
                        {mockDashboardData.pendingVerifications.filter(v => v.documentType.includes("Business")).length}
                      </p>
                    </div>
                    <div className="rounded-full bg-green-500/20 p-3">
                      <FaBuilding className="text-green-500 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Verifications */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Name</th>
                        <th className="text-slate-700">Type</th>
                        <th className="text-slate-700">Document Type</th>
                        <th className="text-slate-700">Submitted</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.pendingVerifications.map(verification => (
                        <tr key={verification.id} className="hover:bg-slate-100/50">
                          <td>{verification.name}</td>
                          <td>{verification.type}</td>
                          <td>{verification.documentType}</td>
                          <td>{verification.submittedDate}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs">
                              {verification.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                Review
                              </button>
                              <button className="btn btn-xs btn-ghost text-green-600">Approve</button>
                              <button className="btn btn-xs btn-ghost text-red-600">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verification Review */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Verification Review</h2>

                {/* Selected Verification for Review */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-slate-100 p-6 rounded-lg mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Emily Johnson</h3>
                          <p className="text-sm text-slate-500">ID Verification</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs">Pending</span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Submitted:</span>
                          <span>Apr 20, 2025</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Document Type:</span>
                          <span>Passport</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Country:</span>
                          <span>United States</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date of Birth:</span>
                          <span>Jun 15, 1985</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Expiry Date:</span>
                          <span>Sep 22, 2029</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700 flex-1">
                          Approve
                        </button>
                        <button className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1">
                          Reject
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-100 p-6 rounded-lg">
                      <h3 className="font-semibold mb-3">Add Verification Note</h3>

                      <div className="form-control mb-4">
                        <textarea
                          className="textarea textarea-bordered h-24"
                          placeholder="Add notes about this verification"
                        ></textarea>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                          <span className="label-text">Send message to user</span>
                        </label>
                      </div>

                      <button className="btn btn-outline w-full mt-4">Save Note</button>
                    </div>
                  </div>

                  <div>
                    <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg h-80 flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-300/50 flex items-center justify-center mb-2">
                          <FaFileAlt className="text-slate-500" />
                        </div>
                        <p className="font-medium mb-1">ID Document Preview</p>
                        <p className="text-sm text-slate-500">Passport - Front Side</p>
                      </div>
                    </div>

                    <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-slate-300/50 flex items-center justify-center mb-2">
                          <FaFileAlt className="text-slate-500" />
                        </div>
                        <p className="font-medium mb-1">ID Document Preview</p>
                        <p className="text-sm text-slate-500">Passport - Back Side</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Platform Settings</h2>
                  <p className="text-slate-500">Configure platform parameters and policies</p>
                </div>
              </div>

              {/* Platform Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Settings */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">General Settings</h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Platform Name</span>
                          </label>
                          <input type="text" className="input input-bordered w-full" value="NikTokenize" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Support Email</span>
                          </label>
                          <input type="email" className="input input-bordered w-full" value="support@NikTokenize.com" />
                        </div>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Platform Description</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-24"
                          value="NikTokenize is a real estate tokenization platform that enables fractional investment in premium properties."
                        ></textarea>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Enable user registration</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Require email verification</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Require KYC verification for investors</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Enable secondary market</span>
                        </label>
                      </div>

                      <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                        Save General Settings
                      </button>
                    </div>
                  </div>

                  {/* Fee Settings */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Fee Settings</h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Primary Market Fee (%)</span>
                          </label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            defaultValue="1.5"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Secondary Market Fee (%)</span>
                          </label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            defaultValue="0.5"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Distribution Fee (%)</span>
                          </label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            defaultValue="0.2"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Early Redemption Fee (%)</span>
                          </label>
                          <input
                            type="number"
                            className="input input-bordered w-full"
                            defaultValue="10.0"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-medium text-blue-800 mb-2">Fee Configuration Notes</h3>
                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                          <li>Primary Market Fee: Applied when tokens are initially sold to investors</li>
                          <li>Secondary Market Fee: Applied to transactions on the secondary market</li>
                          <li>Distribution Fee: Applied to dividend distributions to investors</li>
                          <li>Early Redemption Fee: Applied when investors redeem tokens before full vesting period</li>
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                          Save Fee Settings
                        </button>
                        <button className="btn btn-outline">Reset to Defaults</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance & Security Settings */}
                <div>
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Blockchain Settings</h2>

                    <div className="space-y-6">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Network</span>
                        </label>
                        <select className="select select-bordered w-full">
                          <option>Ethereum Mainnet</option>
                          <option>Ethereum Sepolia</option>
                          <option>Polygon</option>
                        </select>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Platform Operator Address</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full font-mono text-sm"
                          value="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                        />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Gas Price Strategy</span>
                        </label>
                        <select className="select select-bordered w-full">
                          <option>Standard</option>
                          <option>Fast</option>
                          <option>Custom</option>
                        </select>
                      </div>

                      <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700 w-full">
                        Update Blockchain Settings
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Compliance Settings</h2>

                    <div className="space-y-6">
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
                        <p className="text-amber-800 text-sm">
                          Changes to compliance settings may affect existing investors and transactions. Please review
                          carefully.
                        </p>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">KYC Requirements</span>
                        </label>
                        <select className="select select-bordered w-full">
                          <option>Standard</option>
                          <option>Enhanced</option>
                          <option>Institutional</option>
                        </select>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Restricted Countries</span>
                        </label>
                        <select className="select select-bordered w-full" multiple size="4">
                          <option>United States</option>
                          <option>China</option>
                          <option>Russia</option>
                          <option>Iran</option>
                          <option>North Korea</option>
                        </select>
                        <label className="label">
                          <span className="label-text-alt">Hold Ctrl/Cmd to select multiple</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Enforce transfer restrictions</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="toggle toggle-primary mr-2" defaultChecked />
                          <span className="label-text">Require accredited investor status</span>
                        </label>
                      </div>

                      <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700 w-full">
                        Update Compliance Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vesting & Dividend Settings */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Vesting & Dividend Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Early Redemption Period (Years)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full" defaultValue="5" min="1" max="20" />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Redemption Period (Years)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full" defaultValue="7" min="1" max="30" />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Default Dividend Rate (%)</span>
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      defaultValue="5.0"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Dividend Payment Frequency</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Semi-Annual</option>
                      <option>Annual</option>
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Minimum Redemption Amount (Tokens)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full" defaultValue="10" min="1" />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Redemption Processing Time (Days)</span>
                    </label>
                    <input type="number" className="input input-bordered w-full" defaultValue="3" min="1" max="30" />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200 my-6">
                  <h3 className="font-medium text-green-800 mb-2">About Vesting Periods</h3>
                  <p className="text-sm text-green-700">
                    Early redemption allows investors to redeem tokens before the full vesting period with a penalty.
                    Full redemption allows redemption without penalty. These settings apply to new properties added to
                    the platform.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                    Save Settings
                  </button>
                  <button className="btn btn-outline">Restore Defaults</button>
                </div>
              </div>

              {/* Admin Users */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Admin Users</h2>
                  <button className="btn btn-sm btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                    Add Admin
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Name</th>
                        <th className="text-slate-700">Email</th>
                        <th className="text-slate-700">Role</th>
                        <th className="text-slate-700">Last Login</th>
                        <th className="text-slate-700">Status</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          name: "Admin User",
                          email: "admin@NikTokenize.com",
                          role: "Super Admin",
                          lastLogin: "Apr 23, 2025",
                          status: "Active",
                        },
                        {
                          id: 2,
                          name: "John Smith",
                          email: "john.smith@NikTokenize.com",
                          role: "Property Admin",
                          lastLogin: "Apr 22, 2025",
                          status: "Active",
                        },
                        {
                          id: 3,
                          name: "Sarah Johnson",
                          email: "sarah.j@NikTokenize.com",
                          role: "User Admin",
                          lastLogin: "Apr 20, 2025",
                          status: "Active",
                        },
                      ].map(admin => (
                        <tr key={admin.id} className="hover:bg-slate-100/50">
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>
                          <td>{admin.role}</td>
                          <td>{admin.lastLogin}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs">
                              {admin.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-ghost">Edit</button>
                              <button className="btn btn-xs btn-ghost">Reset Password</button>
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

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Platform Reports</h2>
                  <p className="text-slate-500">Generate and view platform performance reports</p>
                </div>

                <div className="flex gap-2">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-outline">
                      <FaCalendarAlt className="mr-2" />
                      Last 30 Days
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52">
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
                        <a>Year to Date</a>
                      </li>
                      <li>
                        <a>All Time</a>
                      </li>
                    </ul>
                  </div>

                  <button className="btn btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                    <FaFileAlt className="mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Report Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Transaction Volume Chart */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">Transaction Volume</h2>
                      <div className="flex gap-1">
                        <button className="btn btn-xs bg-slate-800 text-white border-slate-800">Weekly</button>
                        <button className="btn btn-xs btn-ghost">Monthly</button>
                        <button className="btn btn-xs btn-ghost">Yearly</button>
                      </div>
                    </div>

                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={500}
                          height={300}
                          data={mockDashboardData.transactionVolume}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={value => [`${value.toLocaleString()}`, "Volume"]} />
                          <Legend />
                          <Bar dataKey="primary" name="Primary Sales" fill="#2563eb" />
                          <Bar dataKey="secondary" name="Secondary Market" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-100 p-3 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Total Volume</p>
                        <p className="font-semibold">$4.8M</p>
                        <p className="text-xs text-green-500">↑ 15.2%</p>
                      </div>
                      <div className="bg-slate-100 p-3 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Avg. Transaction</p>
                        <p className="font-semibold">$5,280</p>
                        <p className="text-xs text-green-500">↑ 3.8%</p>
                      </div>
                      <div className="bg-slate-100 p-3 rounded-lg text-center">
                        <p className="text-sm text-slate-500">Transaction Count</p>
                        <p className="font-semibold">912</p>
                        <p className="text-xs text-green-500">↑ 9.5%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Metrics */}
                <div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Platform Metrics</h2>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-slate-500">New Users</span>
                          <span>32 (↑ 12%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-slate-500">Token Sales</span>
                          <span>12,500 (↑ 8%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-slate-500">Active Investors</span>
                          <span>215 (↑ 15%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "83%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-slate-500">Platform Fees</span>
                          <span>$42,500 (↑ 18%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="h-64 mt-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          width={500}
                          height={300}
                          data={mockDashboardData.userGrowth}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="investors"
                            name="Investors"
                            stroke="#2563eb"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Performance */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Property Performance</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Property</th>
                        <th className="text-slate-700">Location</th>
                        <th className="text-slate-700">Total Value</th>
                        <th className="text-slate-700">Tokens Sold</th>
                        <th className="text-slate-700">Funding %</th>
                        <th className="text-slate-700">APY</th>
                        <th className="text-slate-700">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDashboardData.properties.map(property => (
                        <tr key={property.id} className="hover:bg-slate-100/50">
                          <td>{property.name}</td>
                          <td>{property.location}</td>
                          <td>${property.value.toLocaleString()}</td>
                          <td>{property.tokensSold}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-slate-200 rounded-full h-2 max-w-24">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${property.fundingProgress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{property.fundingProgress}%</span>
                            </div>
                          </td>
                          <td>{property.apy}%</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                property.performance > 10
                                  ? "bg-green-500/20 text-green-600"
                                  : property.performance > 5
                                    ? "bg-blue-500/20 text-blue-600"
                                    : "bg-amber-500/20 text-amber-600"
                              }`}
                            >
                              ↑ {property.performance}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Generated Reports */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Generated Reports</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-slate-700">Report Name</th>
                        <th className="text-slate-700">Generated On</th>
                        <th className="text-slate-700">Type</th>
                        <th className="text-slate-700">Period</th>
                        <th className="text-slate-700">Generated By</th>
                        <th className="text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: 1,
                          name: "Platform Performance - April 2025",
                          date: "Apr 21, 2025",
                          type: "Platform",
                          period: "Monthly",
                          user: "Admin User",
                        },
                        {
                          id: 2,
                          name: "Q1 2025 Financial Report",
                          date: "Apr 15, 2025",
                          type: "Financial",
                          period: "Quarterly",
                          user: "Admin User",
                        },
                        {
                          id: 3,
                          name: "User Growth Analysis - Q1 2025",
                          date: "Apr 10, 2025",
                          type: "User",
                          period: "Quarterly",
                          user: "John Smith",
                        },
                        {
                          id: 4,
                          name: "Property Performance Report",
                          date: "Apr 5, 2025",
                          type: "Property",
                          period: "Monthly",
                          user: "Admin User",
                        },
                        {
                          id: 5,
                          name: "Transaction Volume - March 2025",
                          date: "Apr 1, 2025",
                          type: "Transaction",
                          period: "Monthly",
                          user: "Admin User",
                        },
                      ].map(report => (
                        <tr key={report.id} className="hover:bg-slate-100/50">
                          <td>{report.name}</td>
                          <td>{report.date}</td>
                          <td>{report.type}</td>
                          <td>{report.period}</td>
                          <td>{report.user}</td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-primary bg-slate-800 border-slate-800 hover:bg-slate-700">
                                Download
                              </button>
                              <button className="btn btn-xs btn-ghost">View</button>
                              <button className="btn btn-xs btn-ghost">Share</button>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
