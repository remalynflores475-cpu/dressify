
# Dressify – Women's Fashion Shopping

Dressify is a women's fashion shopping web application built with React and Vite. It allows users to explore fashion products, search and filter items, sort products by price, view product details, and save their favorite products.

The application uses the DummyJSON Products API to retrieve product information and Local Storage to keep saved favorites in the browser.

## Features

- **Product Browsing** – Explore women's fashion products.
- **Product Search** – Search products by name.
- **Category Filtering** – Filter products by category.
- **Price Sorting** – Sort products from lowest to highest price and vice versa.
- **Pagination** – Browse products through multiple pages.
- **Product Details** – View product images, descriptions, prices, ratings, and availability.
- **Favorites** – Save and remove favorite products using Local Storage.
- **Responsive Design** – Browse the application on desktop and mobile screens.
- **API Integration** – Retrieve product information from DummyJSON.

## Technologies Used

- React
- Vite
- JavaScript
- React Router DOM
- CSS
- Lucide React
- DummyJSON Products API
- Browser Local Storage
- Git and GitHub

## API Reference

Dressify uses the DummyJSON Products API:

https://dummyjson.com/docs/products

The application retrieves product information and displays supported women's fashion categories and tops.

## Application Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/shop` | Product collection |
| `/product/:id` | Product details |
| `/favorites` | Saved favorite products |

## Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd dressify
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

http://localhost:5173

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the application for production |
| `npm run lint` | Checks the code for ESLint issues |
| `npm run preview` | Previews the production build |

## Project Structure

```text
dressify/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Data Storage

Product information is retrieved from the DummyJSON API.

Favorite products are stored in the browser's Local Storage, allowing users to retain their saved items when they revisit the application in the same browser.

## Team Contributions

## Project Developer

**Developer:** Remalyn Flores

### Responsibilities

- Designed and developed the Dressify user interface.
- Implemented React components and application pages.
- Integrated the DummyJSON Products API.
- Implemented product search, category filtering, and price sorting.
- Developed product pagination and product details.
- Implemented favorites management using Local Storage.
- Configured React Router navigation.
- Performed application testing and debugging.
- Managed Git version control and GitHub repository documentation.

## Project Status

Dressify is a frontend web application developed for educational purposes. It demonstrates API integration, React component development, routing, product search and filtering, pagination, and browser-based favorites management.
