# Stock Portfolio Frontend

## Overview
This is a React-based Stock Portfolio Frontend application built with TypeScript and Material-UI. It allows users to manage a stock portfolio with a searchable and sortable table, visualize stock performance with charts, and add/delete stocks via modals. State management is handled using Zustand, and data is persisted in localStorage.

## Features
- **Interactive Table**: Displays stocks with columns for ticker, company name, quantity, purchased price, and current price.
  - Supports searching by ticker or company name.
  - Sorting by ticker or company name, quantity, purchased price, and current price.
- **Stock Charts**:
  - **Line Chart**: Displays the price trend for a selected stock over time.
  - **Column Chart**: Shows trading volume or daily gain/loss for a selected stock, with a toggle between the two views.
- **Add Stock**: Add new stocks via a modal with form validation for fields like ticker, company name, quantity, and prices.
- **Delete Stock**: Remove stocks using a confirmation modal.
- **State Management**: Uses Zustand to manage modal states.
- **Local Storage**: Persists stock data in the browser's localStorage for persistence across sessions.

## Tech Stack
- **Frontend**: React, TypeScript, Material-UI
- **State Management**: Zustand
- **Charts**: Hightcharts
- **Utilities**: Custom helpers for UUID generation, form validation, and data beautification
- **Persistence**: localStorage

## Prerequisites
- **Package Manager**: Yarn (recommended) or npm.
- **Git**: For cloning the repository.

## Installation and Running Process
### Step 1: Clone the Repository
Clone the project to your local machine using Git:
```bash
git clone https://github.com/roshan-neupaney/stock-portfolio-app.git
```
```bash
cd stock-portfolio-app
 ```

- ***Install dependencies***
``` bash 
yarn install
```
### **Start Development Server** 
```bash
npm start
```
