import React from 'react'
import CreateCard from '../components/createCard'
import ToDoCardContainer from '../containers/ToDoCardContainer'

export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/cards')
    .then(resp => resp.json())
    .then(cards => {
      this.setState({
        cards: cards
      })
    })
  }

  createNewCard = (input) => {
    fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        title: input
      })
    })
    .then(resp => resp.json())
    .then(newCard =>{
      this.setState({
        cards: [...this.state.cards, newCard]
      })
    })
  }

  addList= (cardId, listInput) => {
    fetch("http://localhost:3000/lists", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        description: listInput,
        completed: false,
        card_id: cardId
      })
    })
    .then(resp => resp.json())
    .then(newList => {
      const foundCard = {...this.state.cards.find( card => card.id === cardId )}
      foundCard.lists = [...foundCard.lists, newList]
      const newCards = this.state.cards.map(card => {
        if (card.id === cardId){
          return foundCard
        } else {
          return card
        }
      })
      this.setState({
        cards: newCards
      })
    })
  }

  render(){
    return(
      <div className='main-container'>
        <ToDoCardContainer cards={this.state.cards}  addList={this.addList}/>
        <CreateCard createNewCard={this.createNewCard} />
      </div>
    )
  }

}
