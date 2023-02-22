import { useState } from 'react'
import './App.css'
import NewContactForm from './components/NewContactForm'
import allContacts from './contacts.json'

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5))
  const [filter, setFilter] = useState('')

  const handleClick = () => {
    console.log('click')
    const restOfContacts = allContacts.filter(
      restContact => !contacts.some(contact => contact.id === restContact.id)
    )
    if (restOfContacts.length) {
      const randomContact = restOfContacts[Math.floor(Math.random() * restOfContacts.length)]
      // setContacts([...contacts, randomContact])
      setContacts(prevContacts => [...prevContacts, randomContact])
    }
  }

  const sortContacts = () => {
    const contactsCopy = structuredClone(contacts)

    if (filter === 'name') {
      setContacts(
        contactsCopy.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
      )
      setFilter('')
    } else if (filter === 'popularity') {
      setContacts(contactsCopy.sort((a, b) => a.popularity - b.popularity))
      setFilter('')
    }
  }
  sortContacts()

  function handleDelete(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId))
  }

  return (
    <div className='App'>
      <button type='button' onClick={handleClick}>
        Add random
      </button>
      <NewContactForm setContacts={setContacts} />
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>
              <button type='button' onClick={() => setFilter('name')}>
                Name
              </button>
            </th>
            <th>
              <button type='button' onClick={() => setFilter('popularity')}>
                Popularity
              </button>
            </th>
            <th>Oscar</th>
            <th>Emmy</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(({ id, pictureUrl, name, popularity, wonOscar, wonEmmy }) => (
            <tr key={id}>
              <td>
                <img style={{ height: '100px' }} src={pictureUrl} alt={name} />
              </td>
              <td>{name}</td>
              <td>{Math.round(popularity)}</td>
              <td>{wonOscar ? '🏆' : '❌'}</td>
              <td>{wonEmmy ? '🏆' : '❌'}</td>
              <td>
                <button type='button' onClick={() => handleDelete(id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default App
