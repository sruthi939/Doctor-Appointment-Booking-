import React, { useState } from 'react';
import { X, Stethoscope, Plus, Trash2, CheckCircle2, FileText, Pill } from 'lucide-react';
import { saveConsultation } from '../../services/doctorService';

const ConsultationModal = ({ appointment, isOpen, onClose, onComplete }) => {
    if (!isOpen || !appointment) return null;

    const [diagnosisNotes, setDiagnosisNotes] = useState(
        'Patient complains of headache and fever since last 2 days. Advised rest and medication.'
    );

    const [prescriptions, setPrescriptions] = useState([
        { id: 1, medicine: 'Paracetamol 500mg', dosage: '1 Tab', frequency: 'Twice daily after meals' },
        { id: 2, medicine: 'Cetirizine 10mg', dosage: '1 Tab', frequency: 'Once daily at night' }
    ]);

    const [newMed, setNewMed] = useState('');
    const [newDosage, setNewDosage] = useState('1 Tab');
    const [newFreq, setNewFreq] = useState('Twice daily');

    const handleAddMedication = (e) => {
        e.preventDefault();
        if (newMed.trim()) {
            setPrescriptions([
                ...prescriptions,
                { id: Date.now(), medicine: newMed.trim(), dosage: newDosage, frequency: newFreq }
            ]);
            setNewMed('');
        }
    };

    const handleRemoveMed = (id) => {
        setPrescriptions(prescriptions.filter(p => p.id !== id));
    };

    const handleSaveAndComplete = async () => {
        await saveConsultation({
            appointmentId: appointment.id,
            diagnosisNotes,
            prescriptions
        });
        if (onComplete) onComplete(appointment.id);
        onClose();
    };

    return (
        <div className='fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 text-left font-sans'>
            <div className='bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto'>
                <button
                    onClick={onClose}
                    className='absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors'
                >
                    <X size={18} />
                </button>

                {/* Header Info */}
                <div className='flex items-center gap-3 border-b border-slate-800 pb-4'>
                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shrink-0'>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <h2 className='text-xl font-bold text-white'>Patient Consultation & Prescription</h2>
                        <p className='text-slate-400 text-xs mt-0.5'>
                            Patient: <strong className='text-white'>{appointment.patientName || appointment.name}</strong> &bull; #{appointment.id}
                        </p>
                    </div>
                </div>

                {/* Patient Summary Card */}
                <div className='bg-slate-950/80 border border-slate-800 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300'>
                    <div>
                        <span className='text-slate-400 block'>Reason for Visit</span>
                        <span className='font-semibold text-pink-400'>{appointment.reason || 'General Consultation'}</span>
                    </div>
                    <div>
                        <span className='text-slate-400 block'>Date & Time</span>
                        <span className='font-semibold text-white'>{appointment.date || '15 May 2024'} ({appointment.time || '09:00 AM'})</span>
                    </div>
                    <div>
                        <span className='text-slate-400 block'>Contact Phone</span>
                        <span className='font-semibold text-indigo-400'>{appointment.phone || '+1 987 654 3210'}</span>
                    </div>
                </div>

                {/* Diagnosis / Notes Section matching Step 7 diagram */}
                <div className='space-y-2'>
                    <label className='block text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5'>
                        <FileText size={16} className='text-pink-400' />
                        Diagnosis / Clinical Notes
                    </label>
                    <textarea
                        rows={3}
                        value={diagnosisNotes}
                        onChange={(e) => setDiagnosisNotes(e.target.value)}
                        className='w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-white text-xs focus:outline-none focus:border-pink-500 leading-relaxed'
                        placeholder='Enter diagnosis, clinical observations and health advice...'
                    ></textarea>
                </div>

                {/* Prescription Items matching Step 7 diagram */}
                <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                        <label className='text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5'>
                            <Pill size={16} className='text-indigo-400' />
                            Prescription
                        </label>
                        <span className='text-[11px] text-slate-400'>{prescriptions.length} Medicines Prescribed</span>
                    </div>

                    <div className='space-y-2'>
                        {prescriptions.map((item, idx) => (
                            <div key={item.id} className='p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-white'>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold text-pink-400'>{idx + 1}.</span>
                                    <div>
                                        <span className='font-bold text-white'>{item.medicine}</span>
                                        <span className='text-slate-400 ml-2'>({item.dosage} &bull; {item.frequency})</span>
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    onClick={() => handleRemoveMed(item.id)}
                                    className='text-slate-400 hover:text-rose-400 p-1'
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Medication Form */}
                    <form onSubmit={handleAddMedication} className='grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2'>
                        <input
                            type='text'
                            value={newMed}
                            onChange={(e) => setNewMed(e.target.value)}
                            placeholder='Medicine Name (e.g. Amoxicillin 250mg)'
                            className='sm:col-span-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs'
                        />
                        <input
                            type='text'
                            value={newDosage}
                            onChange={(e) => setNewDosage(e.target.value)}
                            placeholder='Dosage (1 Tab)'
                            className='bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs'
                        />
                        <button
                            type='submit'
                            className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer'
                        >
                            <Plus size={14} /> Add
                        </button>
                    </form>
                </div>

                {/* Save & Complete Action Button matching diagram */}
                <div className='pt-4 border-t border-slate-800 flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className='px-5 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveAndComplete}
                        className='px-8 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-pink-500/25 flex items-center gap-2 cursor-pointer'
                    >
                        <CheckCircle2 size={16} /> Save & Complete Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationModal;
