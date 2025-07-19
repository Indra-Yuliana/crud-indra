'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState<number | null>(null)

  // Fetch data
  const fetchItems = async () => {
    const res = await fetch('/api/items')
    const data = await res.json()
    setItems(data)
  }

  useEffect(() => { fetchItems() }, [])

  // Create or Update
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (editId) {
      await fetch(`/api/items/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
    } else {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
    }
    setName('')
    setEditId(null)
    fetchItems()
  }

  // Delete
  const handleDelete = async (id: number) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' })
    fetchItems()
  }

  // Set edit
  const handleEdit = (item: any) => {
    setEditId(item.id)
    setName(item.name)
  }

  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD Sederhana</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          placeholder="Nama item..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-2 rounded">
            <span>{item.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
