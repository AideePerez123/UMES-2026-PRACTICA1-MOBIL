import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CompletedPage from '../pages/CompletedPage'
import PendingPage from '../pages/PendingPage' 
import Layout from '../components/layout/Layout'

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/pending" element={<PendingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
