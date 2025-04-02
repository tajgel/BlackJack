import { createRoot } from 'react-dom/client'
import App from './App/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Singleplayer from './Singleplayer/Singleplayer.tsx'
import Multiplayer from './Multiplayer/Multiplayer.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={[<App />]} />
            <Route path='/singleplayer' element={[<Singleplayer />]} />
            <Route path='/multiplayer' element={[<Multiplayer />]} />
        </Routes>
    </BrowserRouter>
)
