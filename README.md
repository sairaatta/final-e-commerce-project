# E-Commerce Platform with React and Redux

This repository contains a responsive e-commerce platform developed using React.js, Redux Toolkit, Tailwind CSS, Formik, and Yup. The application provides a comprehensive shopping experience and includes the following features:

- **Landing Page:** A visually appealing introduction to the platform.
- **Product Listings:** A page showcasing available products with filtering and search capabilities.
- **Detailed Product Pages:** Pages with detailed information about individual products.
- **Shopping Cart:** A cart for managing selected products and quantities.
- **Multi-Step Checkout Process:** A seamless checkout flow for users to place orders.
- **Order History Page:** A page where users can view their past orders.
- **Admin Panel:** An interface for managing products and user accounts.
- **CRUD Operations:** Full create, read, update, and delete functionality for managing products and users.
- **Form Handling and Validation:** Utilizes Formik for form management and Yup for validation.
- **Responsive Design:** Ensures a clean and modern user experience across all devices.

The project uses Redux Toolkit for state management and RapidAPI for data fetching. The platform is designed to be fully responsive and provides a user-friendly experience with a modern design.

## Pages

### Landing Page

### Product Listings

### Detailed Product Page

### Shopping Cart

### Multi-Step Checkout Process

## API References

- [StandingAPI - Fake Data API](https://rapidapi.com/standingapi-standingapi-default/api/fake-data3/): Used for generating and fetching fake data, which includes products, user information, and other relevant data for testing and development purposes.

## Acknowledgements

- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [RapidAPI](https://rapidapi.com/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Authors

- Saira Atta - [github/Profile/SairaAtta](https://github.com/sairaatta)

## Installation

Install my-project with npm

```sh
npm install my-project
cd my-project

# Create react app with Vite
npm create vite@latest

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Add this to tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

# ./src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

# Run server
npm run dev
