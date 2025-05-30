'use client'

import { ChangeEvent } from 'react'

interface FormFieldProps {
  label: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  rows?: number
  required?: boolean
  placeholder?: string
}

export function FormField({
  label,
  type = 'text',
  value,
  onChange,
  multiline = false,
  rows = 3,
  required = false,
  placeholder,
}: FormFieldProps) {
  const baseClasses = 'block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm'

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {!required && <span className="text-gray-400 text-xs ml-1">(optional)</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className={baseClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  )
} 