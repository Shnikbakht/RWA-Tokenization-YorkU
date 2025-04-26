"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import DashboardSelector from "../../../../components/DashboardSelector";
import { Footer } from "../../../../components/Footer";
import { Header } from "../../../../components/Header";
import {
  FaArrowLeft,
  FaBell,
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaCheckCircle,
  FaCog,
  FaCoins,
  FaEdit,
  FaExchangeAlt,
  FaFileAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

// Mock data for a specific property
const mockProperty = {
  id: 1,
  name: "Luxury Downtown Apartment",
  location: "123 Financial District, New York, NY",
  description:
    "A prestigious luxury apartment building located in the heart of Manhattan's Financial District. This Class A building features 24/7 concierge, state-of-the-art fitness center, rooftop garden, and high-end finishes throughout all units.",
  status: "Active",
  image: "/images/property1.jpg",
  yearBuilt: 2018,
  propertyType: "Residential",
  squareFeet: 180000,
  units: 200,
  propertyManager: "Urban Living Management",
  occupancyRate: 94,
  monthlyRevenue: 25000,
  monthlyExpenses: 8500,
  tokenDetails: {
    tokenPrice: 115,
    tokensIssued: 1000,
    tokensSold: 800,
    fundingProgress: 80,
    minInvestment: 500,
    annualReturn: 5.2,
    distributionSchedule: "Quarterly",
    earlyRedemption: 5, // years
    fullRedemption: 7, // years
  },
  financials: {
    propertyValue: 1500000,
    monthlyRentalIncome: 25000,
    operatingExpenses: 8500,
    netOperatingIncome: 16500,
    capRate: 5.4,
    lastAppraisalDate: "Dec 15, 2024",
    nextAppraisalDate: "Dec 15, 2025",
  },
  investors: [
    { id: 1, name: "Shahla Nikbakht", tokens: 150, joinDate: "Oct 10, 2024" },
    { id: 2, name: "Sarah Williams", tokens: 250, joinDate: "Oct 15, 2024" },
    { id: 3, name: "Michael Brown", tokens: 100, joinDate: "Oct 18, 2024" },
    { id: 4, name: "Jessica Davis", tokens: 200, joinDate: "Oct 20, 2024" },
    { id: 5, name: "David Miller", tokens: 100, joinDate: "Oct 22, 2024" },
  ],
  distributions: [
    { id: 1, date: "Jan 15, 2025", amount: 8750, status: "Completed" },
    { id: 2, date: "Oct 15, 2024", amount: 8750, status: "Completed" },
    { id: 3, date: "Jul 15, 2024", amount: 8750, status: "Completed" },
    { id: 4, date: "Apr 15, 2024", amount: 8750, status: "Completed" },
    { id: 5, date: "May 15, 2025", amount: 9000, status: "Scheduled" },
  ],
  documents: [
    { id: 1, name: "Property Deed", type: "Legal", date: "Sep 15, 2023", size: "2.5 MB" },
    { id: 2, name: "Property Appraisal", type: "Financial", date: "Dec 15, 2024", size: "3.8 MB" },
    { id: 3, name: "Floor Plans", type: "Property", date: "Sep 20, 2023", size: "5.2 MB" },
    { id: 4, name: "Tenant Agreements", type: "Legal", date: "Jan 10, 2024", size: "1.7 MB" },
    { id: 5, name: "Tokenization Agreement", type: "Token", date: "Sep 25, 2023", size: "1.2 MB" },
    { id: 6, name: "Q1 2025 Financial Report", type: "Financial", date: "Apr 15, 2025", size: "2.1 MB" },
  ],
  maintenanceIssues: [
    { id: 1, title: "Elevator Maintenance", status: "Scheduled", date: "May 20, 2025", priority: "Medium", cost: 1500 },
    { id: 2, title: "HVAC System Repair", status: "Completed", date: "Mar 15, 2025", priority: "High", cost: 3200 },
    { id: 3, title: "Lobby Renovation", status: "In Progress", date: "Apr 1, 2025", priority: "Low", cost: 7500 },
  ],
};

export default function PropertyDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Tabs for property detail
  const tabs = [
    { id: "overview", label: "Overview", icon: <FaBuilding /> },
    { id: "financials", label: "Financials", icon: <FaChartLine /> },
    { id: "investors", label: "Investors", icon: <FaUsers /> },
    { id: "distributions", label: "Distributions", icon: <FaCoins /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt /> },
    { id: "maintenance", label: "Maintenance", icon: <FaCog /> },
  ];

  return (
    <>
      <main className="min-h-screen bg-base-100">
        {/* Dashboard Selector for Demo */}
        <DashboardSelector currentRole="issuer" />

        {/* Property Header */}
        <div className="bg-estate-600 py-6">
          <div className="container mx-auto px-4">
            <button onClick={() => router.back()} className="flex items-center text-estate-100 hover:text-white mb-4">
              <FaArrowLeft className="mr-2" />
              Back to Properties
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-white">{mockProperty.name}</h1>
                  <span className="px-2 py-1 bg-token-green bg-opacity-90 text-white text-xs rounded-full">
                    {mockProperty.status}
                  </span>
                </div>
                <p className="text-estate-100 flex items-center mt-1">
                  <FaMapMarkerAlt className="mr-2" />
                  {mockProperty.location}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm border-estate-300 text-estate-100 hover:bg-estate-500 hover:border-estate-400">
                  <FaEdit className="mr-2" /> Edit Property
                </button>
                <button className="btn btn-primary btn-sm">
                  <FaBell className="mr-2" /> Send Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-estate-500">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 flex items-center gap-2 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-token-red text-white"
                      : "border-transparent text-estate-100 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Property Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="h-64 bg-estate-400 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-estate-100">Property Image</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
                      <p className="text-estate-100 mb-6">{mockProperty.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-estate-100">Year Built</p>
                          <p className="font-semibold">{mockProperty.yearBuilt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-estate-100">Property Type</p>
                          <p className="font-semibold">{mockProperty.propertyType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-estate-100">Square Feet</p>
                          <p className="font-semibold">{mockProperty.squareFeet.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-estate-100">Total Units</p>
                          <p className="font-semibold">{mockProperty.units}</p>
                        </div>
                        <div>
                          <p className="text-xs text-estate-100">Property Manager</p>
                          <p className="font-semibold">{mockProperty.propertyManager}</p>
                        </div>
                        <div>
                          <p className="text-xs text-estate-100">Occupancy Rate</p>
                          <p className="font-semibold">{mockProperty.occupancyRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-base-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Tokenization Details</h2>

                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-estate-100">Funding Progress</span>
                        <span className="text-sm text-estate-100">{mockProperty.tokenDetails.fundingProgress}%</span>
                      </div>
                      <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                        <div
                          className="bg-token-green h-2 rounded-full"
                          style={{ width: `${mockProperty.tokenDetails.fundingProgress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-estate-100">
                        <span>{mockProperty.tokenDetails.tokensSold} tokens sold</span>
                        <span>{mockProperty.tokenDetails.tokensIssued} tokens total</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-estate-100">Token Price</span>
                        <span className="font-semibold">${mockProperty.tokenDetails.tokenPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Min Investment</span>
                        <span className="font-semibold">${mockProperty.tokenDetails.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Annual Return</span>
                        <span className="font-semibold">{mockProperty.tokenDetails.annualReturn}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Distribution Schedule</span>
                        <span className="font-semibold">{mockProperty.tokenDetails.distributionSchedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Early Redemption</span>
                        <span className="font-semibold">After {mockProperty.tokenDetails.earlyRedemption} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Full Redemption</span>
                        <span className="font-semibold">After {mockProperty.tokenDetails.fullRedemption} years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Performance */}
                <div className="bg-base-200 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-estate-100">Monthly Revenue</p>
                        <p className="text-2xl font-bold">${mockProperty.monthlyRevenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-estate-100">Monthly Expenses</p>
                        <p className="text-2xl font-bold">${mockProperty.monthlyExpenses.toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-estate-100">Net Operating Income</span>
                        <span className="text-sm text-estate-100">
                          ${mockProperty.monthlyRevenue - mockProperty.monthlyExpenses}
                        </span>
                      </div>
                      <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                        <div
                          className="bg-token-green h-2 rounded-full"
                          style={{
                            width: `${Math.round(((mockProperty.monthlyRevenue - mockProperty.monthlyExpenses) / mockProperty.monthlyRevenue) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-estate-100">Profit Margin:</span>
                        <span className="text-token-green">
                          {Math.round(
                            ((mockProperty.monthlyRevenue - mockProperty.monthlyExpenses) /
                              mockProperty.monthlyRevenue) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="bg-base-300 h-40 rounded-lg flex items-center justify-center">
                      <p className="text-estate-100">Monthly Revenue Chart</p>
                    </div>
                  </div>
                </div>

                {/* Next Actions */}
                <div className="bg-base-200 rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Actions</h2>

                  <div className="space-y-4">
                    <div className="bg-token-green bg-opacity-10 p-4 rounded-lg border border-token-green border-opacity-20">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-token-green bg-opacity-20 p-2 flex-shrink-0">
                          <FaCoins className="text-token-green" />
                        </div>
                        <div>
                          <h3 className="font-medium">Upcoming Dividend Distribution</h3>
                          <p className="text-sm text-estate-100 mt-1">May 15, 2025</p>
                          <p className="text-sm mt-2">
                            Schedule quarterly dividend distribution of $9,000 to token holders.
                          </p>
                          <button className="btn btn-sm btn-outline mt-2 border-token-green text-token-green hover:bg-token-green hover:text-white">
                            Schedule Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-base-300 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-estate-500/20 p-2 flex-shrink-0">
                          <FaCog className="text-estate-300" />
                        </div>
                        <div>
                          <h3 className="font-medium">Scheduled Maintenance</h3>
                          <p className="text-sm text-estate-100 mt-1">May 20, 2025</p>
                          <p className="text-sm mt-2">Elevator maintenance scheduled with vendor.</p>
                          <button className="btn btn-sm btn-ghost mt-2">View Details</button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-base-300 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-estate-500/20 p-2 flex-shrink-0">
                          <FaFileAlt className="text-estate-300" />
                        </div>
                        <div>
                          <h3 className="font-medium">Annual Report Due</h3>
                          <p className="text-sm text-estate-100 mt-1">July 15, 2025</p>
                          <p className="text-sm mt-2">Prepare annual financial report for investors.</p>
                          <button className="btn btn-sm btn-ghost mt-2">Start Preparation</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investor Summary */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Investor Summary</h2>
                  <button onClick={() => setActiveTab("investors")} className="text-estate-300 hover:text-estate-200">
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300">
                      <tr>
                        <th className="text-estate-50">Investor</th>
                        <th className="text-estate-50">Tokens</th>
                        <th className="text-estate-50">Ownership %</th>
                        <th className="text-estate-50">Join Date</th>
                        <th className="text-estate-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProperty.investors.map(investor => (
                        <tr key={investor.id} className="hover:bg-base-300/50">
                          <td>{investor.name}</td>
                          <td>{investor.tokens}</td>
                          <td>{Math.round((investor.tokens / mockProperty.tokenDetails.tokensSold) * 100)}%</td>
                          <td>{investor.joinDate}</td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-ghost">View</button>
                              <button className="btn btn-xs btn-ghost">Message</button>
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

          {/* Financials Tab */}
          {activeTab === "financials" && (
            <div className="space-y-8">
              {/* Financial Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Property Value</p>
                      <p className="text-2xl font-bold">${mockProperty.financials.propertyValue.toLocaleString()}</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaBuilding className="text-estate-300 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-estate-100">Last Appraised: </span>
                    <span>{mockProperty.financials.lastAppraisalDate}</span>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Monthly NOI</p>
                      <p className="text-2xl font-bold">
                        ${mockProperty.financials.netOperatingIncome.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaMoneyBillWave className="text-estate-300 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-token-green">
                    Annual: ${(mockProperty.financials.netOperatingIncome * 12).toLocaleString()}
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Cap Rate</p>
                      <p className="text-2xl font-bold">{mockProperty.financials.capRate}%</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaChartLine className="text-estate-300 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-estate-100">Occupancy: </span>
                    <span>{mockProperty.occupancyRate}%</span>
                  </div>
                </div>
              </div>

              {/* Income Statement */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Income Statement</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-3">Monthly Income</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Rental Income</span>
                        <span className="font-semibold">
                          ${mockProperty.financials.monthlyRentalIncome.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Other Income</span>
                        <span className="font-semibold">$0</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300 font-medium">
                        <span>Total Income</span>
                        <span>${mockProperty.financials.monthlyRentalIncome.toLocaleString()}</span>
                      </div>
                    </div>
                    <h3 className="font-medium mt-6 mb-3">Monthly Expenses</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Property Management</span>
                        <span className="font-semibold">$2,500</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Maintenance & Repairs</span>
                        <span className="font-semibold">$1,800</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Utilities</span>
                        <span className="font-semibold">$1,200</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Property Taxes</span>
                        <span className="font-semibold">$2,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300">
                        <span>Insurance</span>
                        <span className="font-semibold">$1,000</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-base-300 font-medium">
                        <span>Total Expenses</span>
                        <span>${mockProperty.financials.operatingExpenses.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-base-300 rounded-lg mt-4 font-medium">
                      <span>Net Operating Income</span>
                      <span>${mockProperty.financials.netOperatingIncome.toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Income/Expense Breakdown</h3>

                    <div className="bg-base-300 h-64 rounded-lg flex items-center justify-center mb-4">
                      <p className="text-estate-100">Income/Expense Chart</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-estate-100">Return on Investment</span>
                          <span>{mockProperty.tokenDetails.annualReturn}%</span>
                        </div>
                        <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                          <div
                            className="bg-token-green h-2 rounded-full"
                            style={{ width: `${mockProperty.tokenDetails.annualReturn * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-estate-100">Occupancy Rate</span>
                          <span>{mockProperty.occupancyRate}%</span>
                        </div>
                        <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                          <div
                            className="bg-token-blue h-2 rounded-full"
                            style={{ width: `${mockProperty.occupancyRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-estate-100">Expense Ratio</span>
                          <span>
                            {Math.round(
                              (mockProperty.financials.operatingExpenses /
                                mockProperty.financials.monthlyRentalIncome) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                          <div
                            className="bg-token-purple h-2 rounded-full"
                            style={{
                              width: `${Math.round((mockProperty.financials.operatingExpenses / mockProperty.financials.monthlyRentalIncome) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Projections */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Financial Projections</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-base-300 h-64 rounded-lg flex items-center justify-center mb-4">
                      <p className="text-estate-100">Financial Projections Chart</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead className="bg-base-300">
                          <tr>
                            <th className="text-estate-50">Year</th>
                            <th className="text-estate-50">Revenue</th>
                            <th className="text-estate-50">Expenses</th>
                            <th className="text-estate-50">NOI</th>
                            <th className="text-estate-50">Property Value</th>
                            <th className="text-estate-50">Token Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-base-300/50">
                            <td>2025</td>
                            <td>$300,000</td>
                            <td>$102,000</td>
                            <td>$198,000</td>
                            <td>$1,500,000</td>
                            <td>$115</td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>2026</td>
                            <td>$309,000</td>
                            <td>$105,060</td>
                            <td>$203,940</td>
                            <td>$1,545,000</td>
                            <td>$120</td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>2027</td>
                            <td>$318,270</td>
                            <td>$108,212</td>
                            <td>$210,058</td>
                            <td>$1,591,350</td>
                            <td>$125</td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>2028</td>
                            <td>$327,818</td>
                            <td>$111,458</td>
                            <td>$216,360</td>
                            <td>$1,639,091</td>
                            <td>$130</td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>2029</td>
                            <td>$337,653</td>
                            <td>$114,802</td>
                            <td>$222,851</td>
                            <td>$1,688,263</td>
                            <td>$135</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Projection Assumptions</h3>

                    <div className="bg-base-300 rounded-lg p-4 mb-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="text-token-green mr-2">•</div>
                          <span>Annual rental growth: 3%</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-token-green mr-2">•</div>
                          <span>Annual expense growth: 3%</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-token-green mr-2">•</div>
                          <span>Property value appreciation: 3%</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-token-green mr-2">•</div>
                          <span>Occupancy rate: 94% (stable)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="text-token-green mr-2">•</div>
                          <span>Cap rate: 5.4% (stable)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-estate-100">5-Year ROI</span>
                        <span className="font-semibold">35.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Average Annual Return</span>
                        <span className="font-semibold">7.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Token Value Growth</span>
                        <span className="font-semibold">17.4%</span>
                      </div>
                    </div>

                    <button className="btn btn-primary btn-sm w-full mt-4">Update Projections</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Investors Tab */}
          {activeTab === "investors" && (
            <div className="space-y-8">
              {/* Investor Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Total Investors</p>
                      <p className="text-2xl font-bold">{mockProperty.investors.length}</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaUsers className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Tokens Sold</p>
                      <p className="text-2xl font-bold">{mockProperty.tokenDetails.tokensSold}</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaCoins className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Funding Progress</p>
                      <p className="text-2xl font-bold">{mockProperty.tokenDetails.fundingProgress}%</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaChartLine className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Available Tokens</p>
                      <p className="text-2xl font-bold">
                        {mockProperty.tokenDetails.tokensIssued - mockProperty.tokenDetails.tokensSold}
                      </p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaExchangeAlt className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Investor Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-base-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Investor List</h2>

                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead className="bg-base-300">
                          <tr>
                            <th className="text-estate-50">Investor</th>
                            <th className="text-estate-50">Tokens</th>
                            <th className="text-estate-50">Ownership %</th>
                            <th className="text-estate-50">Value</th>
                            <th className="text-estate-50">Join Date</th>
                            <th className="text-estate-50">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockProperty.investors.map(investor => (
                            <tr key={investor.id} className="hover:bg-base-300/50">
                              <td>{investor.name}</td>
                              <td>{investor.tokens}</td>
                              <td>{Math.round((investor.tokens / mockProperty.tokenDetails.tokensSold) * 100)}%</td>
                              <td>${(investor.tokens * mockProperty.tokenDetails.tokenPrice).toLocaleString()}</td>
                              <td>{investor.joinDate}</td>
                              <td>
                                <div className="flex gap-1">
                                  <button className="btn btn-xs btn-ghost">Profile</button>
                                  <button className="btn btn-xs btn-ghost">Contact</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button className="btn btn-primary btn-sm">Export Investor List</button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-base-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Ownership Distribution</h2>

                    <div className="bg-base-300 h-64 rounded-lg flex items-center justify-center mb-6">
                      <p className="text-estate-100">Ownership Pie Chart</p>
                    </div>

                    <div className="space-y-4">
                      {mockProperty.investors.map(investor => (
                        <div key={investor.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-token-purple"></div>
                            <span>{investor.name}</span>
                          </div>
                          <span>{Math.round((investor.tokens / mockProperty.tokenDetails.tokensSold) * 100)}%</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-estate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-estate-400"></div>
                          <span>Available Tokens</span>
                        </div>
                        <span>
                          {Math.round(
                            ((mockProperty.tokenDetails.tokensIssued - mockProperty.tokenDetails.tokensSold) /
                              mockProperty.tokenDetails.tokensIssued) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Updates */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Communicate with Investors</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="form-control w-full mb-4">
                      <label className="label">
                        <span className="label-text">Subject</span>
                      </label>
                      <input type="text" placeholder="Enter message subject" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full mb-4">
                      <label className="label">
                        <span className="label-text">Message</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-32"
                        placeholder="Enter your message to investors"
                      ></textarea>
                    </div>

                    <div className="form-control mb-4">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                        <span className="label-text">Send as email</span>
                      </label>
                    </div>

                    <div className="form-control mb-6">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                        <span className="label-text">Send as in-app notification</span>
                      </label>
                    </div>

                    <button className="btn btn-primary">
                      <FaBell className="mr-2" />
                      Send Update
                    </button>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Recent Communications</h3>

                    <div className="space-y-3">
                      <div className="bg-base-300 p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Q1 Financial Update</span>
                          <span className="text-xs text-estate-100">Apr 15, 2025</span>
                        </div>
                        <p className="text-sm text-estate-100 mb-1">Sent to: All investors</p>
                        <p className="text-sm">Quarterly financial report and dividend announcement...</p>
                      </div>

                      <div className="bg-base-300 p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Property Maintenance Notice</span>
                          <span className="text-xs text-estate-100">Mar 10, 2025</span>
                        </div>
                        <p className="text-sm text-estate-100 mb-1">Sent to: All investors</p>
                        <p className="text-sm">Scheduled HVAC maintenance notification...</p>
                      </div>

                      <div className="bg-base-300 p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">New Tenant Announcement</span>
                          <span className="text-xs text-estate-100">Feb 5, 2025</span>
                        </div>
                        <p className="text-sm text-estate-100 mb-1">Sent to: All investors</p>
                        <p className="text-sm">Announcement of new corporate tenant...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Distributions Tab */}
          {activeTab === "distributions" && (
            <div className="space-y-8">
              {/* Distribution Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Total Distributed</p>
                      <p className="text-2xl font-bold">
                        $
                        {mockProperty.distributions
                          .filter(d => d.status === "Completed")
                          .reduce((sum, d) => sum + d.amount, 0)
                          .toLocaleString()}
                      </p>
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
                      <p className="text-2xl font-bold">
                        ${mockProperty.distributions.find(d => d.status === "Scheduled")?.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaCalendarAlt className="text-estate-300 text-xl" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-estate-100">
                    Scheduled for {mockProperty.distributions.find(d => d.status === "Scheduled")?.date}
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Distribution per Token</p>
                      <p className="text-2xl font-bold">
                        $
                        {(
                          mockProperty.distributions.find(d => d.status === "Scheduled")?.amount /
                          mockProperty.tokenDetails.tokensSold
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaMoneyBillWave className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribution History */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Distribution History</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300">
                      <tr>
                        <th className="text-estate-50">Date</th>
                        <th className="text-estate-50">Total Amount</th>
                        <th className="text-estate-50">Per Token</th>
                        <th className="text-estate-50">Recipients</th>
                        <th className="text-estate-50">Status</th>
                        <th className="text-estate-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProperty.distributions.map(distribution => (
                        <tr key={distribution.id} className="hover:bg-base-300/50">
                          <td>{distribution.date}</td>
                          <td>${distribution.amount.toLocaleString()}</td>
                          <td>${(distribution.amount / mockProperty.tokenDetails.tokensSold).toFixed(2)}</td>
                          <td>{mockProperty.investors.length}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                distribution.status === "Completed"
                                  ? "bg-token-green bg-opacity-20 text-token-green"
                                  : "bg-estate-200 bg-opacity-20 text-estate-200"
                              }`}
                            >
                              {distribution.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-ghost">Details</button>
                              {distribution.status === "Scheduled" && (
                                <button className="btn btn-xs btn-ghost">Edit</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-base-300 h-64 rounded-lg flex items-center justify-center my-6">
                  <p className="text-estate-100">Distribution History Chart</p>
                </div>
              </div>

              {/* Schedule New Distribution */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Schedule New Distribution</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
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
                      <input
                        type="text"
                        placeholder="0.00"
                        className="input input-bordered w-full"
                        defaultValue="9000"
                      />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Distribution Type</span>
                      </label>
                      <select className="select select-bordered w-full">
                        <option>Regular Dividend</option>
                        <option>Special Dividend</option>
                        <option>Capital Return</option>
                      </select>
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Notes</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Add notes for internal reference"
                      ></textarea>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" checked />
                        <span className="label-text">Send notification to investors</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-base-300 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Distribution Preview</h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-estate-100">Total Tokens Issued:</span>
                        <span>{mockProperty.tokenDetails.tokensIssued}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Tokens Sold:</span>
                        <span>{mockProperty.tokenDetails.tokensSold}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-estate-100">Number of Investors:</span>
                        <span>{mockProperty.investors.length}</span>
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

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Individual Allocations</h4>

                      <div className="space-y-2">
                        {mockProperty.investors.map(investor => (
                          <div key={investor.id} className="flex justify-between text-sm">
                            <span>{investor.name}</span>
                            <span>${Math.round(investor.tokens * 11.25)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-base-200 p-3 rounded-lg mb-4">
                      <p className="text-sm">
                        Distributions are made to all token holders proportional to their ownership as of the snapshot
                        date (24 hours before the distribution date).
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

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-8">
              {/* Document Categories */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { title: "Legal Documents", count: 2, icon: <FaFileAlt /> },
                  { title: "Financial Documents", count: 2, icon: <FaChartLine /> },
                  { title: "Property Documents", count: 2, icon: <FaBuilding /> },
                  { title: "All Documents", count: mockProperty.documents.length, icon: <FaFileAlt /> },
                ].map((category, index) => (
                  <div key={index} className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">{category.title}</p>
                        <p className="text-2xl font-bold">{category.count}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">{category.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Document List */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Property Documents</h2>
                  <button className="btn btn-primary btn-sm">
                    <FaFileAlt className="mr-2" /> Upload Document
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300">
                      <tr>
                        <th className="text-estate-50">Document Name</th>
                        <th className="text-estate-50">Type</th>
                        <th className="text-estate-50">Date Added</th>
                        <th className="text-estate-50">Size</th>
                        <th className="text-estate-50">Visibility</th>
                        <th className="text-estate-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProperty.documents.map(doc => (
                        <tr key={doc.id} className="hover:bg-base-300/50">
                          <td>
                            <div className="flex items-center gap-2">
                              <FaFileAlt className="text-token-blue" />
                              <span>{doc.name}</span>
                            </div>
                          </td>
                          <td>{doc.type}</td>
                          <td>{doc.date}</td>
                          <td>{doc.size}</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-token-blue bg-opacity-20 text-token-blue text-xs">
                              {doc.type === "Token" ? "Public" : "Investors Only"}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-ghost">View</button>
                              <button className="btn btn-xs btn-ghost">Download</button>
                              <button className="btn btn-xs btn-ghost">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upload Document */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Upload New Document</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Document Title</span>
                      </label>
                      <input type="text" placeholder="Enter document title" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Document Type</span>
                      </label>
                      <select className="select select-bordered w-full">
                        <option>Legal Document</option>
                        <option>Financial Document</option>
                        <option>Property Document</option>
                        <option>Token Document</option>
                      </select>
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Enter document description"
                      ></textarea>
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
                  </div>

                  <div>
                    <div className="bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg p-8 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-estate-500/20 flex items-center justify-center mb-2">
                        <FaFileAlt className="text-estate-300" />
                      </div>
                      <p className="text-sm mb-2">Drag and drop file here or click to browse</p>
                      <p className="text-xs text-estate-100">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                      <button className="btn btn-sm btn-outline mt-4">Select File</button>
                    </div>

                    <div className="mt-6">
                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                          <span className="label-text">Notify investors about this document</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start">
                          <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                          <span className="label-text">Require electronic signature</span>
                        </label>
                      </div>

                      <button className="btn btn-primary w-full mt-4">Upload Document</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <div className="space-y-8">
              {/* Maintenance Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Open Issues</p>
                      <p className="text-2xl font-bold">
                        {mockProperty.maintenanceIssues.filter(i => i.status !== "Completed").length}
                      </p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaCog className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Monthly Maintenance</p>
                      <p className="text-2xl font-bold">$1,800</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaMoneyBillWave className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6 shadow-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-estate-100 text-sm">Property Condition</p>
                      <p className="text-2xl font-bold">Excellent</p>
                    </div>
                    <div className="rounded-full bg-estate-500/20 p-3">
                      <FaBuilding className="text-estate-300 text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Issues */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Maintenance Issues</h2>
                  <button className="btn btn-primary btn-sm">Add New Issue</button>
                </div>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300">
                      <tr>
                        <th className="text-estate-50">Issue</th>
                        <th className="text-estate-50">Date</th>
                        <th className="text-estate-50">Priority</th>
                        <th className="text-estate-50">Status</th>
                        <th className="text-estate-50">Cost</th>
                        <th className="text-estate-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProperty.maintenanceIssues.map(issue => (
                        <tr key={issue.id} className="hover:bg-base-300/50">
                          <td>{issue.title}</td>
                          <td>{issue.date}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                issue.priority === "High"
                                  ? "bg-token-red bg-opacity-20 text-token-red"
                                  : issue.priority === "Medium"
                                    ? "bg-token-orange bg-opacity-20 text-token-orange"
                                    : "bg-token-blue bg-opacity-20 text-token-blue"
                              }`}
                            >
                              {issue.priority}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                issue.status === "Completed"
                                  ? "bg-token-green bg-opacity-20 text-token-green"
                                  : issue.status === "In Progress"
                                    ? "bg-token-blue bg-opacity-20 text-token-blue"
                                    : "bg-estate-200 bg-opacity-20 text-estate-200"
                              }`}
                            >
                              {issue.status}
                            </span>
                          </td>
                          <td>${issue.cost.toLocaleString()}</td>
                          <td>
                            <div className="flex gap-1">
                              <button className="btn btn-xs btn-ghost">Details</button>
                              <button className="btn btn-xs btn-ghost">Update</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* New Maintenance Issue */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Report New Maintenance Issue</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Issue Title</span>
                      </label>
                      <input type="text" placeholder="Enter issue title" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-24"
                        placeholder="Describe the maintenance issue"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Priority</span>
                        </label>
                        <select className="select select-bordered w-full">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Target Date</span>
                        </label>
                        <input type="date" className="input input-bordered w-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Estimated Cost ($)</span>
                        </label>
                        <input type="text" placeholder="0.00" className="input input-bordered w-full" />
                      </div>

                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Assigned Vendor</span>
                        </label>
                        <select className="select select-bordered w-full">
                          <option disabled selected>
                            Select vendor
                          </option>
                          <option>City Maintenance Co.</option>
                          <option>ABC Repairs</option>
                          <option>Elite Fixing Services</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="bg-base-300 border-2 border-dashed border-base-content/20 rounded-lg p-8 text-center mb-6">
                      <div className="mx-auto w-12 h-12 rounded-full bg-estate-500/20 flex items-center justify-center mb-2">
                        <FaFileAlt className="text-estate-300" />
                      </div>
                      <p className="text-sm mb-2">Upload photos of the issue (optional)</p>
                      <p className="text-xs text-estate-100">Supported formats: JPG, PNG (Max 5MB)</p>
                      <button className="btn btn-sm btn-outline mt-4">Upload Photos</button>
                    </div>

                    <div className="form-control mb-6">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                        <span className="label-text">Notify property manager</span>
                      </label>
                    </div>

                    <div className="form-control mb-6">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                        <span className="label-text">Include in next investor update</span>
                      </label>
                    </div>

                    <button className="btn btn-primary w-full">Submit Maintenance Issue</button>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div className="bg-base-200 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>

                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-300">
                      <tr>
                        <th className="text-estate-50">Maintenance Type</th>
                        <th className="text-estate-50">Frequency</th>
                        <th className="text-estate-50">Last Done</th>
                        <th className="text-estate-50">Next Due</th>
                        <th className="text-estate-50">Status</th>
                        <th className="text-estate-50">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-base-300/50">
                        <td>HVAC Maintenance</td>
                        <td>Quarterly</td>
                        <td>Mar 15, 2025</td>
                        <td>Jun 15, 2025</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                            On Schedule
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">Details</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-300/50">
                        <td>Elevator Inspection</td>
                        <td>Semi-Annual</td>
                        <td>Dec 10, 2024</td>
                        <td>May 20, 2025</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-estate-200 bg-opacity-20 text-estate-200 text-xs">
                            Scheduled
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">Details</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-300/50">
                        <td>Roof Inspection</td>
                        <td>Annual</td>
                        <td>Sep 5, 2024</td>
                        <td>Sep 5, 2025</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                            On Schedule
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">Details</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-300/50">
                        <td>Fire Safety Systems</td>
                        <td>Annual</td>
                        <td>Nov 15, 2024</td>
                        <td>Nov 15, 2025</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                            On Schedule
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">Details</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-base-300/50">
                        <td>Landscaping</td>
                        <td>Monthly</td>
                        <td>Apr 5, 2025</td>
                        <td>May 5, 2025</td>
                        <td>
                          <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                            On Schedule
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-xs btn-ghost">Details</button>
                            <button className="btn btn-xs btn-ghost">Edit</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
