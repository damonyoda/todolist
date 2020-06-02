import React from 'react'
import ToDoList from './ToDoList'

class ToDoCard extends React.Component {
  state={
    input: ''
  }

  handleListInput= (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleListSubmit= (e) => {
    e.preventDefault()
    this.props.addList(this.props.card.id, this.state.input)
    this.setState({
      input: ''
    })
  }

  renderLists(){
    const lists = this.props.card.lists
    lists.length > 0 && lists.map(list => {
      console.log(list.id)
      return <ToDoList key={list.id} cardId={this.props.card.id} list={list}/>
    })
  }


  render() {
    return(
      <div className='to-do-card'>
        <h4>{this.props.card.title}</h4>
        <form onSubmit={this.handleListSubmit}>
          <input onChange={this.handleListInput} type='text' value={this.state.input} />
        </form>
        {this.renderLists()}
      </div>
    )
  }
}

export default ToDoCard