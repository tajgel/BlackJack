import { CardType } from "../Types/cards"

type DealerTypes = {
  cards: Array<CardType>
}


function dealer({ cards }: DealerTypes) {
  console.log(cards)
  return (
    <div id="dealer">
      
    </div>
  )
}

export default dealer