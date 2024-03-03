import MainHeader from './MainHeader'
import Player from './Player'

interface Song {
  song: string
  artist: string
  progress: string
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface SongRecord extends Song {
  [key: string]: string
}

export default function Home (): JSX.Element {
  const song: SongRecord = {
    song: 'Hello',
    artist: 'Adele',
    progress: '45%'
  }

  return (
    <main className="mx-5">
      <MainHeader />
      <div className="mb-5">
        Insert Recommendations here
      </div>
      <Player current={song} next={{ hello: 'hello' }}/>
    </main>
  )
}
