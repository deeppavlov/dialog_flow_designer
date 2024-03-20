import React from 'react'
import { SVGElementInterface } from '../../types/components'

export const ManageIcon = ({fill, className}: SVGElementInterface) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='none'>
      <path d="M16.75 2V6C16.75 6.41 17.09 6.75 17.5 6.75C17.91 6.75 18.25 6.41 18.25 6V2C18.25 1.59 17.91 1.25 17.5 1.25C17.09 1.25 16.75 1.59 16.75 2Z" fill={fill} fillOpacity="0.7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.75 14.663L16.75 22C16.75 22.41 17.09 22.75 17.5 22.75C17.91 22.75 18.25 22.41 18.25 22L18.25 14.663C19.6833 14.3245 20.75 13.0368 20.75 11.5C20.75 9.70507 19.2949 8.25 17.5 8.25C15.7051 8.25 14.25 9.70508 14.25 11.5C14.25 13.0368 15.3166 14.3245 16.75 14.663ZM19.25 11.5C19.25 12.4665 18.4665 13.25 17.5 13.25C16.5335 13.25 15.75 12.4665 15.75 11.5C15.75 10.5335 16.5335 9.75 17.5 9.75C18.4665 9.75 19.25 10.5335 19.25 11.5Z" fill={fill} fillOpacity="0.7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.75 22L5.75 18.663C4.31665 18.3245 3.25 17.0368 3.25 15.5C3.25 13.7051 4.70507 12.25 6.5 12.25C8.29493 12.25 9.75 13.7051 9.75 15.5C9.75 17.0368 8.68335 18.3245 7.25 18.663L7.25 22C7.25 22.41 6.91 22.75 6.5 22.75C6.09 22.75 5.75 22.41 5.75 22ZM6.5 17.25C7.4665 17.25 8.25 16.4665 8.25 15.5C8.25 14.5335 7.4665 13.75 6.5 13.75C5.5335 13.75 4.75 14.5335 4.75 15.5C4.75 16.4665 5.5335 17.25 6.5 17.25Z" fill={fill} fillOpacity="0.7" />
      <path d="M5.75 2L5.75 10C5.75 10.41 6.09 10.75 6.5 10.75C6.91 10.75 7.25 10.41 7.25 10L7.25 2C7.25 1.59 6.91 1.25 6.5 1.25C6.09 1.25 5.75 1.59 5.75 2Z" fill={fill} fillOpacity="0.7" />
    </svg>
  )
}