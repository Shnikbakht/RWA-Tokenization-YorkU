"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import {
  FaBars,
  FaBell,
  FaBuilding,
  FaChartLine,
  FaCog,
  FaCoins,
  FaExchangeAlt,
  FaFileAlt,
  FaHome,
  FaInfoCircle,
  FaSignOutAlt,
  FaUser,
  FaWallet,
} from "react-icons/fa";

// Calendar icon component since we're not importing the entire react-icons library
const FaCalendarAlt = props => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
  </svg>
);

// Mock data for investor portfolio
const mockPortfolio = {
  totalInvested: 25000,
  currentValue: 28750,
  totalReturn: 15,
  totalDividends: 1250,
  properties: [
    {
      id: 1,
      name: "Luxury Downtown Apartment",
      location: "New York, NY",
      investment: 15000,
      currentValue: 17250,
      tokens: 150,
      tokenPrice: 115,
      apy: 5.2,
      unrealizedGain: 2250,
      dividendsPaid: 780,
      nextDividend: "May 15, 2025",
      image: "/images/property1.jpg",
    },
    {
      id: 2,
      name: "Commercial Office Building",
      location: "Austin, TX",
      investment: 10000,
      currentValue: 11500,
      tokens: 20,
      tokenPrice: 575,
      apy: 6.5,
      unrealizedGain: 1500,
      dividendsPaid: 470,
      nextDividend: "June 1, 2025",
      image: "/images/property2.jpg",
    },
  ],
  recentTransactions: [
    {
      id: 1,
      type: "Dividend",
      property: "Luxury Downtown Apartment",
      amount: 195,
      date: "Jan 15, 2025",
      status: "Completed",
    },
    {
      id: 2,
      type: "Dividend",
      property: "Commercial Office Building",
      amount: 162.5,
      date: "Mar 1, 2025",
      status: "Completed",
    },
    {
      id: 3,
      type: "Purchase",
      property: "Commercial Office Building",
      amount: 5000,
      date: "Nov 5, 2024",
      status: "Completed",
    },
  ],
  marketplaceActivity: [
    {
      id: 1,
      property: "Residential Complex",
      location: "Miami, FL",
      pricePerToken: 250,
      availableTokens: 120,
      apy: 4.8,
      image: "/images/property3.jpg",
    },
    {
      id: 2,
      property: "Retail Plaza",
      location: "Chicago, IL",
      pricePerToken: 415,
      availableTokens: 85,
      apy: 5.5,
      image: "/images/property4.jpg",
    },
  ],
};

// Main dashboard page component
export default function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <FaChartLine className="w-5 h-5" /> },
    { id: "properties", label: "My Properties", icon: <FaBuilding className="w-5 h-5" /> },
    { id: "dividends", label: "Dividends", icon: <FaCoins className="w-5 h-5" /> },
    { id: "marketplace", label: "Marketplace", icon: <FaExchangeAlt className="w-5 h-5" /> },
    { id: "documents", label: "Documents", icon: <FaFileAlt className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <FaCog className="w-5 h-5" /> },
  ];

  return (
    <>
      <main className="flex min-h-screen bg-base-100">
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
                <FaUser />
              </div>
              <div>
                <h2 className="font-semibold text-white">Shahla Nikbakht</h2>
                <p className="text-sm text-estate-200">Investor</p>
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
                  <p className="text-estate-100">Welcome back, Alex</p>
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
                {/* Portfolio Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Invested</p>
                        <p className="text-2xl font-bold">${mockPortfolio.totalInvested.toLocaleString()}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaWallet className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Current Value</p>
                        <p className="text-2xl font-bold">${mockPortfolio.currentValue.toLocaleString()}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaChartLine className="text-estate-300 text-xl" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green">
                        +{mockPortfolio.totalReturn}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Dividends</p>
                        <p className="text-2xl font-bold">${mockPortfolio.totalDividends.toLocaleString()}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaCoins className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Properties</p>
                        <p className="text-2xl font-bold">{mockPortfolio.properties.length}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaBuilding className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Cards */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">My Properties</h2>
                    <button
                      onClick={() => setActiveTab("properties")}
                      className="text-estate-300 hover:text-estate-200"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockPortfolio.properties.map(property => (
                      <div key={property.id} className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                        <div className="relative h-40 bg-estate-400">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-estate-100">Property Image</span>
                          </div>
                          <div className="absolute top-4 right-4 px-2 py-1 bg-token-green bg-opacity-90 text-white text-xs rounded-full">
                            {property.apy}% APY
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                          <p className="text-estate-100 text-sm mb-4">{property.location}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-estate-100">Investment</p>
                              <p className="font-semibold">${property.investment.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Current Value</p>
                              <p className="font-semibold">${property.currentValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Tokens Owned</p>
                              <p className="font-semibold">{property.tokens}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Token Price</p>
                              <p className="font-semibold">${property.tokenPrice}</p>
                            </div>
                          </div>

                          <Link href={`/property/${property.id}`} className="btn btn-primary btn-sm w-full">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                  <div className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead className="bg-base-300">
                          <tr>
                            <th className="text-estate-50">Type</th>
                            <th className="text-estate-50">Property</th>
                            <th className="text-estate-50">Amount</th>
                            <th className="text-estate-50">Date</th>
                            <th className="text-estate-50">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockPortfolio.recentTransactions.map(transaction => (
                            <tr key={transaction.id} className="hover:bg-base-300/50">
                              <td>
                                <div className="flex items-center gap-2">
                                  {transaction.type === "Dividend" ? (
                                    <FaCoins className="text-token-green" />
                                  ) : (
                                    <FaExchangeAlt className="text-token-blue" />
                                  )}
                                  {transaction.type}
                                </div>
                              </td>
                              <td>{transaction.property}</td>
                              <td>${transaction.amount.toLocaleString()}</td>
                              <td>{transaction.date}</td>
                              <td>
                                <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
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

                {/* Marketplace Opportunities */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Marketplace Opportunities</h2>
                    <button
                      onClick={() => setActiveTab("marketplace")}
                      className="text-estate-300 hover:text-estate-200"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockPortfolio.marketplaceActivity.map(listing => (
                      <div key={listing.id} className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                        <div className="relative h-40 bg-estate-400">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-estate-100">Property Image</span>
                          </div>
                          <div className="absolute top-4 right-4 px-2 py-1 bg-token-purple bg-opacity-90 text-white text-xs rounded-full">
                            {listing.apy}% APY
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="font-semibold text-lg mb-1">{listing.property}</h3>
                          <p className="text-estate-100 text-sm mb-4">{listing.location}</p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-estate-100">Price per Token</p>
                              <p className="font-semibold">${listing.pricePerToken}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Available Tokens</p>
                              <p className="font-semibold">{listing.availableTokens}</p>
                            </div>
                          </div>

                          <Link href={`/marketplace/${listing.id}`} className="btn btn-primary btn-sm w-full">
                            Invest Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === "properties" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">My Properties</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {mockPortfolio.properties.map(property => (
                    <div key={property.id} className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-56 bg-estate-400">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-estate-100">Property Image</span>
                        </div>
                        <div className="absolute top-4 right-4 px-2 py-1 bg-token-green bg-opacity-90 text-white text-xs rounded-full">
                          {property.apy}% APY
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-semibold text-xl mb-2">{property.name}</h3>
                        <p className="text-estate-100 text-sm mb-6">{property.location}</p>

                        <div className="bg-base-300/50 rounded-lg p-4 mb-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-estate-100">Investment</p>
                              <p className="font-semibold">${property.investment.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Current Value</p>
                              <p className="font-semibold">${property.currentValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Unrealized Gain</p>
                              <p className="font-semibold text-token-green">+${property.unrealizedGain}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Total Dividends</p>
                              <p className="font-semibold">${property.dividendsPaid}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Tokens Owned</p>
                              <p className="font-semibold">{property.tokens}</p>
                            </div>
                            <div>
                              <p className="text-xs text-estate-100">Token Price</p>
                              <p className="font-semibold">${property.tokenPrice}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm mb-1">Next Dividend Payment</p>
                          <p className="font-semibold">{property.nextDividend}</p>
                        </div>

                        <div className="flex gap-3">
                          <Link href={`/property/${property.id}`} className="btn btn-primary flex-1">
                            View Details
                          </Link>
                          <Link
                            href={`/property/${property.id}/sell`}
                            className="btn btn-outline flex-1 border-estate-300 text-estate-300 hover:bg-estate-500 hover:border-estate-400"
                          >
                            Sell Tokens
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dividends Tab */}
            {activeTab === "dividends" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Dividend History</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Total Dividends</p>
                        <p className="text-2xl font-bold">${mockPortfolio.totalDividends.toLocaleString()}</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaCoins className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">YTD Dividends</p>
                        <p className="text-2xl font-bold">$850</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaChartLine className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-lg p-6 shadow-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-estate-100 text-sm">Next Payment</p>
                        <p className="text-2xl font-bold">May 15, 2025</p>
                      </div>
                      <div className="rounded-full bg-estate-500/20 p-3">
                        <FaCalendarAlt className="text-estate-300 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead className="bg-base-300">
                        <tr>
                          <th className="text-estate-50">Property</th>
                          <th className="text-estate-50">Amount</th>
                          <th className="text-estate-50">Date</th>
                          <th className="text-estate-50">Status</th>
                          <th className="text-estate-50">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-base-300/50">
                          <td>Luxury Downtown Apartment</td>
                          <td>$195</td>
                          <td>Jan 15, 2025</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                              Paid
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-ghost">View Receipt</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-base-300/50">
                          <td>Commercial Office Building</td>
                          <td>$162.50</td>
                          <td>Mar 1, 2025</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                              Paid
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-ghost">View Receipt</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-base-300/50">
                          <td>Luxury Downtown Apartment</td>
                          <td>$195</td>
                          <td>Apr 15, 2025</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-token-green bg-opacity-20 text-token-green text-xs">
                              Paid
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-xs btn-ghost">View Receipt</button>
                          </td>
                        </tr>
                        <tr className="hover:bg-base-300/50">
                          <td>Luxury Downtown Apartment</td>
                          <td>$195</td>
                          <td>May 15, 2025</td>
                          <td>
                            <span className="px-2 py-1 rounded-full bg-estate-200 bg-opacity-20 text-estate-200 text-xs">
                              Scheduled
                            </span>
                          </td>
                          <td>
                            <button disabled className="btn btn-xs btn-ghost opacity-50">
                              View Receipt
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Marketplace Tab */}
            {activeTab === "marketplace" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Marketplace</h2>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Property Type</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option value="">All Types</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="retail">Retail</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Location</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option value="">All Locations</option>
                      <option value="ny">New York</option>
                      <option value="tx">Texas</option>
                      <option value="fl">Florida</option>
                      <option value="ca">California</option>
                    </select>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Min. APY</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option value="">Any APY</option>
                      <option value="3">3%+</option>
                      <option value="4">4%+</option>
                      <option value="5">5%+</option>
                      <option value="6">6%+</option>
                    </select>
                  </div>

                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Sort By</span>
                    </label>
                    <select className="select select-bordered w-full">
                      <option value="newest">Newest</option>
                      <option value="apy-high">Highest APY</option>
                      <option value="price-low">Lowest Price</option>
                      <option value="price-high">Highest Price</option>
                    </select>
                  </div>
                </div>

                {/* Property Listings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    ...mockPortfolio.marketplaceActivity,
                    {
                      id: 3,
                      property: "Industrial Warehouse",
                      location: "Dallas, TX",
                      pricePerToken: 180,
                      availableTokens: 250,
                      apy: 5.1,
                      image: "/images/property5.jpg",
                    },
                    {
                      id: 4,
                      property: "Luxury Waterfront Condo",
                      location: "San Francisco, CA",
                      pricePerToken: 650,
                      availableTokens: 75,
                      apy: 4.2,
                      image: "/images/property6.jpg",
                    },
                    {
                      id: 5,
                      property: "Mixed-Use Development",
                      location: "Denver, CO",
                      pricePerToken: 325,
                      availableTokens: 180,
                      apy: 5.8,
                      image: "/images/property7.jpg",
                    },
                    {
                      id: 6,
                      property: "Student Housing Complex",
                      location: "Boston, MA",
                      pricePerToken: 210,
                      availableTokens: 320,
                      apy: 6.2,
                      image: "/images/property8.jpg",
                    },
                  ].map(listing => (
                    <div key={listing.id} className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-40 bg-estate-400">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-estate-100">Property Image</span>
                        </div>
                        <div className="absolute top-4 right-4 px-2 py-1 bg-token-purple bg-opacity-90 text-white text-xs rounded-full">
                          {listing.apy}% APY
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-1">{listing.property}</h3>
                        <p className="text-estate-100 text-sm mb-4">{listing.location}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-estate-100">Price per Token</p>
                            <p className="font-semibold">${listing.pricePerToken}</p>
                          </div>
                          <div>
                            <p className="text-xs text-estate-100">Available Tokens</p>
                            <p className="font-semibold">{listing.availableTokens}</p>
                          </div>
                        </div>

                        <Link href={`/marketplace/${listing.id}`} className="btn btn-primary btn-sm w-full">
                          Invest Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Secondary Market */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Secondary Market Listings</h3>

                  <div className="bg-base-200 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead className="bg-base-300">
                          <tr>
                            <th className="text-estate-50">Property</th>
                            <th className="text-estate-50">Location</th>
                            <th className="text-estate-50">Seller</th>
                            <th className="text-estate-50">Tokens</th>
                            <th className="text-estate-50">Price per Token</th>
                            <th className="text-estate-50">Total Price</th>
                            <th className="text-estate-50">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-base-300/50">
                            <td>Luxury Downtown Apartment</td>
                            <td>New York, NY</td>
                            <td>0x7ab...f3e5</td>
                            <td>25</td>
                            <td>$120</td>
                            <td>$3,000</td>
                            <td>
                              <button className="btn btn-primary btn-xs">Purchase</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>Commercial Office Building</td>
                            <td>Austin, TX</td>
                            <td>0x3df...8a7c</td>
                            <td>10</td>
                            <td>$590</td>
                            <td>$5,900</td>
                            <td>
                              <button className="btn btn-primary btn-xs">Purchase</button>
                            </td>
                          </tr>
                          <tr className="hover:bg-base-300/50">
                            <td>Residential Complex</td>
                            <td>Miami, FL</td>
                            <td>0x92a...6b4d</td>
                            <td>50</td>
                            <td>$260</td>
                            <td>$13,000</td>
                            <td>
                              <button className="btn btn-primary btn-xs">Purchase</button>
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
              <div>
                <h2 className="text-2xl font-semibold mb-6">Documents</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-base-200 rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">Property Documents</h3>

                    <div className="space-y-4">
                      {mockPortfolio.properties.map(property => (
                        <div key={property.id} className="border-b border-base-300 pb-4">
                          <h4 className="font-semibold mb-2">{property.name}</h4>
                          <div className="grid gap-2">
                            <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                              <FaFileAlt className="text-token-blue" />
                              <span>Property Prospectus</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                              <FaFileAlt className="text-token-blue" />
                              <span>Title Deed</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                              <FaFileAlt className="text-token-blue" />
                              <span>Ownership Certificate</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                              <FaFileAlt className="text-token-blue" />
                              <span>Annual Report</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-base-200 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold mb-4">Account Documents</h3>

                      <div className="space-y-2">
                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                          <FaFileAlt className="text-token-red" />
                          <span>User Agreement</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                          <FaFileAlt className="text-token-red" />
                          <span>KYC Verification</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                          <FaFileAlt className="text-token-red" />
                          <span>Privacy Policy</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 p-2 hover:bg-base-300 rounded-lg">
                          <FaFileAlt className="text-token-red" />
                          <span>Tax Documents</span>
                        </a>
                      </div>
                    </div>

                    <div className="bg-base-200 rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold mb-4">Transaction Receipts</h3>

                      <div className="space-y-2">
                        {mockPortfolio.recentTransactions.map(transaction => (
                          <a
                            key={transaction.id}
                            href="#"
                            className="flex items-center justify-between p-2 hover:bg-base-300 rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <FaFileAlt className="text-token-purple" />
                              <span>
                                {transaction.type} - {transaction.property}
                              </span>
                            </div>
                            <span className="text-sm text-estate-100">{transaction.date}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Settings */}
                  <div className="lg:col-span-2">
                    <div className="bg-base-200 rounded-lg shadow-lg p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">First Name</span>
                          </label>
                          <input type="text" className="input input-bordered w-full" defaultValue="Alex" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Last Name</span>
                          </label>
                          <input type="text" className="input input-bordered w-full" defaultValue="Johnson" />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Email Address</span>
                          </label>
                          <input
                            type="email"
                            className="input input-bordered w-full"
                            defaultValue="alex.johnson@example.com"
                          />
                        </div>

                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Phone Number</span>
                          </label>
                          <input type="tel" className="input input-bordered w-full" defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>

                      <div className="form-control w-full mb-6">
                        <label className="label">
                          <span className="label-text">Address</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full mb-2"
                          defaultValue="123 Main Street"
                        />
                        <input type="text" className="input input-bordered w-full mb-2" defaultValue="Apt 4B" />

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="City"
                            defaultValue="New York"
                          />
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="State"
                            defaultValue="NY"
                          />
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Zip"
                            defaultValue="10001"
                          />
                        </div>
                      </div>

                      <button className="btn btn-primary">Save Changes</button>
                    </div>

                    <div className="bg-base-200 rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Security Settings</h3>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Change Password</h4>
                          <div className="grid gap-4">
                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Current Password</span>
                              </label>
                              <input type="password" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">New Password</span>
                              </label>
                              <input type="password" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control w-full">
                              <label className="label">
                                <span className="label-text">Confirm New Password</span>
                              </label>
                              <input type="password" className="input input-bordered w-full" />
                            </div>
                          </div>
                          <button className="btn btn-primary mt-4">Update Password</button>
                        </div>

                        <div className="divider"></div>

                        <div>
                          <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-estate-100 mb-1">Protect your account with 2FA security.</p>
                              <p className="text-xs text-estate-200">
                                Status: <span className="text-token-green">Enabled</span>
                              </p>
                            </div>
                            <button className="btn btn-sm btn-outline">Disable</button>
                          </div>
                        </div>

                        <div className="divider"></div>

                        <div>
                          <h4 className="font-medium mb-2">Connected Wallets</h4>
                          <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-estate-500 flex items-center justify-center text-white">
                                <FaWallet />
                              </div>
                              <div>
                                <p className="font-medium">MetaMask</p>
                                <p className="text-xs text-estate-100">0x7ab3...f3e5</p>
                              </div>
                            </div>
                            <button className="btn btn-ghost btn-xs">Disconnect</button>
                          </div>
                          <button className="btn btn-sm btn-outline w-full">Connect New Wallet</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Settings */}
                  <div>
                    <div className="bg-base-200 rounded-lg shadow-lg p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-xs text-estate-100">Receive updates via email</p>
                          </div>
                          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>

                        <div className="divider my-2"></div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Dividend Alerts</p>
                            <p className="text-xs text-estate-100">Notifications about payments</p>
                          </div>
                          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>

                        <div className="divider my-2"></div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Property Updates</p>
                            <p className="text-xs text-estate-100">News about your properties</p>
                          </div>
                          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>

                        <div className="divider my-2"></div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Market Opportunities</p>
                            <p className="text-xs text-estate-100">New investment listings</p>
                          </div>
                          <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="bg-base-200 rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>

                      <div className="bg-base-300 p-3 rounded-lg flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-white p-1 rounded">
                            <FaCoins className="text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">USDC</p>
                            <p className="text-xs text-estate-100">Primary payment method</p>
                          </div>
                        </div>
                        <div className="badge badge-primary">Default</div>
                      </div>

                      <button className="btn btn-sm btn-outline w-full">Add Payment Method</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Overlay for mobile navigation */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </main>
    </>
  );
}
