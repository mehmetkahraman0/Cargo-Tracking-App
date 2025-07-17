import React from 'react'
import { Link } from 'react-router-dom'

const Found404Page: React.FC = () => {
    return (
        <div className="h-screen w-full flex flex-col pt-60 items-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
            <p className="text-sm mt-2 text-gray-500">The page you are looking for does not exist or you may not have authorization.</p>
            <Link
                to="/"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-[14px]"
            >
                Return Home Page
            </Link>
        </div>
    )
}

export default Found404Page