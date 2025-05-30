'use client'

import { ChangeEvent } from 'react'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  multiline?: boolean
  rows?: number
}

export function FormField({
  label,
  multiline = false,
  rows = 3,
  className = '',
  required,
  ...props
}: FormFieldProps) {
  const inputClasses = `
    w-full
    px-3
    py-2
    border
    border-gray-300
    rounded-md
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-black
    focus:border-transparent
    disabled:bg-gray-100
    disabled:cursor-not-allowed
    ${className}
  `

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {multiline ? (
        <textarea
          rows={rows}
          className={inputClasses}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={inputClasses}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  )
} 