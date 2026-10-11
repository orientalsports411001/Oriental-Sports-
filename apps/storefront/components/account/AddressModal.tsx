'use client';

import React, { useState, useEffect } from 'react';
import { Address } from '@/types/auth';
import { X, Check, MapPin } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressData: Omit<Address, 'id'>) => Promise<void>;
  initialData?: Address | null;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    phone: '',
    street: '',
    locality: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '',
    isDefault: false,
    type: 'home',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        phone: initialData.phone,
        street: initialData.street,
        locality: initialData.locality,
        city: initialData.city,
        state: initialData.state,
        pincode: initialData.pincode,
        isDefault: initialData.isDefault,
        type: initialData.type,
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        street: '',
        locality: '',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '',
        isDefault: false,
        type: 'home',
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.phone.trim() || !formData.street.trim() || !formData.pincode.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (formData.pincode.replace(/\D/g, '').length !== 6) {
      setError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch {
      setError('Failed to save address. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 10, 10, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            backgroundColor: 'var(--color-ink)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--color-plate-gold)" />
            <h3 className="font-display" style={{ margin: 0, fontSize: '1.25rem', color: '#FFFFFF' }}>
              {initialData ? 'EDIT ADDRESS' : 'ADD NEW ADDRESS'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: '4px',
            }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #F87171',
                borderRadius: '4px',
                padding: '10px 14px',
                color: '#991B1B',
                fontSize: '0.8125rem',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label
                htmlFor="addr-name"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                Contact Name *
              </label>
              <input
                id="addr-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Arjun Deshmukh"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="addr-phone"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                Mobile Number *
              </label>
              <input
                id="addr-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit number"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label
              htmlFor="addr-street"
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#374151',
                marginBottom: '4px',
              }}
            >
              Flat, House No., Building, Apartment *
            </label>
            <input
              id="addr-street"
              type="text"
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="e.g. Flat 402, Royal Palms, Prabhat Road Lane 5"
              style={{
                width: '100%',
                height: '40px',
                padding: '0 12px',
                fontSize: '0.875rem',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label
                htmlFor="addr-locality"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                Area / Locality / Landmark
              </label>
              <input
                id="addr-locality"
                type="text"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                placeholder="e.g. Near Deccan Gymkhana"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="addr-pincode"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                PIN Code *
              </label>
              <input
                id="addr-pincode"
                type="text"
                required
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                placeholder="411004"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label
                htmlFor="addr-city"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                City
              </label>
              <input
                id="addr-city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="addr-state"
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#374151',
                  marginBottom: '4px',
                }}
              >
                State
              </label>
              <input
                id="addr-state"
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  fontSize: '0.875rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Address Type radio chips */}
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Address Category
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['home', 'work', 'academy'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: formData.type === type ? '2px solid var(--color-ink)' : '1px solid #D1D5DB',
                    backgroundColor: formData.type === type ? 'rgba(201, 162, 39, 0.08)' : '#FFFFFF',
                    color: formData.type === type ? 'var(--color-ink)' : '#4B5563',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {type === 'academy' ? 'Club / Academy' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Default Address Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: 'var(--color-ink)' }}
            />
            <span style={{ fontSize: '0.8125rem', color: '#374151' }}>
              Make this my default shipping address for gear checkout
            </span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline-dark btn-sm"
              disabled={isSubmitting}
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={16} />
              <span>{isSubmitting ? 'SAVING...' : 'SAVE ADDRESS'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
