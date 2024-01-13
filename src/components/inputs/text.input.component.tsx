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
  register?: UseFormRegister<any>
  onChange?: (data: any) => void
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
  inputFontFamily?: string
  placeHolederFontFamily?: string
  labelFontFamily?: string
}

export const TextInputComponent = ({
  variant = 'outlined',
  className,
  id,
  type,
  label,
  register,
  onChange,
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
  sx = {},
  inputFontFamily = 'sans-serif',
  placeHolederFontFamily = 'sans-serif',
  labelFontFamily = 'sans-serif'
}: Props) => {
  const [hasBlurred, setHasBlurred] = useState(false)

  useEffect(() => { }, [])

  const css = {
    ...sx,
    '& .MuiInput-input': { borderColor, fontFamily: inputFontFamily },
    '& .MuiTextField-root': { borderColor, fontFamily: inputFontFamily },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor },
      '&:hover fieldset': { borderColor },
      '&.Mui-focused fieldset': { borderColor },
    },
    '& .MuiInputBase-input': { textAlign, fontFamily: inputFontFamily },
    '& .MuiInput-underline:after': { borderBottomColor: borderColor },
    '& .MuiInput-underline:before': { borderBottomColor: borderColor },
    '& label': { color: labelColor, fontFamily: labelFontFamily },
    '& label.Mui-focused': { color: textColor, fontFamily: labelFontFamily },
    '& input': { color: textColor, fontFamily: inputFontFamily },
    '& input::placeholder': { color: placeholderColor, fontFamily: placeHolederFontFamily },
    '& input:focus': { color: textColor, fontFamily: placeHolederFontFamily },
    '& input:focus::placeholder': { color: placeholderColor, fontFamily: placeHolederFontFamily },
    '& input:focus-visible': { color: textColor, fontFamily: placeHolederFontFamily },
    '& input:focus-visible::placeholder': { color: placeholderColor, fontFamily: placeHolederFontFamily }
  }

  return onChange !== null && onChange !== undefined ?
    <TextField
      color='warning'
      variant={variant}
      className={`mt-2 relative ${className}`}
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
      onChange={onChange}
      placeholder={placeholder}
      error={!!error}
      helperText={<p className='absolute top-11 left-0'>{error && error.message}</p>}
      onBlur={() => {
        setHasBlurred(true)
        trigger && trigger(id)
      }}
      fullWidth
      sx={css}
    />
    :
    <TextField
      color='warning'
      variant={variant}
      className={`mt-2 relative ${className}`}
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
      sx={css}
    />
}