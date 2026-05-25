const GAMES = [
    "Animal Crossing: New Horizons",
    "Stardew Valley",
    "Tomodachi Life: Living the Dream",
    "The Sims 4",
    "Minecraft",
    "Danganronpa: Trigger Happy Havoc",
    "Danganronpa 2: Goodbye Despair",
    "Danganronpa Another Episode: Ultra Despair Girls",
    "Danganronpa V3: Killing Harmony",
    "Danganronpa S: Ultimate Summer Camp",
    "Love and Deepspace",
    "Tears of Themis",
    "SUPERSTAR SMTOWN",
    "Honkai: Star Rail",
    "Honkai Impact 3rd",
    "Genshin Impact",
    "Obey Me!",
    "League of Legends",
    "Valorant",
    "Overwatch"]

const TYPES = [
    "Design",
    "Suggestion",
    "Tips & Tricks",
    "Easter Egg",
    "Other"
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