import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

const SearchPage = () => {
  return (
    <div className='relative flex flex-1 gap-2'>
        <Input type='text' placeholder='Cari nama pasien' />
    </div>
  )
}

export default SearchPage