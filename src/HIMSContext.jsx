import React, { createContext, useState } from 'react';

// Context
export const HIMSContext = createContext(null);

export function HIMSProvider({ children }) {
  // initial mock data (same shape as your single-file app)
  const initialPatients = [
    { id: 1, name: 'Ragu Ram' },
    { id: 2, name: 'Anjali' },
    { id: 3, name: 'Kumar Raj' },
  ];

  const initialDoctors = [
    { id: 1, name: 'Dr.Yamini', dept: 'General' },
    { id: 2, name: 'Dr. Ravi', dept: 'Cardiology' },
    { id: 3, name: 'Dr. Vikram', dept: 'Dermatology' },
  ];

  const initialAppointments = [
    { id: 101, patientId: 2, doctorId: 1, time: '10:00', status: 'confirmed' },
  ];

  const initialVendors = ['HealthSupplies Pvt Ltd', 'MediPlus Distributors', 'PharmaSource'];
  const initialMeds = ['Paracetamol 500mg','Ibuprofen 200mg','Amoxicillin 250mg','Cetirizine 10mg'];

  // inventory uses Date objects for expiry
  function addDays(d, days){ const nd = new Date(d); nd.setDate(nd.getDate()+days); return nd; }
  const initialInventory = [
    { id:1, name:'Paracetamol 500mg', stock:120, expiry: addDays(new Date(),365) },
    { id:2, name:'Ibuprofen 200mg', stock:8, expiry: addDays(new Date(),30) },
    { id:3, name:'Amoxicillin 250mg', stock:0, expiry: addDays(new Date(),-5) },
    { id:4, name:'Vitamin D 1000IU', stock:25, expiry: addDays(new Date(),180) },
  ];

  // states
  const [patients] = useState(initialPatients);
  const [doctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [vendors] = useState(initialVendors);
  const [meds] = useState(initialMeds);
  const [inventory, setInventory] = useState(initialInventory);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  // helper: unique id
  const uid = () => Date.now() + Math.floor(Math.random() * 1000);

  // Appointment functions
  const bookAppointment = ({ patientId, doctorId, time }) => {
    const exists = appointments.find(a => a.doctorId === doctorId && a.time === time);
    if (exists) return { ok: false, message: 'Slot already booked' };
    const newAppt = { id: uid(), patientId, doctorId, time, status: 'confirmed' };
    setAppointments(prev => [...prev, newAppt]);
    return { ok: true, appt: newAppt };
  };

  const changeAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // Purchase Order functions
  const createPurchaseOrder = ({ vendor, rows, status = 'Pending' }) => {
    const id = uid();
    const total = rows.reduce((s, r) => s + (Number(r.qty)||0) * (Number(r.price)||0), 0);
    const po = { id, vendor, rows, total, status, createdAt: new Date() };
    setPurchaseOrders(prev => [...prev, po]);
    return po;
  };

  // Inventory functions
  const adjustStock = (id, delta) => {
    setInventory(prev => prev.map(it => it.id === id ? { ...it, stock: Math.max(0, it.stock + delta) } : it));
  };
  const discardItem = id => {
    setInventory(prev => prev.map(it => it.id === id ? { ...it, stock: 0 } : it));
  };

  const departments = Array.from(new Set(doctors.map(d => d.dept)));

  const value = {
    patients, doctors, departments,
    appointments, bookAppointment, changeAppointmentStatus,
    vendors, meds, purchaseOrders, createPurchaseOrder,
    inventory, adjustStock, discardItem,
  };

  return <HIMSContext.Provider value={value}>{children}</HIMSContext.Provider>;
}
