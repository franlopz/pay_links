import gqlQuery from '@/api/services/gqlQuery'
import { getTasks } from '@/api/services/gqlSambaQueries'
import { useState, useEffect } from 'react'
const usePayLink = () => {
  const [linksData, setLinksData] = useState(null)

  const getLinks = async () => {
    let payDataArray = []
    gqlQuery(getTasks('payLinkQueue'))
      .then((response) => {
        for (let item of response.data.getTasks) {
          let linkDetails = { date: item.startDate, id: item.id }
          for (let data of item.customData) {
            let key = Object.values(data)[0]
            let value = Object.values(data)[1]
            linkDetails[key] = value
          }
          payDataArray.push(linkDetails)
        }
        return payDataArray
      })
      .then((data) => setLinksData(data))
  }

  const updateLinkStatus = () => {
    gqlQuery()
  }
  useEffect(() => {
    getLinks()
  }, [])

  return linksData
}

export default usePayLink
