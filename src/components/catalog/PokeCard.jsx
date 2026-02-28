import { TYPE_COLORS } from '../../constants/types'
import './PokeCard.css'

export default function PokeCard({
  pokemon, selected, captured, teamFull,
  onSelect, onCapture
}) {
  return (
    <div
      className={`poke-card ${selected ? 'selected' : ''} ${captured ? 'captured' : ''}`}
      onClick={() => onSelect(pokemon)}
    >
      <img src={pokemon.spriteSmall} alt={pokemon.name} className="card-sprite" />
      <span className="card-id">#{String(pokemon.id).padStart(3, '0')}</span>
      <span className="card-name">{pokemon.name}</span>
      <div className="card-types">
        {pokemon.types.map(t => (
          <span
            key={t}
            className="type-badge"
            style={{ background: TYPE_COLORS[t] }}
          >
            {t}
          </span>
        ))}
      </div>
      <button
        className={`capture-btn ${captured ? 'off' : 'on'}`}
        disabled={!captured && teamFull}
        onClick={e => { e.stopPropagation(); onCapture(pokemon) }}
        style={!captured && teamFull ? { opacity:0.3, cursor:'not-allowed' } : {}}
      >
        {captured ? 'LIBERAR' : teamFull ? 'LLENO' : 'CAPTURAR'}
      </button>
    </div>
  )
}