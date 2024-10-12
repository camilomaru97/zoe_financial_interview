import { config } from '../config/config-app'
import { Advisor } from '../types'
import { filteredAdvisors } from '../utils'

const API_URL = config.apiUrlAdvisors

export const getAdvisorsByValueApi = async (id?: string, value?: string) => {
  let filteredAdvisorByAverage = null
  const url = id ? `${API_URL}/${id}` : API_URL

  try {
    const res = await fetch(url)
    if(!res.ok) throw new Error('Check your connection')
    const data = await res.json()
    if(value){
      filteredAdvisorByAverage = filteredAdvisors(data, value)
      return filteredAdvisorByAverage
    }
    return data
  } catch (error) {
    throw new Error(`Something went wrong, please try again. ${error}`)
  }
}

export const postAdvisorsApi = async (data: Advisor) => {
  const url = `${API_URL}` 

  const headers = {
    'Content-Type': 'application/json'
    //token
  }
  try {
    const res = await fetch(url, {
      method: 'POST', 
      headers: headers,
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Check your connection')
    const responseData = await res.json()
    return responseData
  } catch (error) {
    throw new Error(`Something went wrong, please try again ${error}`)
  }
}

export const deleteAdvisorApi = async (id: string) => {
  const url = `${API_URL}/${id}`

  const headers = {
    'Content-Type': 'application/json'
    // token
  }

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: headers
    })
    if (!res.ok) throw new Error('Check your connection')
    return { success: true, message: 'Advisor successfully deleted' }
  } catch (error) {
    throw new Error(`It was not possible to delete the advisor: ${error}`)
  }
}

export const updateAdvisorApi = async (id: string, data: Advisor) => {
  const url = `${API_URL}/${id}`

  const headers = {
    'Content-Type': 'application/json'
    // token
  }

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Check your connection')
    const responseData = await res.json()
    return responseData
  } catch (error) {
    throw new Error(`It was not possible to update the advisor: ${error}`)
  }
}
