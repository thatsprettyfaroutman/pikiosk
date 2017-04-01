import React from 'react'
import classNames from 'classnames'

import './Container.css'

export default ({ children, className, style }) => (
  <div className={classNames('Container', className)} style={style}>
    { children }
  </div>
)
