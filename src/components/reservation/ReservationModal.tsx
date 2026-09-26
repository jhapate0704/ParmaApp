'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal, Button } from '@/components/ui';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = ['Experience', 'Dates', 'Details', 'Complete'];

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: '',
    arrival: '',
    departure: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  
  const resetForm = () => {
    setStep(1);
    setFormData({
      experience: '',
      arrival: '',
      departure: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    onClose();
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={step === 4 ? resetForm : onClose}>
      <div className="min-h-[400px] flex flex-col">
        {step < 4 && (
          <div className="mb-8 flex justify-between items-center text-sm font-body text-muted border-b border-stone pb-4">
            {steps.slice(0, 3).map((s, i) => (
              <div key={i} className={`flex items-center ${step === i + 1 ? 'text-charcoal font-medium' : ''}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs ${step === i + 1 ? 'bg-sage text-ivory' : 'bg-stone'}`}>
                  {i + 1}
                </span>
                {s}
              </div>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-charcoal mb-6">Choose your experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['Stay', 'Spa', 'Healthcare', 'Meditation'].map((exp) => (
                      <button
                        key={exp}
                        onClick={() => updateForm('experience', exp)}
                        className={`p-6 border rounded-xl text-left transition-all ${
                          formData.experience === exp 
                            ? 'border-sage bg-sage/5 text-sage' 
                            : 'border-stone hover:border-sage/50 text-charcoal'
                        }`}
                      >
                        <span className="font-body text-lg">{exp}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-charcoal mb-6">When will you join us?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-sm text-muted">Arrival Date</label>
                      <input 
                        type="date" 
                        value={formData.arrival}
                        onChange={(e) => updateForm('arrival', e.target.value)}
                        className="border border-stone rounded-lg p-3 font-body focus:outline-none focus:border-sage"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-body text-sm text-muted">Departure Date</label>
                      <input 
                        type="date" 
                        value={formData.departure}
                        onChange={(e) => updateForm('departure', e.target.value)}
                        className="border border-stone rounded-lg p-3 font-body focus:outline-none focus:border-sage"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-charcoal mb-6">Guest Information</h3>
                  <div className="space-y-4 font-body">
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      className="w-full border border-stone rounded-lg p-3 focus:outline-none focus:border-sage"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full border border-stone rounded-lg p-3 focus:outline-none focus:border-sage"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full border border-stone rounded-lg p-3 focus:outline-none focus:border-sage"
                      />
                    </div>
                    <textarea 
                      placeholder="Any special requests or messages?"
                      value={formData.message}
                      onChange={(e) => updateForm('message', e.target.value)}
                      rows={4}
                      className="w-full border border-stone rounded-lg p-3 focus:outline-none focus:border-sage resize-none"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center text-sage text-3xl mb-4">
                    ✓
                  </div>
                  <h3 className="font-display text-4xl text-charcoal">Your request is ready.</h3>
                  <p className="font-body text-muted max-w-md mx-auto">
                    Thank you for your interest in Parma. Our concierge team will review your request for a {formData.experience} and contact you shortly to confirm your arrangements.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-6 border-t border-stone flex justify-between">
          {step > 1 && step < 4 ? (
            <Button variant="secondary" onClick={handlePrev}>Back</Button>
          ) : (
            <div></div> // Spacer
          )}
          
          {step < 3 ? (
            <Button variant="primary" onClick={handleNext} disabled={step === 1 && !formData.experience}>
              Next Step
            </Button>
          ) : step === 3 ? (
            <Button variant="primary" onClick={handleNext}>
              Submit Request
            </Button>
          ) : (
            <Button variant="primary" onClick={resetForm}>
              Close
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ReservationModal;

