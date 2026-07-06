import { View, Text, TextInput, type TextInputProps } from 'react-native'

interface FieldProps extends TextInputProps {
  label?: string
  help?: string
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  className?: string
}

export default function Field({
  label,
  help,
  error,
  required,
  multiline = false,
  rows = 3,
  className,
  ...rest
}: FieldProps) {
  const helpText = error ?? help
  const isInvalid = Boolean(error)

  return (
    <View className={['flex flex-col gap-2', className ?? ''].filter(Boolean).join(' ')}>
      {label && (
        <Text className="font-sans text-xs uppercase tracking-caps text-ink-muted">
          {label}
          {required && <Text className="text-accent"> *</Text>}
        </Text>
      )}
      <TextInput
        multiline={multiline}
        numberOfLines={multiline ? rows : 1}
        className={[
          'w-full font-serif text-base text-ink',
          'bg-surface-sunk border border-border rounded',
          'px-4 py-2.5',
          isInvalid ? 'border-accent' : '',
          multiline ? 'min-h-[5rem]' : '',
        ].filter(Boolean).join(' ')}
        placeholderTextColor="#9a8f77"
        {...rest}
      />
      {helpText && (
        <Text className={['text-xs', isInvalid ? 'text-accent' : 'text-ink-subtle'].join(' ')}>
          {helpText}
        </Text>
      )}
    </View>
  )
}
