
import { Route, Routes } from 'react-router'
import { LayoutMain } from './parts/layout'
import { Dashboard } from './pages/dashboard'

export const AppRoutes: React.FC = () => {
    return <Routes>
        <Route path='/' element={<LayoutMain />}>
            <Route path='/' element={<Dashboard />}/>
        </Route>
    </Routes>
}