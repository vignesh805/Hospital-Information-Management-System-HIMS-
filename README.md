# Ezovion HIMS Frontend Modules (React + Bootstrap)

## 📌 Overview
This project implements **three key modules** for Ezovion's Hospital Information Management System (HIMS), focusing on clean, responsive, and functional UI components:
1. **Hospital Appointment Scheduler**
2. **Pharmacy Purchase Order**
3. **Inventory / Stock Management**

The goal is to showcase **frontend development skills** with React, Bootstrap, and healthcare-specific workflows.

---

## 🛠 Tech Stack
- **React** (Functional Components + Hooks)
- **Bootstrap** (Responsive styling)
- **JavaScript (ES6+)**
- **CSS** (Scoped component styles)

---

## 📂 Folder Structure
```
src/
│
│── AppointmentScheduler.jsx
│── PharmacyPurchaseOrder.jsx
│── InventoryManagement.jsx
│── HIMSContext.jsx
│
├── App.js
├── index.js
├── App.css
│──assets/Image- Screenshot
```

---

## ⚙️ Installation & Setup
1. Clone the repository or download the `.zip`
   ```bash
   git clone <repo-url>
   cd "Foldername"
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
4. The app will open at `http://localhost:3000`

---


## download over zip file 
1. first download the zip file and extract the files properly then open open visual studio and respective folder 
2. second open terminal cmd then cd "foldername"
3. third install npm package and npm install bootstrap react-bootstrap if needs
4. fourth run the application using npm run dev


## download over git
1. first create folder in visual studio
2. second open terminal and select cmd then cd in respective folder
3. third git clone "the respository link" and install npm package if needs
4. fourth run the application using npm run dev 

## screenshots
I shared demo screenshots in src/assets

## 📖 Module Features

### **1. Hospital Appointment Scheduler**
- **Patient selection** (dropdown or search)
- **Doctor calendar view** with time slots
- **Booking status** (Available / Booked)
- **Department & doctor filters**
- **Status tags** (Confirmed, Cancelled, Rescheduled)

---

### **2. Pharmacy Purchase Order**
- **Vendor selection** (dropdown)
- **Dynamic medicine rows** (name, quantity, unit price)
- **Auto-calculated total**
- **Save as Draft / Submit**
- **Order status tags** (Pending, Approved, Received)

---

### **3. Inventory / Stock Management**
- **Stock list** with item details
- **Expiry color coding**
- **Filter low stock / expired**
- **Stock adjustment & discard actions**
- **Pagination or search** (optional)

---

## 🚀 Usage
- Use the **navbar** to navigate between modules
- All data is stored in **component state** (no backend)
- You can easily integrate APIs later

---

## 📝 License
This project is for **evaluation/demo** purposes only.

