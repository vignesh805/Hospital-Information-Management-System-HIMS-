import React, { useContext, useState } from 'react';
import { HIMSContext } from './HIMSContext.jsx';

export default function InventoryManagement(){
  const { inventory, adjustStock, discardItem } = useContext(HIMSContext);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;
  const lowStockThreshold = 10;

  const filtered = inventory.filter(it => {
    if (filter === 'low' && it.stock > lowStockThreshold) return false;
    if (filter === 'expired' && !(new Date(it.expiry) < new Date())) return false;
    if (search && !it.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const paged = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label small">Filter</label>
          <select className="form-select" value={filter} onChange={e=>{ setFilter(e.target.value); setPage(1); }}>
            <option value="all">All</option>
            <option value="low">Low stock</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="col-md-9">
          <label className="form-label small">Search</label>
          <input className="form-control" placeholder="Search item" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Item</th>
              <th>Stock</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(it => (
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${it.stock===0? 'bg-danger': it.stock<=lowStockThreshold? 'bg-warning text-dark':'bg-success'}`}>{it.stock}</span>
                    <div>
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={()=>adjustStock(it.id,1)}>+1</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={()=>adjustStock(it.id,-1)}>-1</button>
                    </div>
                  </div>
                </td>
                <td className={`${new Date(it.expiry) < new Date() ? 'text-danger' : ((new Date(it.expiry)-new Date())/(1000*60*60*24) <= 30 ? 'text-warning' : 'text-muted')}`}>
                  {new Date(it.expiry).toLocaleDateString()}
                </td>
                <td><button className="btn btn-sm btn-danger" onClick={()=>{ if(window.confirm('Discard item stock?')) discardItem(it.id); }}>Discard</button></td>
              </tr>
            ))}
            {paged.length === 0 && <tr><td colSpan={4} className="text-center text-muted">No items match.</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="small text-muted">Showing {Math.min(filtered.length, (page-1)*perPage + 1)}-{Math.min(filtered.length, page*perPage)} of {filtered.length}</div>
        <div>
          <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>setPage(p => Math.max(1, p-1))}>Prev</button>
          <span className="mx-2">Page {page}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={()=>setPage(p => (p*perPage < filtered.length ? p+1 : p))}>Next</button>
        </div>
      </div>
    </div>
  );
}
