// src/pages/SettingsPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./SettingsPage.css";

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Help & Settings</h1>

        <div className="settings-card">
          <div className="settings-header">
            <h2>Your Account</h2>
            <p className="settings-subtitle">Manage your account settings</p>
          </div>

          <div className="settings-content">
            <div className="settings-section">
              <h3>Account Information</h3>
              <div className="settings-item">
                <span className="settings-label">Name:</span>
                <span className="settings-value">Nour</span>
              </div>
              <div className="settings-item">
                <span className="settings-label">Email:</span>
                <span className="settings-value">nour@example.com</span>
              </div>
              <div className="settings-item">
                <span className="settings-label">Member Since:</span>
                <span className="settings-value">January 2024</span>
              </div>
            </div>

            <div className="settings-section">
              <h3>Preferences</h3>
              <div className="settings-item">
                <span className="settings-label">
                  <span className="settings-icon">🌐</span>
                  Language
                </span>
                <span className="settings-value">English</span>
              </div>
              <div className="settings-item">
                <span className="settings-label">
                  <span className="settings-icon">🇪🇬</span>
                  Country/Region
                </span>
                <span className="settings-value">Egypt (EG)</span>
              </div>
              <div className="settings-item">
                <span className="settings-label">
                  <span className="settings-icon">💳</span>
                  Currency
                </span>
                <span className="settings-value">EGP - Egyptian Pound</span>
              </div>
            </div>

            <div className="settings-section">
              <h3>Help & Support</h3>
              <Link to="/help" className="settings-link">
                <span className="settings-icon">❓</span>
                Help Center
              </Link>
              <Link to="/contact" className="settings-link">
                <span className="settings-icon">📞</span>
                Contact Us
              </Link>
              <Link to="/faq" className="settings-link">
                <span className="settings-icon">📖</span>
                FAQ
              </Link>
            </div>

            <div className="settings-section">
              <h3>Account Actions</h3>
              <button className="settings-button">
                <span className="settings-icon">🔒</span>
                Change Password
              </button>
              <button className="settings-button">
                <span className="settings-icon">📧</span>
                Email Preferences
              </button>
              <button className="settings-button danger">
                <span className="settings-icon">🚪</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
