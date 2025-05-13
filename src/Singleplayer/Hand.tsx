import { CardType } from "../Types/cards"
import Card from "../assets/Card"

type HandProps = {
  cards: Array<CardType>,
  points: number
}

function hand({ cards, points } : HandProps) {
  console.log(cards)
  return (
    <div id="hand">
      <p className="pointsHand">{points}</p>
      {cards.map((card) => (
        <Card card={card} rotated={false}/>
      ))}
    </div>
  )
}

export default hand