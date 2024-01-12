import { TextField, styled } from '@mui/material'
import {
  useEffect,
  useState
} from 'react'
import {
  UseFormRegister,
  UseFormTrigger
} from 'react-hook-form'

export enum type {
  NUMBER = 'number',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEXT = 'text',
  HIDDEN = 'hidden',
  CHECKBOX = 'checkbox',
  EMAIL = 'email'
}

interface Pattern {
  value: RegExp
  message: string
}

interface Props {
  variant?: 'filled' | 'outlined' | 'standard'
  className?: string
  id: string
  type: type
  label?: string
  register: UseFormRegister<any>
  placeholder?: string
  value?: string
  required?: boolean | string
  error?: any
  pattern?: Pattern
  validate?: (value: string) => boolean | string
  trigger?: UseFormTrigger<any>
  textColor?: string
  borderColor?: string
  labelColor?: string
  placeholderColor?: string
  textAlign?: 'center' | 'left' | 'right'
  sx?: any
}

export const TextInputComponent = ({
  variant = 'outlined',
  className,
  id,
  type,
  label,
  register,
  placeholder,
  value,
  error,
  required,
  pattern,
  validate,
  trigger,
  textColor = '#FFFFFF',
  borderColor = '#FFFFFF',
  labelColor = '#FFFFFF',
  placeholderColor = '#FFFFFF',
  textAlign = 'left',
  sx = {}
}: Props) => {
  const [hasBlurred, setHasBlurred] = useState(false)

  useEffect(() => { }, [])

  return <TextField
    color='warning'
    variant={variant}
    className={`mt-2 ${className}`}
    id={id}
    type={type}
    label={label}
    {...(register && register(id, {
      required,
      validate,
      pattern,
      onChange: () => {
        if (hasBlurred) trigger && trigger(id)
      }
    }))}
    value={value}
    placeholder={placeholder}
    error={!!error}
    helperText={<p className='absolute top-11 left-0'>{error && error.message}</p>}
    onBlur={() => {
      setHasBlurred(true)
      trigger && trigger(id)
    }}
    fullWidth
    sx={{
      ...sx,
      '& .MuiInput-input': { borderColor },
      '& .MuiTextField-root': { borderColor },
      '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor },
        '&:hover fieldset': { borderColor },
        '&.Mui-focused fieldset': { borderColor },
      },
      '& .MuiInputBase-input': { textAlign },
      '& .MuiInput-underline:after': { borderBottomColor: borderColor },
      '& .MuiInput-underline:before': { borderBottomColor: borderColor },
      '& label': { color: labelColor },
      '& label.Mui-focused': { color: textColor },
      '& input': { color: textColor },
      '& input::placeholder': { color: placeholderColor },
      '& input:focus': { color: textColor },
      '& input:focus::placeholder': { color: placeholderColor },
      '& input:focus-visible': { color: textColor },
      '& input:focus-visible::placeholder': { color: placeholderColor }
    }}
  />
}