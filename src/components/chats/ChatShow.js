import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class ChatsShow extends React.Component {
  constructor() {
    super()

    this.state = { chat: {}, text: '', showEmojis: false }
    this.handleChange = this.handleChange.bind(this)
    this.addEmoji = this.addEmoji.bind(this)
    this.hideEmojis = this.hideEmojis.bind(this)
  }

  toggleEmojis(){
    this.setState(prevState => ({
      showEmojis: !prevState.showEmojis
    }))
  }

  hideEmojis(){
    this.setState({ showEmojis: false })
  }


  addEmoji(e){
    const emoji = e.native
    this.setState({
      text: this.state.text + emoji
    })
  }

  getData() {
    axios.get(`/api/chats/${this.props.match.params.chatId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ chat: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getData()
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {

    return (
      <section className="section">
        {
          this.state.chat.comments &&
          <div>
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">{this.state.chat.title}</h2>
                <p className="title">Chat with fellow {this.state.chat.title} about accomodation, transport, hidden gems and so on!</p>
              </div>
              <div className="panel-body">
                {this.state.chat.comments.map(comment => {
                  return <div key={comment._id} className="tile">
                    <div className="tile-icon">
                      <figure className="avatar"><img src={comment.user.image} alt="Avatar"/></figure>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title text-bold">{comment.user.username}</p>
                      <p className="tile-subtitle">{comment.text}</p>
                      <small>{new Date(comment.createdAt).toLocaleString().slice(0,17)}</small>
                    </div>
                  </div>
                })
                }
                <div className="panel-footer">
                  <form onSubmit={this.handleSubmit} className="input-group">
                    <input className="form-input"
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange}
                      placeholder="Type your message" />
                    <span className="add-emoji-button" onClick={this.toggleEmojis.bind(this)}>😀</span>
                    <button type='submit' className="btn btn-primary input-group-btn">Send</button>
                  </form>
                  {this.state.showEmojis &&
                  <span className="emojipicker-container" onMouseLeave={this.hideEmojis}> test
                    <Picker className={this.state.showEmojis}
                      onSelect={this.addEmoji}
                      emojiTooltip={true}
                      title="Chat"
                      emoji="grinning"
                    />
                  </span>}
                </div>
              </div>
            </div>

          </div>
        }
      </section>

    )
  }
}

export default ChatsShow
