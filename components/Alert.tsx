import React from 'react'

interface Props {
    value: string;
}

export default function Alert({ value }: Props) {
  return (
    <div className='rounded-md bg-red-500 px-5 py-2 text-white'>
      {value}
    </div>
  )
}
