import Card from "../assets/Card"
import { CardType } from "../Types/cards"

type DealerTypes = {
  cards: Array<CardType>,
  flip: boolean,
  points: number
}


function dealer({ cards, flip, points }: DealerTypes) {
  console.log(cards)
  return (
    <div id="dealer">
      <p className="pointsDealer">{points}</p>
      <Card card={cards[0]} rotated={flip} />
      {cards.slice(1).map((card) => (
        <Card card={card} rotated={false}/>
      ))}
    </div>
  )
}

export default dealer