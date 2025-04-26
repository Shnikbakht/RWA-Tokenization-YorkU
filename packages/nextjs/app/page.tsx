"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBuilding, FaChartLine, FaCoins, FaExchangeAlt, FaShieldAlt, FaUserCheck } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-gradient-to-b from-estate-600 to-estate-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-estate-600 opacity-80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                <span className="text-estate-200">Tokenize</span> RWA <br />
                <span className="text-token-red">Unlock</span> Liquidity
              </h1>
              <p className="text-lg md:text-xl text-estate-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Invest in premium real estate properties with as little as $100. Earn passive income through dividends
                and benefit from property appreciation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/marketplace" className="btn btn-primary btn-lg rounded-lg">
                  Explore Properties
                </Link>
                <Link
                  href="/documentation"
                  className="btn btn-outline btn-lg rounded-lg border-estate-300 text-estate-100 hover:bg-estate-500 hover:border-estate-400"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-token-purple to-token-red opacity-30 blur-lg"></div>
                <div className="relative rounded-lg bg-estate-500 p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Luxury Condo</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-token-green bg-opacity-20 text-token-green">
                        5% APY
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden h-48 relative">
                      <div className="rounded-lg overflow-hidden h-48 relative">
                        <img src="/property1.jpg" alt="Luxury Condo" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-estate-100">Funded</span>
                        <span className="text-sm text-estate-100">78%</span>
                      </div>
                      <div className="w-full bg-estate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-token-purple to-token-red h-2 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-estate-100">Property Value</p>
                        <p className="text-white font-semibold">$1,250,000</p>
                      </div>
                      <div>
                        <p className="text-estate-100">Min Investment</p>
                        <p className="text-white font-semibold">$100</p>
                      </div>
                    </div>
                    <button className="btn btn-primary w-full">Invest Now</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#0e0e27"
              fillOpacity="1"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-estate-300">Revolutionary</span> Real Estate Investment
            </h2>
            <p className="text-lg text-estate-100 max-w-3xl mx-auto">
              Our platform utilizes blockchain technology to fractionalize real estate ownership, making it accessible,
              liquid, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaBuilding className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Fractional Ownership</h3>
              <p className="text-estate-100">
                Invest in high-quality real estate properties with as little as $100, removing traditional barriers to
                entry.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaChartLine className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Passive Income</h3>
              <p className="text-estate-100">
                Earn regular dividends from rental income and benefit from property value appreciation over time.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaExchangeAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Liquidity</h3>
              <p className="text-estate-100">
                Trade your real estate tokens anytime on our secondary market, without the lengthy process of
                traditional property sales.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Compliant & Secure</h3>
              <p className="text-estate-100">
                Our platform uses ERC-3643 token standard ensuring regulatory compliance and investor protection.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaUserCheck className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Identity Verification</h3>
              <p className="text-estate-100">
                Full KYC/AML compliance with trusted identity verification to meet regulatory requirements.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-full bg-estate-500 w-12 h-12 flex items-center justify-center mb-4">
                <FaCoins className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-estate-50">Vesting & Dividends</h3>
              <p className="text-estate-100">
                Structured vesting periods and automated dividend distribution ensure fair and transparent returns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How <span className="text-estate-300">NikTokenize</span> Works
            </h2>
            <p className="text-lg text-estate-100 max-w-3xl mx-auto">
              Our platform simplifies real estate investment through blockchain technology
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-estate-500 to-token-purple top-1/2 left-0 right-0 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-token-blue to-token-purple opacity-30 blur"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-estate-500 text-white text-2xl font-bold border-4 border-base-200 z-10 mx-auto">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-estate-50">Property Selection</h3>
                <p className="text-estate-100">
                  We carefully select and vet high-quality real estate properties with strong income potential.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-token-purple to-token-red opacity-30 blur"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-estate-500 text-white text-2xl font-bold border-4 border-base-200 z-10 mx-auto">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-estate-50">Tokenization</h3>
                <p className="text-estate-100">
                  Properties are tokenized using ERC-3643 standard, creating compliance-ready security tokens.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div className="relative inline-flex mb-6">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-token-red to-token-orange opacity-30 blur"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-estate-500 text-white text-2xl font-bold border-4 border-base-200 z-10 mx-auto">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-estate-50">Invest & Earn</h3>
                <p className="text-estate-100">
                  Investors purchase tokens, receive dividends, and can trade on our secondary market.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Built on <span className="text-estate-300">Cutting-Edge</span> Technology
            </h2>
            <p className="text-lg text-estate-100 max-w-3xl mx-auto">
              Our platform leverages the ERC-3643 token standard with a comprehensive architecture
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto bg-base-200 p-6 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full h-full">
                {/* Background */}
                <rect width="800" height="600" fill="#0e0e27" />

                {/* Containers */}
                <rect x="200" y="20" width="400" height="70" rx="5" fill="#272757" stroke="#6868ac" strokeWidth="2" />
                <rect x="50" y="150" width="200" height="60" rx="5" fill="#272757" stroke="#44448e" strokeWidth="2" />
                <rect x="300" y="150" width="200" height="60" rx="5" fill="#272757" stroke="#44448e" strokeWidth="2" />
                <rect x="550" y="150" width="200" height="60" rx="5" fill="#272757" stroke="#44448e" strokeWidth="2" />
                <rect x="50" y="270" width="200" height="60" rx="5" fill="#272757" stroke="#8f8fc4" strokeWidth="2" />
                <rect x="300" y="270" width="200" height="60" rx="5" fill="#272757" stroke="#8f8fc4" strokeWidth="2" />
                <rect x="550" y="270" width="200" height="60" rx="5" fill="#272757" stroke="#8f8fc4" strokeWidth="2" />
                <rect x="175" y="390" width="450" height="70" rx="5" fill="#272757" stroke="#9c27b0" strokeWidth="2" />
                <rect x="175" y="500" width="450" height="70" rx="5" fill="#272757" stroke="#f44336" strokeWidth="2" />

                {/* Contract names */}
                <text
                  x="400"
                  y="55"
                  fontFamily="Arial"
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  RealEstateSecurityManager
                </text>
                <text x="400" y="75" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#b7b7d9">
                  (Main Orchestrator)
                </text>

                <text
                  x="150"
                  y="185"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  DividendManager
                </text>
                <text
                  x="400"
                  y="185"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  VestingManager
                </text>
                <text
                  x="650"
                  y="185"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  SecondaryMarket
                </text>

                <text
                  x="150"
                  y="305"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  Compliance
                </text>
                <text
                  x="400"
                  y="305"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  IdentityRegistry
                </text>
                <text
                  x="650"
                  y="305"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  ClaimTopicsRegistry
                </text>

                <text
                  x="400"
                  y="425"
                  fontFamily="Arial"
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  ERC3643Token
                </text>
                <text x="400" y="445" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#b7b7d9">
                  (Security Token)
                </text>

                <text
                  x="400"
                  y="535"
                  fontFamily="Arial"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                  fill="#e0e0ef"
                >
                  IdentityRegistryStorage
                </text>
                <text x="400" y="555" fontFamily="Arial" fontSize="14" textAnchor="middle" fill="#b7b7d9">
                  (Stores investor identities)
                </text>

                {/* Ownership arrows */}
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#f44336" />
                  </marker>

                  {/* Agent role arrows */}
                  <marker
                    id="agentArrow"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                  >
                    <path d="M0,0 L0,6 L9,3 z" fill="#6868ac" />
                  </marker>
                </defs>

                {/* Ownership relationships */}
                <line
                  x1="400"
                  y1="90"
                  x2="150"
                  y2="150"
                  stroke="#f44336"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  markerEnd="url(#arrow)"
                />
                <text x="230" y="120" fontFamily="Arial" fontSize="12" fill="#f44336" fontWeight="bold">
                  OWNS
                </text>

                <line
                  x1="400"
                  y1="390"
                  x2="150"
                  y2="330"
                  stroke="#6868ac"
                  strokeWidth="2"
                  strokeDasharray="3,2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="200" y="350" fontFamily="Arial" fontSize="12" fill="#6868ac" fontWeight="bold">
                  TRUSTED
                </text>

                {/* Agent role relationships */}
                <line
                  x1="400"
                  y1="90"
                  x2="400"
                  y2="150"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="420" y="120" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Calls
                </text>

                <line
                  x1="400"
                  y1="90"
                  x2="650"
                  y2="150"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="570" y="120" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Calls
                </text>

                <line
                  x1="400"
                  y1="90"
                  x2="400"
                  y2="270"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="420" y="240" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Interacts with
                </text>

                <line
                  x1="250"
                  y1="425"
                  x2="175"
                  y2="425"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <line
                  x1="175"
                  y1="425"
                  x2="175"
                  y2="90"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="130" y="390" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Agent Role
                </text>

                <line x1="250" y1="425" x2="175" y2="425" stroke="#6868ac" strokeWidth="2" />
                <line
                  x1="175"
                  y1="425"
                  x2="175"
                  y2="180"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="120" y="340" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Agent Role
                </text>

                <line x1="550" y1="425" x2="625" y2="425" stroke="#6868ac" strokeWidth="2" />
                <line
                  x1="625"
                  y1="425"
                  x2="625"
                  y2="180"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="630" y="340" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Agent Role
                </text>

                <line
                  x1="400"
                  y1="460"
                  x2="400"
                  y2="500"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="420" y="480" fontFamily="Arial" fontSize="12" fill="#6868ac">
                  Uses
                </text>

                {/* Legend */}
                <rect x="630" y="530" width="150" height="60" rx="5" fill="#272757" stroke="#e0e0ef" strokeWidth="1" />
                <line
                  x1="640"
                  y1="545"
                  x2="670"
                  y2="545"
                  stroke="#f44336"
                  strokeWidth="2"
                  strokeDasharray="5,3"
                  markerEnd="url(#arrow)"
                />
                <text x="680" y="550" fontFamily="Arial" fontSize="12" fill="#e0e0ef">
                  Ownership
                </text>
                <line
                  x1="640"
                  y1="570"
                  x2="670"
                  y2="570"
                  stroke="#6868ac"
                  strokeWidth="2"
                  markerEnd="url(#agentArrow)"
                />
                <text x="680" y="575" fontFamily="Arial" fontSize="12" fill="#e0e0ef">
                  Agent Role/Call
                </text>
              </svg>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-estate-600 p-3 rounded-lg text-center">
                <h3 className="text-sm font-semibold text-estate-200">Identity Registry</h3>
              </div>
              <div className="bg-estate-600 p-3 rounded-lg text-center">
                <h3 className="text-sm font-semibold text-estate-200">Compliance</h3>
              </div>
              <div className="bg-estate-600 p-3 rounded-lg text-center">
                <h3 className="text-sm font-semibold text-estate-200">Dividend Manager</h3>
              </div>
              <div className="bg-estate-600 p-3 rounded-lg text-center">
                <h3 className="text-sm font-semibold text-estate-200">Secondary Market</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Featured <span className="text-estate-300">Properties</span>
              </h2>
              <p className="text-lg text-estate-100">Current investment opportunities on our platform</p>
            </div>
            <Link href="/marketplace" className="btn btn-primary mt-4 md:mt-0">
              View All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-estate-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-estate-100">Property Image</span>
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-token-green bg-opacity-90 text-white text-xs rounded-full">
                  5% APY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury Downtown Apartment</h3>
                <p className="text-estate-100 text-sm mb-4">New York, NY</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-estate-100">Funded</span>
                    <span className="text-sm text-estate-100">65%</span>
                  </div>
                  <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-token-purple to-token-red h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-estate-100">Property Value</p>
                    <p className="font-semibold">$2,500,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-estate-100">Min Investment</p>
                    <p className="font-semibold">$100</p>
                  </div>
                </div>

                <Link href="/property/1" className="btn btn-primary w-full">
                  View Details
                </Link>
              </div>
            </motion.div>

            {/* Property Card 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-estate-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-estate-100">Property Image</span>
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-token-purple bg-opacity-90 text-white text-xs rounded-full">
                  6.5% APY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Commercial Office Building</h3>
                <p className="text-estate-100 text-sm mb-4">Austin, TX</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-estate-100">Funded</span>
                    <span className="text-sm text-estate-100">89%</span>
                  </div>
                  <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-token-purple to-token-red h-2 rounded-full"
                      style={{ width: "89%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-estate-100">Property Value</p>
                    <p className="font-semibold">$4,750,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-estate-100">Min Investment</p>
                    <p className="font-semibold">$500</p>
                  </div>
                </div>

                <Link href="/property/2" className="btn btn-primary w-full">
                  View Details
                </Link>
              </div>
            </motion.div>

            {/* Property Card 3 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-base-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-estate-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-estate-100">Property Image</span>
                </div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-token-blue bg-opacity-90 text-white text-xs rounded-full">
                  4.8% APY
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Residential Complex</h3>
                <p className="text-estate-100 text-sm mb-4">Miami, FL</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-estate-100">Funded</span>
                    <span className="text-sm text-estate-100">42%</span>
                  </div>
                  <div className="w-full bg-estate-500 bg-opacity-20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-token-purple to-token-red h-2 rounded-full"
                      style={{ width: "42%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-estate-100">Property Value</p>
                    <p className="font-semibold">$3,200,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-estate-100">Min Investment</p>
                    <p className="font-semibold">$250</p>
                  </div>
                </div>

                <Link href="/property/3" className="btn btn-primary w-full">
                  View Details
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-estate-600 to-estate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9c27b0" />
                <stop offset="100%" stopColor="#f44336" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white">
              Ready to Transform Your Real Estate Investment?
            </h2>
            <p className="text-xl text-estate-100 mb-8">
              Join thousands of investors already benefiting from tokenized real estate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn btn-primary btn-lg rounded-lg">
                Get Started
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline btn-lg rounded-lg border-estate-300 text-estate-100 hover:bg-estate-500 hover:border-estate-400"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
