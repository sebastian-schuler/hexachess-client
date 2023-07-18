import React from 'react'

type ContainerProps = {
    children: React.ReactNode
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className='py-8 px-8 sm:px-20 sm:py-14 md:px-32'>{children}</div>
  )
}

export default Container