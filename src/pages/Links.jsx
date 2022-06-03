import Container from '@/components/Container/Container'
import DatePicker from '@/components/DatePicker/DatePicker'
import RefreshButton from '@/components/DatePicker/RefreshButton'
import Tabs from '@/components/Tabs/Tabs'
import { DateRangeContext } from '@/context/DateRangeContext'
import usePayLink from '@/hooks/usePayLink'
import React, { useContext, useState } from 'react'
import styles from './Links.module.css'
const Links = () => {
  const { linksData, updateLinkStatus, getLinks, loading } = usePayLink()
  const { startDate, endDate } = useContext(DateRangeContext)
  const [data, setData] = useState([])

  return (
    <div className={styles.body}>
      <div>
        <DatePicker>
          <RefreshButton
            loading={loading}
            onClick={() => getLinks({ startDate, endDate })}
          />
        </DatePicker>
        <Tabs data={linksData} setData={setData} />
        <div className={styles.container}>
          {data.length === 0 && (
            <div className={styles.empty}>
              <p>Sin datos</p>
            </div>
          )}
          {data.map((link) => {
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
