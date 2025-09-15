import React, { useState } from 'react'

const register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" })

    async function handleSubmit(e){
        e.preventDefault()

        const res = await fetch('/api/auth/register',{
            method: "POST",
            headers: {
                "Content-Type":'application/json'
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        alert(data.message);
    }
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  )
}

export default register