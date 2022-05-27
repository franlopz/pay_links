import React, { forwardRef } from 'react'
import styles from './DatePicker.module.css'

const InputDatePicker = forwardRef(({ ...props }, ref) => (
  <div className={styles['input-container']}>
    <input type="text" {...props} ref={ref} readOnly />
    <label>{props.labeltext}</label>
  </div>
))

export default InputDatePicker
