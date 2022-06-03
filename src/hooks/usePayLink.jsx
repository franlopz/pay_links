import gqlQuery from '@/api/services/gqlQuery'
import { getTasks, updateTask } from '@/api/services/gqlSambaQueries'
import { useState, useEffect } from 'react'

const usePayLink = () => {
  const [linksData, setLinksData] = useState({ created: [], sent: [] })
  const [loading, setLoading] = useState(false)
  const getLinks = async ({ startDate, endDate }) => {
    setLoading(true)
    try {
      let payDataObject = { created: [], sent: [] }
      let startDateString = [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
      ]
      let endDateString = [
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
      ]
      startDateString = startDateString.join('-') + 'T00:00:00.0Z'
      endDateString = endDateString.join('-') + 'T23:59:59.0Z'
      const response = await gqlQuery(
        getTasks({
          type: 'payLinkQueue',
          startDate: startDateString,
          endDate: endDateString,
        })
      )
      for (let item of response.data.getTasks) {
        let status = ''
        let linkDetails = { date: item.startDate, id: item.id }
        for (let data of item.customData) {
          let key = Object.values(data)[0]
          let value = Object.values(data)[1]
          linkDetails[key] = value
          if (key === 'status') status = value
        }
        if (status === 'created') payDataObject.created.push(linkDetails)
        if (status === 'sent') payDataObject.sent.push(linkDetails)
      }
      setLoading(false)
      setLinksData(payDataObject)
    } catch (e) {
      setLoading(false)
    }
  }

  const updateLinkStatus = async ({ id, value }) => {
    setLoading(true)
    await gqlQuery(updateTask({ id: id, name: 'status', value: value }))
    setLoading(false)
  }

  useEffect(() => {
    let today = new Date()
    getLinks({ startDate: today, endDate: today })
  }, [])

  return { linksData, updateLinkStatus, getLinks, loading }
}

export default usePayLink
