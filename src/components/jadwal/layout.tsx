import React from 'react'
import TablePage from './table'
import SearchPage from './search'
import CreateButton from './buttonCreate'

const LayoutPage = () => {
    return (
        <div className='max-w-screen-lg mx-auto mt-5'>
            <div className="flex items-center justify-between gap-1 mb-5">
                <SearchPage />
                <CreateButton />
            </div>
            <TablePage />
        </div>
    )
}

export default LayoutPage