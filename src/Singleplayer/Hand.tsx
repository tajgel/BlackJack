import { CardType } from "../Types/cards"


type HandProps = {
  cards: Array<CardType>
}

function hand({ cards } : HandProps) {
  console.log(cards)
  return (
    <div id="hand">
      
    </div>
  )
}

export default hand