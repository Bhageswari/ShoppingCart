# Shopping Cart

A responsive shopping cart built with React, TypeScript, Vite, and Tailwind CSS.
It loads cart data from the DummyJSON API and allows basic cart interactions.

## Features

* Fetches cart data from API
* Remove items from the cart (local state only)
* Reset cart to original items
* Automatically updates total price
* Responsive design (grid on desktop, stacked on mobile)

## How to Run

1. Install dependencies
   npm install

2. Start the development server
   npm run dev

## API Used

https://dummyjson.com/carts/1

## Assumptions & Decisions

* Added a loading state for better user experience
* Removing items updates the UI instantly
* Reset restores the original cart without making another API call
* Layout switches to a single column on smaller screens (<800px)

## Notes

* No backend updates are made; all changes are handled locally
* Only essential product fields (title and price) are displayed
