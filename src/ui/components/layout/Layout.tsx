import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">TO DO App</h1>
      </header>
      
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">
                Todas
              </Link>
            </li>
            <li>
              <Link to="/completed" className="text-white hover:text-gray-300">
                Completadas
              </Link>
            </li>
            <li>
              <Link to="/pending" className="text-white hover:text-gray-300">
                Pendientes
              </Link>
            </li>
          </ul>
        </nav>
      
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        UMES
      </footer>
    </div>
  )
}
