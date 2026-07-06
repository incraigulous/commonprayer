import { Animated } from 'react-native'
import { cssInterop } from 'nativewind'

// NativeWind's babel transform only auto-instruments the base RN primitives
// (View, Text, etc.) — Animated.View/Animated.Text are separate component
// identities it never sees, so `className` on them is otherwise inert.
cssInterop(Animated.View, { className: 'style' })
cssInterop(Animated.Text, { className: 'style' })
