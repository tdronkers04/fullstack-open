import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    async function getData(baseUrl) {
      try {
        const response = await axios.get(`${baseUrl}/`)
        setResources(response.data)
      } catch (error) {
        console.error(error.message)
      }
    }
    getData(baseUrl)
  }, [baseUrl])
  
  const create = async (resource) => {
    try {
      const response = await axios.post(`${baseUrl}/`, resource)
      setResources(resources.concat(response.data))
    } catch (error) {
      console.error(error.message)
    }
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

