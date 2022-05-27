import { DateRangeContext } from '@/context/DateRangeContext'
import encodeUrl from '@/helpers/encodeUrl'
import { formatDateDashES } from '@/helpers/formatDate'
import React, { useContext } from 'react'
import styles from './Container.module.css'

const Container = ({
  customer,
  id,
  phone,
  date,
  total,
  orders,
  status,
  url,
  updateLink,
  getLinks,
}) => {
  const { startDate, endDate } = useContext(DateRangeContext)

  const linkAction = {
    created: 'Enviar',
    sent: 'Reenviar',
  }

  const buttonClass = {
    created: `${styles['button']} ${styles['created']}`,
    sent: `${styles['button']} ${styles['sent']}`,
    paid: `${styles['button']} ${styles['paid']}`,
  }

  const handleClick = async () => {
    window.open(encodeUrl({ url, phone }))
    await updateLink({ id: id, value: 'sent' })
    await getLinks({ startDate, endDate })
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
