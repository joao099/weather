import create from 'zustand'

import { DailyInterface } from '../interfaces/WeatherInterface'

interface DailyDataState {
  dailyData: DailyInterface | any,
  setDailyData: (dailyData: DailyInterface) => any,
  removeAllDailyData: () => any
}

const useStore = create<DailyDataState>(set => ({
  dailyData: {},
  setDailyData: dailyData => set({ dailyData }),
  removeAllDailyData: () => set({ dailyData: {} })
}))

export default useStore
