import { formatDateDashES } from '@/helpers/formatDate'
import React from 'react'
import styles from './Container.module.css'

const encodeUrl = ({ url, phone }) => {
  const encodedText = encodeURIComponent(`Este es su enlace de pago: ${url}`)
  const newUrl = `https://wa.me/${phone}/?text=${encodedText}`
  if (encodedText) return newUrl
}

const Container = ({
  customer,
  id,
  phone,
  date,
  total,
  orders,
  status,
  url,
}) => {
  const linkAction = {
    created: 'Enviar',
    sent: 'Verificar',
    paid: 'Pagado',
  }

  const buttonClass = {
    created: `${styles['button']} ${styles['created']}`,
    sent: `${styles['button']} ${styles['sent']}`,
    paid: `${styles['button']} ${styles['paid']}`,
  }

  const handleClick = () => {
    window.open(encodeUrl({ url, phone }))
  }
  if (!url) return null
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{phone}</h3>
        <p>{customer}</p>
        <p>{formatDateDashES(date)}</p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.order}>
        {orders?.split('*').map((order) => {
          if (order !== '') return <p key={order}>{order}</p>
        })}
      </div>
      <hr className={styles.divider} />
      <div className={styles.footer}>
        <h3>Total: ${total}</h3>
        <button className={buttonClass[status]} onClick={handleClick}>
          {linkAction[status]}
        </button>
      </div>
    </div>
  )
}

export default Container
