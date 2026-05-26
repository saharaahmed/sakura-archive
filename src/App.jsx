import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabase'

//import UploadForm from './components/UploadForm'
import Tree from './components/Tree'
//import GameFilter from './components/GameFilter'

const GAMES = [
    "animal crossing: new horizons",
    "danganronpa another episode: ultra despair girls",
    "danganronpa: trigger happy havoc",
    "danganronpa 2: goodbye despair",
    "danganronpa v3: killing harmony",
    "danganronpa s: ultimate summer camp",
    "fantasy life ds",
    "genshin impact",
    "honkai impact 3rd",
    "honkai: star rail",
    "league of legends",
    "love and deepspace",
    "minecraft",
    "obey me!",
    "overwatch",
    "stardew valley",
    "superstar smtown",
    "tears of themis",
    "the sims 4",
    "tomodachi life: living the dream",
    "valorant",
]

const TYPES = [
    "design",
    "suggestion",
    "tips",
    "surprises",
    "other"
]

export default function App() {
  const [uploads, setUploads] = useState([])
  const [selectedGame, setSelectedGame] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [activeUpload, setActiveUpload] = useState(null)
  const [form, setForm] = useState({ game: "", type: "", title: "", description: "", author: "" })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => { fetchUploads() }, [])

  async function fetchUploads() {
    const { data } = await supabase
      .from("uploads")
      .select("*")
      .order("created_at", { ascending: false })
    if (data) setUploads(data)
  }

  const filtered = uploads.filter(u =>
    (selectedGame === "all" || u.game === selectedGame) &&
    (selectedType === "all" || u.type === selectedType)
  )

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit() {
    if (!form.game || !form.type || !form.title) return
    setLoading(true)
    const { error } = await supabase.from("uploads").insert([form])
    setLoading(false)
    if (!error) {
      setDone(true)
      setForm({ game: "", type: "", title: "", description: "", author: "" })
      fetchUploads()
      setTimeout(() => setDone(false), 3000)
    }
  }

  return (
    <div className="app">
      <div className="topbar">
        <div>
          <div className="topbar-title">sakura archive</div>
          <div className="topbar-sub">a community garden of gaming knowledge</div>
        </div>
        <div className="topbar-count">{uploads.length} blossoms</div>
      </div>

      <div className="body">
        <div className="sidebar">

          <div>
            <div className="sidebar-section-label">browse by game</div>
              <select
                className="game-select"
                value={selectedGame}
                onChange={e => setSelectedGame(e.target.value)}
              >
                <option value="all">all games</option>
                {GAMES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
          </div>

          {/* type filter */}
          <div>
            <div className="sidebar-section-label">filter by type</div>
            <div className="chip-row">
              {["all", ...TYPES].map(t => (
                <span
                  key={t}
                  className={`chip ${selectedType === t ? "active" : ""}`}
                  onClick={() => setSelectedType(t)}
                >{t}</span>
              ))}
            </div>
          </div>

          <hr className="sidebar-divider" />

          {/* upload form */}
          <div>
            <span className="upload-label">add a blossom</span>
            <select value={form.game} onChange={e => set("game", e.target.value)}>
              <option value="">select a game</option>
              {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={form.type} onChange={e => set("type", e.target.value)}>
              <option value="">type</option>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input
              placeholder="title"
              value={form.title}
              onChange={e => set("title", e.target.value)}
            />
            <input
              placeholder="your name (optional)"
              value={form.author}
              onChange={e => set("author", e.target.value)}
            />
            <textarea
              placeholder="describe it or paste a link..."
              value={form.description}
              onChange={e => set("description", e.target.value)}
            />
            <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "planting..." : done ? "added! 🌸" : "plant it 🌸"}
            </button>
          </div>

        </div>

        <div className="main">
          <div className="tree-box">
            <div className="tree-hint">click a blossom to see its content</div>
            <Tree
              uploads={filtered}
              activeUpload={activeUpload}
              setActiveUpload={setActiveUpload}
            />
            {activeUpload && (
              <div className="active-tooltip">
                <div className="tt-type">{activeUpload.type} · {activeUpload.game}</div>
                <div className="tt-title">{activeUpload.title}</div>
                {activeUpload.description && (
                  <div className="tt-desc">{activeUpload.description}</div>
                )}
                <div className="tt-meta">by {activeUpload.author || "anonymous"}</div>
                <button className="tt-close" onClick={() => setActiveUpload(null)}>close ×</button>
              </div>
            )}
          </div>

          <div className="cards-grid">
            {filtered.length === 0 && (
              <div className="empty-state">no blossoms here yet — be the first!</div>
            )}
            {filtered.map(u => (
              <div key={u.id} className="card" onClick={() => setActiveUpload(u)}>
                <span className={`card-type ct-${u.type}`}>{u.type}</span>
                <div className="card-title">{u.title}</div>
                <div className="card-meta">{u.game} · {u.author || "anonymous"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}