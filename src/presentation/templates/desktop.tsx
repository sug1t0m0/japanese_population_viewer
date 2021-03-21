import React from 'react'

const DesktopTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>Japanese Population Viewer</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default DesktopTemplate
