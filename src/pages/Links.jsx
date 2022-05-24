import Container from '@/components/container/Container'
import usePayLink from '@/hooks/usePayLink'
import React from 'react'

const Links = () => {
  const linksData = usePayLink(null)
  if (!linksData) {
    return null
  }
  return (
    <div>
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
          />
        )
      })}
    </div>
  )
}

export default Links
