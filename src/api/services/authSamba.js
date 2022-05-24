const authSamba = async () => {
  const URL_AUTH = import.meta.env.VITE_AUTH_URL
  const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
  let authedSamba = window.localStorage.getItem('authedSamba')
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  params.append('client_secret', CLIENT_SECRET)
  params.append('client_id', CLIENT_ID)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  }

  if (!authedSamba) {
    try {
      const response = await fetch(URL_AUTH, requestOptions)
      const data = await response.json()
      window.localStorage.setItem('authedSamba', JSON.stringify(data))
      return data
    } catch (e) {}
  } else {
    authedSamba = JSON.parse(authedSamba)
    const now = Date.now()
    const expires = Date.parse(authedSamba['.expires'])
    if (now > expires) {
      window.localStorage.removeItem('authedSamba')
      return await authSamba()
    } else {
      return authedSamba
    }
  }
}

export default authSamba
