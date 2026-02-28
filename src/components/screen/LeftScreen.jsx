import { useEffect, useRef } from 'react'
import { TYPE_COLORS } from '../../constants/types'
import './LeftScreen.css'

export default function LeftScreen({ pokemon }) {
  const contentRef = useRef(null)
  const prevId     = useRef(null)

  useEffect(() => {
    if (!pokemon || !contentRef.current) return
    if (prevId.current === pokemon.id) return
    prevId.current = pokemon.id
    const el = contentRef.current
    el.style.animation = 'none'
    void el.offsetWidth
    el.style.animation = ''
  }, [pokemon?.id])

  const glowColor = pokemon ? TYPE_COLORS[pokemon.types[0]] : 'transparent'

  return (
    <div className="screen">
      {pokemon ? (
        <div className="screen-content" ref={contentRef}>
          <span className="screen-id-tag">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <div className="screen-glow" style={{ background: glowColor }} />
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="screen-sprite"
          />
        </div>
      ) : (
        <div className="screen-empty">???</div>
      )}
    </div>
  )
}