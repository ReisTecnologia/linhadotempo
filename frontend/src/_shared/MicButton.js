import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from './colors'

const Wrapper = styled.div`
  cursor: pointer;
`

export const MicButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="15.000000pt"
        height="18.000000pt"
        viewBox="0 0 820.000000 1060.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,1060.000000) scale(0.100000,-0.100000)"
          fill={colors.black}
          stroke="none"
        >
          <path
            d="M3950 10194 c-81 -10 -239 -48 -319 -76 -186 -66 -345 -165 -493
-307 -217 -208 -343 -433 -410 -732 l-23 -104 0 -1925 0 -1925 23 -104 c67
-299 193 -525 409 -731 196 -188 415 -303 686 -362 150 -32 419 -32 566 0 284
64 514 187 710 384 197 196 329 445 388 728 17 80 18 203 18 2010 0 1807 -1
1930 -18 2010 -89 425 -349 778 -719 975 -199 106 -388 154 -623 160 -88 2
-176 1 -195 -1z"
          />
          <path
            d="M1553 5636 c-154 -50 -242 -168 -251 -334 -6 -111 14 -336 44 -502
79 -433 255 -833 523 -1190 102 -136 297 -340 436 -458 203 -171 526 -363 779
-462 131 -51 328 -107 479 -135 78 -15 152 -29 165 -31 l22 -4 0 -710 0 -710
-743 -2 -742 -3 -67 -33 c-77 -38 -130 -92 -167 -171 -22 -47 -26 -70 -26
-141 0 -71 4 -94 26 -141 37 -79 90 -133 167 -171 l67 -33 1835 0 1835 0 67
33 c77 38 130 92 167 171 22 47 26 70 26 141 0 76 -4 93 -33 152 -38 77 -92
130 -171 167 l-56 26 -742 3 -743 2 0 710 0 710 23 4 c12 2 74 14 137 25 471
84 930 302 1300 616 112 95 308 299 391 405 375 482 589 1077 593 1650 l1 165
-33 66 c-38 78 -92 131 -171 168 -47 22 -70 26 -141 26 -71 0 -94 -4 -141 -26
-79 -37 -133 -90 -170 -165 -30 -61 -33 -75 -40 -217 -19 -343 -85 -605 -225
-882 -112 -220 -236 -387 -427 -571 -520 -502 -1254 -696 -1962 -518 -359 90
-670 264 -943 529 -401 387 -609 856 -641 1440 -7 130 -11 159 -33 207 -56
122 -168 198 -301 204 -43 3 -89 -2 -114 -10z"
          />
        </g>
      </svg>
    </Wrapper>
  )
}

MicButton.propTypes = {
  onClick: PropTypes.func,
}
