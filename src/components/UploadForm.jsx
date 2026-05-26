import {useState} from 'react'
import {supabase} from '../supabase'

const GAMES = [
    "animal crossing: new horizons",
    "danganronpa another episode: ultra despair girls",
    "danganronpa: trigger happy havoc",
    "danganronpa 2: goodbye despair",
    "danganronpa v3: killing harmony",
    "danganronpa s: ultimate summer camp",
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

export default function UploadForm({onSuccess}) {

        const [form, setForm] = useState({game: '', type: '', title: '', description: '', author: ''})
        const [loading, setLoading] = useState(false)
        const [done, setDone] = useState(false)

        const set = (k,v) => setForm({...form, [k]: v})

        async function handleSubmit() {

            if (!form.game || !form.type || !form.title) return
            setLoading(true)
            const {error} = await supabase
                .from('uploads')
                .insert([form])
            setLoading(false)

            if (!error) {
                setDone(true)
                setForm({game: '', type: '', title: '', description: '', author: ''})
                onSuccess()
                setTimeout(() => setDone(false), 2000)
            }
        }

        return (
            <div className="upload-form">
                <h2>Add to The Archive!</h2>
                <input placeholder="Your name (optional)" value={form.author} onChange={e => set('author', e.target.value)} />
                <select value={form.game} onChange={e => set('game', e.target.value)}>
                    <option value="">Select Game</option>
                    {GAMES.map(game =><option key={game} value={game}>{game}</option>)}
                </select>

                <select value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value="">Select Type</option>
                    {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

                <input placeholder="Title" value={form.title} onChange={e => set('title', e.target.value)} />
                <textarea rows={3} placeholder="Description (optional)"
                    value={form.description} onChange={e => set('description', e.target.value)} />
                <button onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                {done && <span className="success">Thanks for your contribution!</span>}
            </div>

        )
    }
