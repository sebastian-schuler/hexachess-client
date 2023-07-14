import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className='mx-auto container my-10'>{children}</div>
  )
}

export default Container