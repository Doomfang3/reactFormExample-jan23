import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const NewContactForm = ({ setContacts }) => {
  const [name, setName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [popularity, setPopularity] = useState(0)
  const [wonOscar, setWonOscar] = useState(false)
  const [wonEmmy, setWonEmmy] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    console.log({ name, pictureUrl, popularity, wonOscar, wonEmmy })
    setContacts(prevContacts => {
      return [...prevContacts, { name, pictureUrl, popularity, wonOscar, wonEmmy, id: uuidv4() }]
    })
    setName('')
    setPictureUrl('')
    setPopularity(0)
    setWonOscar(false)
    setWonEmmy(false)
  }

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      <label>
        Name
        <input type='text' value={name} onChange={event => setName(event.target.value)} />
      </label>
      <label>
        Picture
        <input
          type='text'
          value={pictureUrl}
          onChange={event => setPictureUrl(event.target.value)}
        />
      </label>
      <label>
        Popularity
        <input
          type='number'
          value={popularity}
          onChange={event => setPopularity(event.target.value)}
        />
      </label>
      <label>
        Oscar
        <input
          type='checkbox'
          value={wonOscar}
          onChange={event => setWonOscar(event.target.checked)}
        />
      </label>
      <label>
        Emmy
        <input
          type='checkbox'
          value={wonEmmy}
          onChange={event => setWonEmmy(event.target.checked)}
        />
      </label>
      <button type='submit'>Add Contact</button>
    </form>
  )
}

export default NewContactForm
