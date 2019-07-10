import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class ChatIndex extends React.Component {
  constructor() {
    super()

    this.state = { chats: null }
  }

  getData() {
    axios.get('/api/chats', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ chats: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <section>
        <div>
          <h1>Chat</h1>
          <p className="text-center">“Be genuinely interested in everyone you meet and everyone you meet will be genuinely interested in you”
          ― Rasheed Ogunlaru</p>
        </div>
        <div className="text-center">
          Search Topics
        </div>
        <div className="container">
          <div className="columns text-center">
            {
              this.state.chats &&
              this.state.chats.map(chat => (
                <div className="col-6" key={chat._id}>
                  <Link to={`chats/${chat._id}`}>
                    <div className="card cardstyle">
                      <div className="card-image">
                        <img src={chat.image} alt={chat.title} className="imagestyle"/>
                      </div>
                      <div className="card-body">
                        {chat.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    )
  }
}

export default ChatIndex
