import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className='py-10 px-4 sm:px-20 md:px-32'>{children}</div>
  )
}

export default Container