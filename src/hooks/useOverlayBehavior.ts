import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export function useOverlayBehavior(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose()
      return true
    })
    return () => subscription.remove()
  }, [open, onClose])
}
