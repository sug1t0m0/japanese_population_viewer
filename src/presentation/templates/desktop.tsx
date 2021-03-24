import React from 'react'

const DesktopTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>{"Japan's population by prefecture"}</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default DesktopTemplate
