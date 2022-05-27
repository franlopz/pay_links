import authSamba from './authSamba'

const gqlQuery = async (query, token, options = {}) => {
  const { access_token } = await authSamba()
  const { timeout = 10000 } = options
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  const URL = `http://${window.location.hostname}:9000/api/graphql`

  const body = {
    query: query,
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + access_token,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
    ...options,
  }
  try {
    const response = await fetch(URL, requestOptions)
    clearTimeout(id)
    const data = await response.json()
    return data
  } catch (e) {
    throw e
  }
}

export default gqlQuery
