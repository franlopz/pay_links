import Container from '@/components/Container/Container'
import DatePicker from '@/components/DatePicker/DatePicker'
import { DateRangeContext } from '@/context/DateRangeContext'
import usePayLink from '@/hooks/usePayLink'
import React from 'react'
import styles from './Links.module.css'
const Links = () => {
  const { linksData, updateLinkStatus, getLinks } = usePayLink(null)
  if (!linksData) {
    return null
  }
  return (
    <div className={styles.body}>
      <div>
        <DatePicker action={getLinks} />
        <div className={styles.container}>
          {linksData.map((link) => {
            return (
              <Container
                id={link.id}
                key={link.url}
                customer={link.name}
                phone={link.phone}
                date={link.date}
                total={link.total}
                orders={link.orders}
                status={link.status}
                url={link.url}
                updateLink={updateLinkStatus}
                getLinks={getLinks}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Links
