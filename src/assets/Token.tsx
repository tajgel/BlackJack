type TokenType = {
  isDraggable: boolean
}

function Token({ isDraggable } : TokenType) {
  return (
    <img draggable={isDraggable} />
  )
}

export default Token