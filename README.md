# Paan Palace Project

Paan Palace is a full-stack e-commerce style project for selling and managing paan.  
This monorepo contains three parts: the backend, the user interface, and the admin panel.

## Project Overview
- **User Side:** Customers can browse paan products, add to cart, place orders, and checkout.  
- **Admin Side:** Admin can manage orders, customers, and ingredients through a React-based interface.  
- **Backend:** Java Spring Boot REST API handles authentication (JWT), product management, and order processing.

## Tech Stack
- **Backend:** Java, Spring Boot, MySQL, JWT Authentication  
- **Frontend (User):** HTML, CSS, JavaScript  
- **Frontend (Admin):** React.js  
- **Tools:** Git, GitHub, Maven, Node.js

## Folder Structure
paan-backend/      # Spring Boot backend
user-interface/    # Frontend for users
react-admin/       # Admin panel built with React

## How to Run
- **Backend:** `cd paan-backend && mvnw spring-boot:run` (or `mvn spring-boot:run`)  
- **User Interface:** Open `index.html` in browser or run `npx serve .` inside the folder  
- **React Admin:** `cd react-admin && npm install && npm start`

