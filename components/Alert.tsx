import React from 'react'

type Props = {
    value: string;
}

export default function Alert({ value }: Props) {
  return (
    <div className='rounded-md bg-red-400 px-5 py-2 text-white'>
      {value}
    </div>
  )
}
