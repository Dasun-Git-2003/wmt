import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/items'

function App() {
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState({ name: '', description: '', price: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch all items
  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Add or update item
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill all fields')
      return
    }

    try {
      if (editingId) {
        // Update item
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        setEditingId(null)
      } else {
        // Create new item
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      }
      
      setFormData({ name: '', description: '', price: '' })
      fetchItems()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // Edit item
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price
    })
    setEditingId(item._id)
  }

  // Delete item
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        fetchItems()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Item Manager</h1>
      </header>

      <main>
        <div className="form-section">
          <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
            <button type="submit">
              {editingId ? 'Update Item' : 'Add Item'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null)
                  setFormData({ name: '', description: '', price: '' })
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="items-section">
          <h2>Items List</h2>
          {loading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>No items yet. Add one above!</p>
          ) : (
            <div className="items-grid">
              {items.map(item => (
                <div key={item._id} className="item-card">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">${parseFloat(item.price).toFixed(2)}</p>
                  <div className="item-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
