import { useEffect, useState } from "react";
import Dealer from "./Dealer";
import Hand from "./Hand";
import { CardType } from "../Types/cards";
"../App.css"

function SingleplayerBoard() {
  const suits = ["hearts", "diamonds", "spades", "clubs"]
  const values = [
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "jack", value: 10 },
    { name: "queen", value: 10 },
    { name: "king", value: 10 },
    { name: "ace", value: 11 },
  ]
  const unIndexedFullDeck = values.flatMap(({ name, value }) => (
    suits.map((suit) => ({
      value: value,
      suit: suit,
      link: `/Cards/${name}_of_${suit}.png`
    })
    )))
  const fullDeck: Array<CardType> = unIndexedFullDeck.map((card, index) => ({ id: index, value: card.value, suit: card.suit, link: card.link }))
  const [points, setPoints] = useState(1000)
  const [bet, setBet] = useState(0)
  const [deck, setDeck] = useState<Array<CardType>>(fullDeck)
  const [hand, setHand] = useState<Array<CardType>>([fullDeck[1], fullDeck[2]])
  const [dealer, setDealer] = useState<Array<CardType>>([fullDeck[1], fullDeck[2]])
  const [handVal, setHandVal] = useState(0)
  const [dealerVal, setDealerVal] = useState(0)
  const [takenCard, setTakenCard] = useState(0)
  const [flip, setFlip] = useState(true)
  const [refreshPage, setRefreshPage] = useState(false)
  const [action, setAction] = useState("")
  const [canUseAction, setCanUseAction] = useState({
    hit: false,
    split: false,
    stand: false,
    double: false
  })


  useEffect(() => {
    setCanUseAction({ hit: false, split: false, stand: false, double: false })
    if (action === "won") {
      return;
    }
    let tempHand = 0
    hand.map((card) => { tempHand += card.value })
    let tempDealer = 0
    dealer.map((card) => { tempDealer += card.value })
    setHandVal(tempHand)
    if (flip) {
      setDealerVal(tempDealer - dealer[0].value)
    }
    else {
      setDealerVal(tempDealer)
    }
    console.log(tempDealer)
    console.log(tempHand)

    if (tempDealer > 21) {
      let aces = dealer.filter(card => card.value === 11).flat()
      console.log("ASY BRUDASY!!!! ============== ")
      aces.map((ace) => (console.log(ace)))
      console.log("ASY BRUDASY!!!! ============== ")
      let tempDealerVal = tempDealer;
      for (let i = 0; i < aces.length; i++) {
        tempDealerVal -= 10
        if (tempDealerVal < 21) {
          setHand(hand.map((card) => card.id === aces[i].id ? { ...card, value: 1 } : card))
          setRefreshPage(!refreshPage)
          return;
        }
      }
      endRound("you")
    }
    else if (tempHand > 21) {
      let aces = hand.filter(card => card.value === 11).flat()
      console.log("ASY BRUDASY!!!! ============== ")
      aces.map((ace) => (console.log(ace)))
      console.log("ASY BRUDASY!!!! ============== ")
      let tempHandVal = tempHand;
      for (let i = 0; i < aces.length; i++) {
        tempHandVal -= 10
        if (tempHandVal < 21) {
          setHand(hand.map((card) => card.id === aces[i].id ? { ...card, value: 1 } : card))
          setRefreshPage(!refreshPage)
          return;
        }
      }
      endRound("dealer")
    }
    if (action === "start") {
      if (tempDealer === 21 && tempHand !== 21) {
        setRefreshPage(!refreshPage)
        endRound("dealer")
      }
      else if (tempHand === 21 && tempDealer !== 21) {
        setRefreshPage(!refreshPage)
        endRound("you")
      }
      else if (tempDealer === 21 && tempHand === 21) {
        setRefreshPage(!refreshPage)
        endRound("draw")
      }
      else {
        setCanUseAction({ split: true, stand: true, hit: true, double: true })
      }
    }
    else if (action === "reshuffle") {
      setDealer([deck[takenCard], deck[takenCard+1]])
      setHand([deck[takenCard + 2], deck[takenCard + 3]])
      setRefreshPage(!refreshPage)
    }
    else if (action === "hit") {
      if (tempHand > 21) {
        endRound("dealer")
      }
      else if (tempHand === 21) {
        setAction("stand")
        setRefreshPage(!refreshPage)
      }
      else if (tempHand < 21) {
        setCanUseAction({ split: true, stand: true, hit: true, double: true })
      }
      else {
        console.error("Error in hit checking")
      }
    }
    else if (action === "stand") {
      if (tempDealer > 21) {
        endRound("you")
      }
      else if (tempDealer >= 17) {
        
        if (tempDealer < tempHand) {
          endRound("you")
        }
        else if (tempDealer > tempHand) {
          endRound("dealer")
        }
        else if (tempDealer === tempHand) {
          endRound("draw")
        }
        else {
          console.error("Error in stand checking bigger or equal to 17")
        }
      }
      else if (tempDealer < 17) {
        setDealer([dealer, deck[takenCard + 4]].flat())
        setTakenCard(takenCard + 1)
        setRefreshPage(!refreshPage)
      }
    }
  }, [refreshPage])

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

  function StartGame() {
    setDeck(ShuffleDeck(deck))
    StartRound()
  }

  function StartRound() {
    setFlip(true)
    if (deck.length > 4) {
      setDealer([deck[takenCard], deck[takenCard+1]])
      setHand([deck[takenCard+2], deck[takenCard+3]])
    }
    else if (deck.length < 4) {
      setDeck(prev => [prev, ShuffleDeck(fullDeck)].flat())
      setAction("reshuffle")
      setRefreshPage(!refreshPage)
    }
    setDeck(cards => cards.filter((card) => card !== (cards[1] || cards[2] || cards[3] || cards[4])))
    let tempHand = 0
    hand.map((card) => { tempHand += card.value })
    let tempDealer = 0
    dealer.map((card) => { tempDealer += card.value })
    console.log(tempDealer)
    console.log(tempHand)
    setAction("start")
    setRefreshPage(!refreshPage)
    setCanUseAction({ split: true, stand: true, hit: true, double: true })
  }

  function hit() {
    if (canUseAction.hit) {
      setHand([hand, deck[takenCard + 4]].flat())
      setTakenCard(takenCard + 1)
      setAction("hit")
      setRefreshPage(!refreshPage)
    }
  }
  function stand() {
    if (canUseAction.stand) {
      setFlip(false);
      setAction("stand")
      setRefreshPage(!refreshPage)
    }
  }

  function split() {
    if (canUseAction.split) {

    }
  }
  function double() {
    if (canUseAction.double) {

    }
  }

  function endRound(winner: string) {
    setAction("won")
    setFlip(false)
    if (winner === "dealer") {
      console.log("dealer won!")
    }
    else if (winner === "you") {
      console.log("you won!")
    }
    else if (winner === "draw") {
      console.log("draw")
    }
    else {
      console.error("game ERROR")
    }
  }
  return (
    <div id="singlePlayerBoard">
      <div id="actions">
        <button onClick={StartGame}>Start Game</button>
        <button onClick={hit}>HIT</button>
        <button onClick={stand}>STAND</button>
        <button onClick={split}>SPLIT</button>
        <button onClick={double}>DOUBLE</button>
      </div>
      <img style={{ backgroundColor: "red" }} src="../../chip-50.png"/>
      <Dealer cards={dealer} flip={flip} points={dealerVal} />
      <p>{points}</p>
      <input type="number" onChange={event => setBet(Number(event.target.value))}/> 
      <Hand cards={hand} points={handVal} />
    </div>
  )
}

export default SingleplayerBoard