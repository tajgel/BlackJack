import { CardType } from "../Types/cards"
import Card from "../assets/Card"

type HandProps = {
  cards: Array<CardType>
}

function hand({ cards } : HandProps) {
  console.log(cards)
  return (
    <div id="hand">
      {cards.map((card) => (
        <Card card={card} rotated={false}/>
      ))}
    </div>
  )
}

export default hand