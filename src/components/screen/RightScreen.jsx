import { STAT_LABELS } from '../../constants/types'
import './RightScreen.css'

export default function RightScreen({ pokemon, captured }) {
  if (!pokemon) {
    return (
      <div className="right-screen-top">
        <div className="info-unknown">? ? ? ? ? ?</div>
      </div>
    )
  }
  return (
    <div className="right-screen-top">
      <div className="info-name">
        {pokemon.name}
        {captured && (
          <span style={{ float:'right', color:'#D30A40' }}>★ CAP</span>
        )}
      </div>
      <div className="info-row">
        <span className="info-label">TIPO</span>
        <span>{pokemon.types.join(' / ').toUpperCase()}</span>
      </div>
      {Object.entries(pokemon.stats).map(([k, v]) => (
        <div className="info-row" key={k}>
          <span className="info-label">{STAT_LABELS[k]}</span>
          <span>{v}</span>
        </div>
      ))}
    </div>
  )
}