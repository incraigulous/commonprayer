import { Redirect } from 'expo-router'
import { getDefaultOffice } from '../src/liturgy/calendar'

export default function Index() {
  const office = getDefaultOffice(new Date())
  return <Redirect href={`/(tabs)/${office}`} />
}
