import Card from "../assets/Card"
import { CardType } from "../Types/cards"

type DealerTypes = {
  cards: Array<CardType>,
  flip: boolean
}


function dealer({ cards, flip }: DealerTypes) {
  console.log(cards)
  return (
    <div id="dealer">
      <Card card={cards[0]} rotated={flip} />
      {cards.slice(1).map((card) => (
        <Card card={card} rotated={false}/>
      ))}
    </div>
  )
}

export default dealer