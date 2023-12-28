import { TextField } from '@mui/material'
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
  className?: string
  id: string
  type: type
  label: string
  register: UseFormRegister<any>
  required: boolean | string
  error?: any
  pattern?: Pattern
  validate?: (value: string) => boolean | string
  trigger?: UseFormTrigger<any>
}

export const TextInputComponent = ({
  className,
  id,
  type,
  label,
  register,
  error,
  required,
  pattern,
  validate,
  trigger
}: Props) => {
  const [hasBlurred, setHasBlurred] = useState(false)

  useEffect(() => {}, [])

  return <TextField
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
    error={!!error}
    helperText={<>{error && error.message}</>}
    onBlur={() => {
      setHasBlurred(true)
      trigger && trigger(id)
    }}
    fullWidth
  />
}