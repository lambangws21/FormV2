// card-ui.tsx
"use client"

import React, { ReactNode, HTMLAttributes } from "react"
import cx from "classnames"

interface CardUiProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  className?: string
  animated?: boolean
  delay?: string
}

export default function CardUi({
  children,
  className,
  animated,
  delay,
  ...props
}: CardUiProps) {
  return (
    <div
      className={cx(
        "rounded-md bg-white shadow",
        animated && "animate-fadeSlideUp", // class animasi kustom
        className
      )}
      style={{ animationDelay: delay }} // terapkan delay
      {...props}
    >
      {children}
    </div>
  )
}
