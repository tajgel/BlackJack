import { CardType } from "../Types/cards"


type CardProps = {
  card: CardType,
  rotated: boolean
}

function Card({ card, rotated }: CardProps) {
  return (
    <div>
      {rotated === true ?  <img src="../Cards/back.png" className="card"/>  :  <img src={card.link} className="card" />}
  </div>
  )
}

export default Card