import { View, Text, Switch } from 'react-native'
import { useColorScheme } from 'react-native'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  id: string
  description?: string
}

export default function Toggle({ checked, onChange, label, description }: ToggleProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <View className="flex-row items-center justify-between gap-4 py-1">
      <View className="flex-1">
        <Text className="text-sm text-ink">{label}</Text>
        {description && (
          <Text className="text-xs text-ink-muted mt-0.5">{description}</Text>
        )}
      </View>
      <Switch
        value={checked}
        onValueChange={onChange}
        trackColor={{
          false: isDark ? '#3a4658' : '#cdbf9f',
          true: isDark ? '#d65846' : '#bf4835',
        }}
        thumbColor="#ffffff"
      />
    </View>
  )
}
