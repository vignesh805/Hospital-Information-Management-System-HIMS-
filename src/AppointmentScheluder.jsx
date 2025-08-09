import React, { useContext, useMemo, useState } from 'react';
import { HIMSContext } from './HIMSContext';

export default function AppointmentScheduler(){
  const { patients, doctors, departments, appointments, bookAppointment } = useContext(HIMSContext);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deptFilter, setDeptFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');

  const todaySlots = generateSlots('09:00','17:00',30);

  const filteredDoctors = useMemo(() => doctors.filter(d => (deptFilter === 'All' ? true : d.dept === deptFilter) && (doctorFilter === 'All' ? true : d.id === Number(doctorFilter))), [deptFilter, doctorFilter, doctors]);

  const bookSlot = (doctorId, time) => {
    if (!selectedPatient) { alert('Please select a patient first'); return; }
    const res = bookAppointment({ patientId: selectedPatient.id, doctorId, time });
    if (!res.ok) alert(res.message);
  };

  const getSlotStatus = (doctorId, time) => {
    const appt = appointments.find(a => a.doctorId === doctorId && a.time === time);
    return appt ? appt.status : 'available';
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h5>Patient</h5>
        <PatientSelector patients={patients} value={selectedPatient} onChange={setSelectedPatient} />

        <div className="mt-3">
          <h6>Filters</h6>
          <div className="mb-2">
            <label className="form-label small">Department</label>
            <select className="form-select" value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}>
              <option>All</option>
              {departments.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label small">Doctor</label>
            <select className="form-select" value={doctorFilter} onChange={e=>setDoctorFilter(e.target.value)}>
              <option value={'All'}>All</option>
              {doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.dept}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <h6>Appointments</h6>
          <ul className="list-group list-group-flush mt-2">
            {appointments.map(a => (
              <li key={a.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  <div className="fw-semibold">{patients.find(p => p.id === a.patientId)?.name}</div>
                  <div className="small text-muted">{doctors.find(d => d.id === a.doctorId)?.name} • {a.time}</div>
                </div>
                <div><StatusTag status={a.status} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-md-8">
        <h5>Doctor Calendar — Day View</h5>
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="fw-semibold">{doc.name}</div>
                  <div className="small text-muted">{doc.dept}</div>
                </div>
                <div className="small text-muted">{new Date().toDateString()}</div>
              </div>

              <div className="mt-3 d-flex flex-wrap gap-2">
                {todaySlots.map(slot => {
                  const status = getSlotStatus(doc.id, slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => bookSlot(doc.id, slot)}
                      disabled={status !== 'available'}
                      className={`btn btn-sm ${status === 'available' ? 'btn-outline-primary' : 'btn-secondary disabled'}`}
                    >
                      {slot}
                      <div className="small">{status}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        <div className="small text-muted">Click an available slot to book (select a patient first).</div>
      </div>
    </div>
  );
}

/* subcomponents + utils */
function PatientSelector({ patients, value, onChange }) {
  const [q, setQ] = useState('');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <input className="form-control" placeholder="Search patient" value={q} onChange={e=>setQ(e.target.value)} />
      <div className="list-group mt-2" style={{maxHeight:160, overflow:'auto'}}>
        {filtered.map(p => (
          <button key={p.id} type="button" onClick={() => onChange(p)} className={`list-group-item list-group-item-action ${value?.id===p.id? 'active':''}`}>
            {p.name}
          </button>
        ))}
        {filtered.length===0 && <div className="list-group-item text-muted">No results</div>}
      </div>
    </div>
  );
}

function StatusTag({ status }) {
  const map = { confirmed: 'success', cancelled: 'danger', rescheduled: 'warning' };
  const cls = map[status] || 'secondary';
  return <span className={`badge bg-${cls} text-capitalize`}>{status}</span>;
}

function generateSlots(start, end, intervalMin) {
  const toMin = t => { const [h,m]=t.split(':').map(Number); return h*60+m; };
  const toHHMM = m => `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
  const s = toMin(start), e = toMin(end);
  const out = [];
  for (let t=s; t<e; t+=intervalMin) out.push(toHHMM(t));
  return out;
}
