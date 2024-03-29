import React, { ReactElement, ReactNode, useContext } from 'react'
import { CursorIcon } from '../../icons/CursorIcon'
import { GrabberIcon } from '../../icons/GrabberIcon'
import { SVGElementInterface } from '../../types/components'
import { darkContext } from '../../contexts/darkContext'
import ShadTooltip from '../ShadTooltipComponent'

type DoubleButtonType = {
  First: ({ }: SVGElementInterface) => JSX.Element
  Second: ({ }: SVGElementInterface) => JSX.Element
  setFunction: Function
  isActive: boolean
  shadContent: string
  className?: string
}

export const DoubleButton = ({ First, Second, isActive, setFunction, shadContent }: DoubleButtonType) => {

  const { dark } = useContext(darkContext)

  return (
    <ShadTooltip side='bottom' content={shadContent}>
      <div className=" header-double-button ">
        <button onClick={() => setFunction(false)} className={` double-button-button ${!isActive ? "double-button-button-active" : ""}  `}>
          <First fill={isActive ? (dark ? "rgba(255, 255, 255, 0.5)" : "#8D96B5") : (dark ? "white" : "black")} />
        </button>
        <button onClick={() => setFunction(true)} className={` double-button-button ${isActive ? "double-button-button-active" : ""}  `}>
          <Second fill={!isActive ? (dark ? "rgba(255, 255, 255, 0.5)" : "#8D96B5") : (dark ? "white" : "black")} />
        </button>
      </div>
    </ShadTooltip>
  )
}
