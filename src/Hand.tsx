import { CardType } from "./Types/cards"


type HandProps = {
  currentDeck: Array<CardType>,
  fullDeck: Array<CardType>
}

function hand({ currentDeck, fullDeck } : HandProps) {
  console.log(currentDeck)
  console.log(fullDeck)
  return (
    <div id="hand">
      
    </div>
  )
}

export default hand