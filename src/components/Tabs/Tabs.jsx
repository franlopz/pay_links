import React, { useEffect, useState } from 'react'
import styles from './Tabs.module.css'
const Tabs = ({ data, setData }) => {
  const [selected, setSelected] = useState('created')

  useEffect(() => {
    setData(data['created'])
    setSelected('created')
  }, [data])
  const clickHandler = (status) => {
    setData(data[status])
    setSelected(status)
  }

  return (
    <ul className={styles.list}>
      <li className={selected === 'created' ? styles.active : ''}>
        <button onClick={() => clickHandler('created')}>Sin enviar</button>
      </li>
      <li className={selected === 'sent' ? styles.active : ''}>
        <button onClick={() => clickHandler('sent')}>Enviados</button>
      </li>
    </ul>
  )
}

export default Tabs
