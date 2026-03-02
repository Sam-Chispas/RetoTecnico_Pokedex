import { useState, useEffect, useCallback } from 'react'
import { fetchPokemon } from './api/pokemon'
import LeftScreen  from './components/screen/LeftScreen'
import RightScreen from './components/screen/RightScreen'
import TeamPanel   from './components/team/TeamPanel'
import PokeCard    from './components/catalog/PokeCard'
import './styles/console.css'
import './components/Catalog/PokeCard.css'

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)
  const [captured, setCaptured] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('pokedex-captured')) || []
  } catch { return [] }
})

const [team, setTeam] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('pokedex-team')) || []
  } catch { return [] }
})
  const [search, setSearch]     = useState('')

  useEffect(() => {
  localStorage.setItem('pokedex-captured', JSON.stringify(captured))
}, [captured])

useEffect(() => {
  localStorage.setItem('pokedex-team', JSON.stringify(team))
}, [team])

  useEffect(() => {
    const ids = Array.from({ length: 151 }, (_, i) => i + 1)
    let cancelled = false
    const results = []

    async function loadBatch(start) {
      if (cancelled) return
      const batch = await Promise.all(
        ids.slice(start, start + 20).map(id => fetchPokemon(id).catch(() => null))
      )
      if (cancelled) return
      batch.forEach(p => p && results.push(p))
      setPokemons([...results])
      if (start + 20 < ids.length) loadBatch(start + 20)
      else setLoading(false)
    }
    loadBatch(0)
    return () => { cancelled = true }
  }, [])

  const handleCapture = useCallback((pokemon) => {
    setCaptured(prev => {
      const has = prev.includes(pokemon.id)
      if (has) {
        setTeam(t => t.filter(p => p.id !== pokemon.id))
        return prev.filter(id => id !== pokemon.id)
      }
      setTeam(t => {
        if (t.find(p => p.id === pokemon.id) || t.length >= 6) return t
        return [...t, pokemon]
      })
      return [...prev, pokemon.id]
    })
  }, [])


  const isCaptured = (id) => captured.includes(id)

  const filtered = pokemons.filter(p => {
    const q = search.toLowerCase().trim()
    return !q || p.name.includes(q) || String(p.id).includes(q)
  })

  return (
    <>
      <div className="console">
        {/* Izquierda */}
        <div className="console_left_back" />
        <div className="console_left_front">
          <div className="sphere-glow" />
          <div className="leds">
            <div className="led led-red" />
            <div className="led led-yellow" />
            <div className="led led-green" />
          </div>
          <div className="screen-panel">
            <div className="screen-dots">
              <div className="dot" /><div className="dot" />
            </div>
            <LeftScreen pokemon={selected} />
          </div>
          <div className="controls-left">
            <div className="joystick" />
            <div className="btn-bar btn-bar-red" />
            <div className="btn-bar btn-bar-blue" />
          </div>
          <div className="dpad">
            <div className="dpad-h" />
            <div className="dpad-v" />
            <div className="dpad-center" />
          </div>
          <div className="btn-green-bar" />
        </div>

        {/* Bisagra */}
        <div className="hinge" />

        {/* Derecha */}
        <div className="console_right_back" />
        <div className="console_right_front">
          <RightScreen
            pokemon={selected}
            captured={isCaptured(selected?.id)}
          />
          <div className="keyboard">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="key" />
            ))}
          </div>
          <div className="searchbar-wrap">
            <input
              className="searchbar"
              placeholder="> BUSCAR..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <TeamPanel team={team} />
        </div>
      </div>

      {/* Catálogo */}
      <div className="catalog">
        {loading && pokemons.length === 0
          ? Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="skeleton" />
            ))
          : filtered.map(p => (
              <PokeCard
                key={p.id}
                pokemon={p}
                selected={selected?.id === p.id}
                captured={isCaptured(p.id)}
                teamFull={team.length >= 6}
                onSelect={setSelected}
                onCapture={handleCapture}
              />
            ))
        }
      </div>
    </>
  )
}