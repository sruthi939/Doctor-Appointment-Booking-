import React, { useState } from 'react';
import { X, Stethoscope, Plus, Trash2, CheckCircle2, FileText, Pill } from 'lucide-react';
import { saveConsultation } from '../../services/doctorService';

const ConsultationModal = ({ appointment, isOpen, onClose, onComplete }) => {
    if (!isOpen || !appointment) return null;

    const [diagnosisNotes, setDiagnosisNotes] = useState('');
    const [prescriptions, setPrescriptions] = useState([]);

    const [newMed, setNewMed] = useState('');
    const [newDosage, setNewDosage] = useState('1 Tab');
    const [newFreq, setNewFreq] = useState('Twice daily');
    const [saving, setSaving] = useState(false);

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
        setSaving(true);
        await saveConsultation({
            appointmentId: appointment.id || appointment._id,
            diagnosisNotes,
            prescriptions
        });
        setSaving(false);
        if (onComplete) onComplete(appointment.id || appointment._id);
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
                        <h2 className='text-xl font-extrabold text-white'>Consultation & E-Prescription</h2>
                        <p className='text-xs text-slate-400'>
                            Patient: <strong className='text-white'>{appointment.patientName}</strong> &bull; Slot: <span className='text-pink-400'>{appointment.time}</span>
                        </p>
                    </div>
                </div>

                {/* Diagnosis Notes */}
                <div className='space-y-2'>
                    <label className='block text-xs font-bold text-slate-300 flex items-center gap-1.5'>
                        <FileText size={14} className='text-pink-400' /> Clinical Diagnosis & Medical Notes
                    </label>
                    <textarea
                        rows={3}
                        value={diagnosisNotes}
                        onChange={(e) => setDiagnosisNotes(e.target.value)}
                        placeholder='Enter diagnosis notes, symptoms, and examination observations...'
                        className='w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500'
                    ></textarea>
                </div>

                {/* E-Prescription Section */}
                <div className='space-y-3'>
                    <label className='block text-xs font-bold text-slate-300 flex items-center gap-1.5'>
                        <Pill size={14} className='text-rose-400' /> Prescribed Medications ({prescriptions.length})
                    </label>

                    <div className='space-y-2'>
                        {prescriptions.length === 0 ? (
                            <p className='text-slate-500 text-xs py-2 italic'>No medications added yet.</p>
                        ) : (
                            prescriptions.map((item) => (
                                <div
                                    key={item.id}
                                    className='p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-white'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span className='font-bold text-pink-400'>{item.medicine}</span>
                                        <span className='text-slate-400'>&bull;</span>
                                        <span className='text-slate-300'>{item.dosage}</span>
                                        <span className='text-slate-400'>&bull;</span>
                                        <span className='text-slate-400'>{item.frequency}</span>
                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveMed(item.id)}
                                        className='p-1 text-slate-400 hover:text-rose-400 transition-colors'
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Add Medication Form */}
                    <form onSubmit={handleAddMedication} className='pt-2 flex flex-col sm:flex-row items-end gap-2'>
                        <input
                            type='text'
                            value={newMed}
                            onChange={(e) => setNewMed(e.target.value)}
                            placeholder='Medicine Name (e.g. Paracetamol 500mg)'
                            className='flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500 w-full'
                        />
                        <select
                            value={newDosage}
                            onChange={(e) => setNewDosage(e.target.value)}
                            className='bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500 shrink-0'
                        >
                            <option value='1 Tab'>1 Tab</option>
                            <option value='2 Tabs'>2 Tabs</option>
                            <option value='1 Syrup Spoon (5ml)'>1 Syrup Spoon (5ml)</option>
                            <option value='1 Capsule'>1 Capsule</option>
                        </select>
                        <select
                            value={newFreq}
                            onChange={(e) => setNewFreq(e.target.value)}
                            className='bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500 shrink-0'
                        >
                            <option value='Once daily'>Once daily</option>
                            <option value='Twice daily'>Twice daily</option>
                            <option value='Thrice daily'>Thrice daily</option>
                            <option value='As needed'>As needed</option>
                        </select>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1'
                        >
                            <Plus size={14} /> Add
                        </button>
                    </form>
                </div>

                {/* Footer Action */}
                <div className='pt-4 border-t border-slate-800 flex justify-end gap-3'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        disabled={saving}
                        onClick={handleSaveAndComplete}
                        className='px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-pink-500/25 flex items-center gap-2 cursor-pointer'
                    >
                        <CheckCircle2 size={16} /> {saving ? 'Saving...' : 'Complete Consultation'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationModal;
