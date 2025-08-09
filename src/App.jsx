import React, { useState } from 'react';
import { HIMSProvider } from './HIMSContext.jsx';
import AppointmentScheduler from './AppointmentScheluder.jsx';
import PharmacyPurchaseOrder from './PharmacyPurchaseOrder.jsx';
import InventoryManagement from './InventoryManagement.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [tab, setTab] = useState('appointments');

  return (
    <HIMSProvider>
      <div className="container my-4">
        <header className="mb-3">
          <h1 className="h4">Ezovion HIMS — React + Bootstrap</h1>
          <small className="text-muted">Appointments • Pharmacy PO • Inventory</small>
        </header>

        <ul className="nav nav-tabs mb-3">
          <li className="nav-item"><button className={`nav-link ${tab==='appointments'?'active':''}`} onClick={() => setTab('appointments')}>Appointments</button></li>
          <li className="nav-item"><button className={`nav-link ${tab==='po'?'active':''}`} onClick={() => setTab('po')}>Pharmacy PO</button></li>
          <li className="nav-item"><button className={`nav-link ${tab==='inventory'?'active':''}`} onClick={() => setTab('inventory')}>Inventory</button></li>
        </ul>

        <div className="card shadow-sm">
          <div className="card-body">
            {tab === 'appointments' && <AppointmentScheduler />}
            {tab === 'po' && <PharmacyPurchaseOrder />}
            {tab === 'inventory' && <InventoryManagement />}
          </div>
        </div>

        <footer className="mt-3 text-muted small">Demo — local state only (Context-backed)</footer>
      </div>
    </HIMSProvider>
  );
}
