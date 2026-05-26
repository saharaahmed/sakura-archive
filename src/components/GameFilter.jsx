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

export default function GameFilter({selectedGame, setSelectedGame, selectedType, setSelectedType}) {

    return (
        <div className="game-filter">
            <select value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>
                <option value="all">All Games</option>
                {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <div className="chips">
                {TYPES.map(t => (
                    <button key={t} className={selectedType === t ? 'chip selected' : 'chip'}
                    onClick={() => setSelectedType(t)}>{t}</button> ))}
            </div>
        </div>
    )
}