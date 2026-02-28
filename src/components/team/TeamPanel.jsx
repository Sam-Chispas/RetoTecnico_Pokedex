import { TYPE_COLORS } from '../../constants/types'
import './TeamPanel.css'

export default function TeamPanel({ team, onRemove }) {
  return (
    <div className="team-wrap">
      <div className="team-label">&gt; EQUIPO [{team.length}/6]</div>
      <div className="team-slots">
        {Array.from({ length: 6 }).map((_, i) => {
          const p = team[i]
          const color = p ? TYPE_COLORS[p.types[0]] : null
          return (
            <div
              key={i}
              className={`team-slot ${p ? 'filled' : ''}`}
              onClick={() => p && onRemove(p)}
              title={p ? `Retirar a ${p.name}` : 'Vacío'}
              style={p ? { boxShadow: `inset 0 0 12px ${color}33` } : {}}
            >
              {p ? (
                <>
                  <img src={p.spriteSmall} alt={p.name} />
                  <div className="team-slot-dot" />
                </>
              ) : (
                <div className="team-slot-empty" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}