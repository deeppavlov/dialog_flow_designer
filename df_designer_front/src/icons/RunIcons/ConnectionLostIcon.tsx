import React from 'react'
import { SVGElementInterface } from '../../types/components'

const ConnectionLostIcon = ({ className }: SVGElementInterface) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.8824 8.59705C20.1565 8.59705 22 10.3997 22 12.6233C22 14.847 20.1565 16.6496 17.8824 16.6496L13 16.6497M16.8589 4L8 19.6496M12.5 5.24417C12.1473 5.17966 11.7836 5.14593 11.4118 5.14593C8.56526 5.14593 6.19098 7.12293 5.64669 9.74929C5.60776 9.74804 5.56866 9.74742 5.52941 9.74742C3.58017 9.74742 2 11.2925 2 13.1985C2 15.1045 3.58017 16.6496 5.52941 16.6496L6 16.6497" stroke="#FF3333" stroke-width="1.5" stroke-linecap="round" />
      <path d="M17.8824 8.59705C20.1565 8.59705 22 10.3997 22 12.6233C22 14.847 20.1565 16.6496 17.8824 16.6496L13 16.6497M16.8589 4L8 19.6496M12.5 5.24417C12.1473 5.17966 11.7836 5.14593 11.4118 5.14593C8.56526 5.14593 6.19098 7.12293 5.64669 9.74929C5.60776 9.74804 5.56866 9.74742 5.52941 9.74742C3.58017 9.74742 2 11.2925 2 13.1985C2 15.1045 3.58017 16.6496 5.52941 16.6496L6 16.6497" stroke="black" stroke-opacity="0.15" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  )
}

export default ConnectionLostIcon