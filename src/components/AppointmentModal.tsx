import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { AppointmentRequest, JewelleryCategory } from '../types/jewellery';
import { SHOWROOM_CONFIG, generateAppointmentWhatsAppUrl } from '../data/showroomConfig';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

const TIME_SLOTS = [
  "11:30 AM – 01:00 PM (Morning Salon)",
  "02:00 PM – 03:30 PM (Afternoon Suite)",
  "04:00 PM – 05:30 PM (High Tea Consultation)",
  "06:00 PM – 07:30 PM (Evening Bridal Lounge)"
];

const COLLECTIONS_LIST: (JewelleryCategory | 'All Collections')[] = [
  "All Collections",
  "Bridal",
  "Gold",
  "Diamond",
  "Necklaces",
  "Bangles",
  "Earrings",
  "Rings",
  "Mangalsutras"
];

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = "All Collections"
}) => {
  const [formData, setFormData] = useState<AppointmentRequest>({
    fullName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTimeSlot: TIME_SLOTS[0],
    collectionInterest: (defaultCategory as any) || 'All Collections',
    specialNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  // Tomorrow's date formatted as YYYY-MM-DD for min date picker
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }

    // Phone validation: Indian 10-digit mobile
    const cleanPhone = formData.phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please choose a preferred visit date";
    }

    if (!formData.preferredTimeSlot) {
      newErrors.preferredTimeSlot = "Please choose a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const url = generateAppointmentWhatsAppUrl(formData);
    setSubmittedUrl(url);

    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setSubmittedUrl(null);
    setFormData({
      fullName: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTimeSlot: TIME_SLOTS[0],
      collectionInterest: 'All Collections',
      specialNotes: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleReset}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div 
          className="relative w-full max-w-xl bg-[#141417] border border-[#2B2925] rounded-xl shadow-2xl p-6 sm:p-8 z-10 my-8 text-[#F7F5F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 text-[#A8A49C] hover:text-[#F7F5F0] hover:bg-[#1E1D21] rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {!submittedUrl ? (
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
                  Private Salon Experience
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FDFCF7]">
                  Book a Showroom Visit
                </h3>
                <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-2 mb-2"></div>
                <p className="text-xs text-[#A8A49C] max-w-sm mx-auto">
                  Experience our bridal & gold suites in Bandra, Mumbai with a dedicated master jewellery consultant.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A7770]" />
                    <input
                      type="text"
                      placeholder="e.g. Radhika Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs sm:text-sm text-[#F7F5F0] pl-10 pr-3 py-2.5 rounded"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                    Mobile Number (WhatsApp Enabled) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7A7770] font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs sm:text-sm text-[#F7F5F0] pl-12 pr-3 py-2.5 rounded font-mono"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={minDateStr}
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs sm:text-sm text-[#F7F5F0] px-3 py-2.5 rounded"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.preferredTimeSlot}
                      onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                      className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs text-[#F7F5F0] px-3 py-2.5 rounded cursor-pointer"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Collection of Interest */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#C5A059] font-medium mb-1">
                    Jewellery Collection of Interest
                  </label>
                  <select
                    value={formData.collectionInterest}
                    onChange={(e) => setFormData({ ...formData, collectionInterest: e.target.value as any })}
                    className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs text-[#F7F5F0] px-3 py-2.5 rounded cursor-pointer"
                  >
                    {COLLECTIONS_LIST.map((col) => (
                      <option key={col} value={col}>
                        {col === 'All Collections' ? 'All Collections (General Viewing)' : `${col} Collection`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A8A49C] font-medium mb-1">
                    Specific requirements / Bridal trousseau date (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for a traditional Polki bridal choker for December wedding..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full bg-[#18181B] border border-[#302D28] focus:border-[#C5A059] focus:outline-none text-xs text-[#F7F5F0] p-3 rounded resize-none"
                  />
                </div>

                {/* Disclaimer */}
                <div className="p-3 bg-[#111113] border border-[#272522] rounded text-[11px] text-[#8E8B83] leading-relaxed">
                  <p>
                    <strong>Please Note:</strong> Submitting this form prepares your appointment request on WhatsApp. The appointment is strictly a request until confirmed by our showroom concierge team.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#121214] text-xs font-bold uppercase tracking-widest rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#C5A059]/15"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Appointment Request via WhatsApp</span>
                </button>
              </form>
            </div>
          ) : (
            /* Post-Submission Success Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#25D366]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif-luxury text-2xl font-bold text-[#FDFCF7] mb-2">
                Request Dispatched to WhatsApp
              </h4>

              <p className="text-xs text-[#A8A49C] max-w-md mx-auto mb-6 leading-relaxed">
                Your appointment details have been prepared for <strong>{formData.fullName}</strong> on <strong>{formData.preferredDate}</strong> ({formData.preferredTimeSlot}).
              </p>

              <div className="p-4 bg-[#18181B] border border-[#2E2B25] rounded-lg max-w-sm mx-auto text-left text-xs mb-6 space-y-2">
                <p className="text-[#C5A059] font-medium uppercase tracking-wider text-[10px]">
                  Appointment Request Summary:
                </p>
                <p>• Showroom: Turner Road, Bandra West, Mumbai</p>
                <p>• Preferred Date: {formData.preferredDate}</p>
                <p>• Time Slot: {formData.preferredTimeSlot}</p>
                <p>• Interest: {formData.collectionInterest}</p>
              </div>

              <div className="flex flex-col gap-2 max-w-sm mx-auto">
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20BA5A] text-[#0E2012] text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Re-open WhatsApp Chat
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 border border-[#3A3732] text-[#A8A49C] hover:text-[#F7F5F0] text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
