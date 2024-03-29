import React from 'react'

export const DragIcon = ({ className, fill }: { className?: string, fill?:string }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 7C5 6.59375 5.3125 6.25 5.75 6.25H18.25C18.6562 6.25 19 6.59375 19 7C19 7.4375 18.6562 7.75 18.25 7.75H5.75C5.3125 7.75 5 7.4375 5 7ZM5 12C5 11.5938 5.3125 11.25 5.75 11.25H18.25C18.6562 11.25 19 11.5938 19 12C19 12.4375 18.6562 12.75 18.25 12.75H5.75C5.3125 12.75 5 12.4375 5 12ZM18.25 17.75H5.75C5.3125 17.75 5 17.4375 5 17C5 16.5938 5.3125 16.25 5.75 16.25H18.25C18.6562 16.25 19 16.5938 19 17C19 17.4375 18.6562 17.75 18.25 17.75Z" fill={fill} />
    </svg>
  )
}
