import React, { useContext, useState } from 'react';
import { HIMSContext } from './HIMSContext';

export default function PharmacyPurchaseOrder(){
  const { vendors, meds, createPurchaseOrder } = useContext(HIMSContext);

  const [vendor, setVendor] = useState(vendors[0] || '');
  const [rows, setRows] = useState([{ id: Date.now(), name:'', qty:1, price:0 }]);
  const [status, setStatus] = useState('Pending');

  const addRow = () => setRows(r => [...r, { id: Date.now()+Math.random(), name:'', qty:1, price:0 }]);
  const removeRow = id => setRows(r => r.filter(x => x.id !== id));
  const updateRow = (id, field, val) => setRows(r => r.map(x => x.id === id ? { ...x, [field]: val } : x));

  const subtotal = rows.reduce((s, r) => s + (Number(r.qty)||0) * (Number(r.price)||0), 0);

  const saveDraft = () => {
    setStatus('Draft');
    createPurchaseOrder({ vendor, rows, status: 'Draft' });
    alert('Saved as draft (stored in context)');
  };

  const submit = () => {
    setStatus('Pending');
    createPurchaseOrder({ vendor, rows, status: 'Pending' });
    alert('Submitted (stored in context)');
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="d-flex align-items-start gap-3">
          <div className="flex-grow-1">
            <label className="form-label small">Vendor</label>
            <select className="form-select" value={vendor} onChange={e=>setVendor(e.target.value)}>
              {vendors.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="text-end">
            <div className="small text-muted">Status</div>
            <div className="fw-semibold"><span className="badge bg-info text-capitalize">{status}</span></div>
          </div>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-sm">
            <thead className="table-light">
              <tr>
                <th>Medicine</th>
                <th style={{width:100}}>Qty</th>
                <th style={{width:140}}>Unit Price</th>
                <th style={{width:140}}>Line Total</th>
                <th style={{width:80}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>
                    <input list="meds" value={r.name} onChange={e=>updateRow(r.id,'name',e.target.value)} className="form-control form-control-sm" placeholder="Type or choose" />
                    <datalist id="meds">{meds.map(m=> <option key={m} value={m} />)}</datalist>
                  </td>
                  <td><input type="number" min={0} value={r.qty} onChange={e=>updateRow(r.id,'qty',e.target.value)} className="form-control form-control-sm" /></td>
                  <td><input type="number" min={0} value={r.price} onChange={e=>updateRow(r.id,'price',e.target.value)} className="form-control form-control-sm" /></td>
                  <td>₹{((Number(r.qty)||0)*(Number(r.price)||0)).toFixed(2)}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={()=>removeRow(r.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={addRow}>Add Row</button>
          <div className="text-end">
            <div className="small text-muted">Subtotal</div>
            <div className="fw-semibold">₹{subtotal.toFixed(2)}</div>
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={submit}>Submit</button>
          <button className="btn btn-secondary" onClick={saveDraft}>Save as Draft</button>
        </div>
      </div>




      <div className="col-md-4">
        <h6>PO Summary</h6>
        <div className="border rounded p-3 bg-light">
          <div className="small">Vendor: <strong>{vendor}</strong></div>
          <div className="small mt-2">Items: <strong>{rows.length}</strong></div>
          <div className="small mt-2">Total: <strong>₹{subtotal.toFixed(2)}</strong></div>

         <div className="mt-3">
            <h6 className="small">Status View</h6>
            <div className="d-flex flex-column gap-2 mt-2">
              <div className="d-flex justify-content-between"><div>Pending</div><div><span className="badge bg-info text-capitalize">Pending</span></div></div>
              <div className="d-flex justify-content-between"><div>Approved</div><div><span className="badge bg-success">Approved</span></div></div>
              <div className="d-flex justify-content-between"><div>Received</div><div><span className="badge bg-warning">Received</span></div></div>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
