import React from 'react'

class CreateCard extends React.Component {

  state= {
    input: ''
  }

  handleInput = (e) => {
    e.persist()
    this.setState({
      input: e.target.value
    })
  }

  handleNewCard = (e) => {
    e.preventDefault()
    this.props.createNewCard(this.state.input)
  }
  

  render(){
    return(
      <form onSubmit={this.handleNewCard} className='new-card-form'>
        <h4>Create card</h4>
        <input onChange={this.handleInput} className='new-card-input' type='text' value={this.state.input} />
        <input className='new-card-input' type='submit' value='Create' />
      </form>
    )
  }
}

export default CreateCard