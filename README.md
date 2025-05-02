# Amazon Scraper

A full-stack web application for extracting product information from Amazon. The backend, built with Express, Axios and JSDOM handles all scraping logic, while the frontend uses Vanilla JavaScript and Vite for a fast, modern UI.

## Stack
- **Backend:** Express, Axios, JSDOM
- **Frontend:** Vanilla JS, Vite

## Requirements

- Bun.

## Installation

1. **Clone the repository:**
```
git clone https://github.com/arthurlolico/amazon-scraper.git
cd amazon-scraper
```
2. **Install Dependencies:**
```
bun install
```

## Usage

1. **Start the backend server:**
```
cd backend/
bun run scrapingServer.ts
```
The backend will start on `http://localhost:3000` by default.

2. **Start the frontend server:**
```
cd frontend/
bunx vite
```
The frontend will start on `http://localhost:5173` by default.

## How it works

- **Frontend:**  
  - User enters a keyword and use the button.
  - Vite sends request to the backend via fetch() to Express server.
  - After response from backend server returns, display the product information in a friendly manner.

- **Backend:**  
  - Receives the request, uses Axios to fetch the first page of search.
  - Extracts all the products in the first page using JSDOM.
  - Returns structured product data as JSON to frontend server.

  ## Notes

  
    - This project is only for educational purposes. Read more about their Terms of Service.
    - Amazon has a strong anti-scraping software for their site. After some use, it blocks the requests. To solve or mitigate this, more elaborate strategies like rotate residential proxies, throttled requests and rotate headers is necessary.
