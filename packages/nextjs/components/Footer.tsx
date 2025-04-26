"use client";

import React from "react";
import Link from "next/link";
import { FaDiscord, FaEthereum, FaGithub, FaLinkedin, FaMedium, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t border-base-300 py-10 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-estate-400">
                <FaEthereum className="text-white text-xl" />
              </div>
              <div className="font-display font-bold text-xl">
                <span className="text-estate-300">Token</span>
                <span className="text-token-red">Estate</span>
              </div>
            </Link>
            <p className="text-sm text-estate-100 mb-4 max-w-xs">
              NikTokenize is leading the way in real estate tokenization, making property investment accessible, liquid,
              and transparent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-estate-100 hover:text-estate-300 transition">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-estate-100 hover:text-estate-300 transition">
                <FaDiscord className="h-5 w-5" />
              </a>
              <a href="#" className="text-estate-100 hover:text-estate-300 transition">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-estate-100 hover:text-estate-300 transition">
                <FaMedium className="h-5 w-5" />
              </a>
              <a href="#" className="text-estate-100 hover:text-estate-300 transition">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links section 1 */}
          <div>
            <h3 className="font-semibold text-estate-50 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-estate-100 hover:text-estate-300 transition">
                  Property Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-estate-100 hover:text-estate-300 transition">
                  Investor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-estate-100 hover:text-estate-300 transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-estate-100 hover:text-estate-300 transition">
                  My Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Links section 2 */}
          <div>
            <h3 className="font-semibold text-estate-50 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-estate-100 hover:text-estate-300 transition">
                  About NikTokenize
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-estate-100 hover:text-estate-300 transition">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-estate-100 hover:text-estate-300 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-estate-100 hover:text-estate-300 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Links section 3 */}
          <div>
            <h3 className="font-semibold text-estate-50 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-estate-100 hover:text-estate-300 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-estate-100 hover:text-estate-300 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-estate-100 hover:text-estate-300 transition">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-estate-100 hover:text-estate-300 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-base-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-estate-100">&copy; {new Date().getFullYear()} NikTokenize. All rights reserved.</p>
          <p className="text-sm text-estate-100 mt-4 md:mt-0">Powered by ERC-3643 Token Standard</p>
        </div>
      </div>
    </footer>
  );
};
