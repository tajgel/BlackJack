import { useState } from "react";
import Dealer from "./Dealer";
import Hand from "./Hand";
import { CardType } from "../Types/cards";
"../App.css"

function SingleplayerBoard() {
  const suits = ["hearts", "diamonds", "spades", "clubs"]
  const values = [
    {name: "2", value: 2},
    {name: "3", value: 3},
    {name: "4", value: 4},
    {name: "5", value: 5},
    {name: "6", value: 6},
    {name: "7", value: 7},
    {name: "8", value: 8},
    {name: "9", value: 9},
    {name: "10", value: 10},
    {name: "jack", value: 10},
    {name: "queen", value: 10},
    {name: "king", value: 10},
    {name: "ace", value: 11},
  ]
  const fullDeck :Array<CardType> = values.flatMap(({name, value}) => (
    suits.map((suit) => ({
      value: value,
      suit: suit,
      link: `/Cards/${name}_of_${suit}.png`
    })
  )))
  const [deck, setDeck] = useState<Array<CardType>>(fullDeck)
  const [hand, setHand] = useState<Array<CardType>>([fullDeck[1], fullDeck[2]])
  const [dealer, setDealer] = useState<Array<CardType>>([fullDeck[1], fullDeck[2]])
  const [canUseAction, setCanUseAction] = useState(false)


  function ShuffleDeck(array: Array<CardType>) {
    for (let i = array.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1)); // Losowy indeks od 0 do i
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Zamiana miejscami
    }
    for (let i = array.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1)); // Losowy indeks od 0 do i
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Zamiana miejscami
    }
    for (let i = array.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1)); // Losowy indeks od 0 do i
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Zamiana miejscami
    }
    for (let i = array.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1)); // Losowy indeks od 0 do i
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Zamiana miejscami
    }
    return array
  }

  function StartGame(){
    setDeck(ShuffleDeck(fullDeck))
    StartRound()
  }

  function StartRound(){
    setDealer([deck[1], deck[2]])
    setHand([deck[3], deck[4]])
    setDeck(cards => cards.filter((card) => card !== (cards[1] || cards[2] || cards[3] || cards[4])))
    while(deck.length!==0){
      //TODO
    }
  }
  return (
    <div>
      {/*fullDeck.map((card) => (<img src={card.link} className="card"/>))*/}
      <button onClick={StartGame}>Start Game</button>
      <button>HIT</button>
      <button>STAND</button>
      <button>SPLIT</button>
      <button>DOUBLE</button>
      <Dealer cards={dealer}/>
      <Hand cards={hand}/>
    </div>
  )
}

export default SingleplayerBoard