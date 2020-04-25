import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const CardList = props => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} profile={profile}/>)}
    </div>
)

const Card = (props) => {
    const profile = props.profile
    return (
        <div className="info">
            <img src={ profile.avatar_url} alt="" className="image"/>
            <div>
                <h2>{ profile.name }</h2>
                <div>{ profile.company }</div>
            </div>
        </div>
    )
}

const Form = props => {
    const [userName, setUserName] = useState('')
    const handleSubmit = async e => {
        e.preventDefault()
        const resp = await axios.get(`https://api.github.com/users/${userName}`)
        props.onSubmit(resp.data)
        setUserName('')
    }
    return (
        <form onSubmit={handleSubmit} >
            <input 
                type="text" 
                placeholder="Github username"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
            />
            <button>Add Card</button>
        </form >
    )
}

const App = props => {
    const [profiles, setProfiles] = useState([])
    const handleSubmit = profileData => {
        setProfiles([profileData, ...profiles])
    }
    return (
        <div className="App">
            <h1 className="heading">Github Cards</h1>
            <Form onSubmit={handleSubmit} />
            <CardList profiles={profiles} />
        </div>
    )
}

export default App