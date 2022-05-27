import React, { createContext, useState } from 'react'

export const DateRangeContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  return (
    <DateRangeContext.Provider value={{ startDate, endDate, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  )
}
