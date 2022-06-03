import React, { useContext, useRef, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import es from 'date-fns/locale/es'
registerLocale('es', es)
import 'react-datepicker/dist/react-datepicker.css'
import styles from './DatePicker.module.css'
import InputDatePicker from './InputDatePicker'
import RefreshButton from './RefreshButton'
import { DateRangeContext } from '@/context/DateRangeContext'

const DatePicker = ({ children }) => {
  const { startDate, endDate, setDateRange } = useContext(DateRangeContext)
  const ref = useRef()
  return (
    <div className={styles['parent-container']}>
      <div className={styles.datepicker}>
        <ReactDatePicker
          locale="es"
          todayButton="Hoy"
          customInput={<InputDatePicker ref={ref} labeltext={'Fecha'} />}
          selectsRange={true}
          peekNextMonth
          showMonthDropdown
          useShortMonthInDropdown
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update)
          }}
        />
      </div>
      {children}
    </div>
  )
}

export default DatePicker
