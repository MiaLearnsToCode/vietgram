import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class GemsShow extends React.Component {
  constructor() {
    super()

    this.state = { gem: {}, comment: {} }
  }

  getData() {
    axios.get(`/api/gems/${this.props.match.params.gemId}`, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(res => this.setState({ gem: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData()
  }

  isOwner(comment) {
    return Auth.getPayload().sub === comment.user._id
  }

  render() {
    console.log(this.state)
    if (!this.state.gem) return null
    const { gem } = this.state
    // const { user } = this.state
    console.log(this.state)
    return (
    // <h1>{this.state.gem.location}</h1>
      <section className="section">
        <div className="container">
          <Fragment>
            <h2 className="title">{gem.name}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img src={gem.image} alt={gem.name} />
                </figure>
              </div>
              <div className="column is-half">
                <h4 className="title is-4">Caption</h4>
                <p>{gem.caption}</p>
                <hr />
                <h4 className="title is-4">Location</h4>
                <p>{gem.location}</p>
                <hr />
                <h4 className="title is-4">User</h4>
                <p>{gem.username}</p>
                <hr />
                <h4 className="title is-4">Category</h4>
                <p>{gem.category}</p>
                <hr />
              </div>
            </div>
          </Fragment>
        </div>
      </section>
    )
  }
}

export default GemsShow
