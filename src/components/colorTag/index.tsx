import React, {CSSProperties, useState} from 'react'
import PropTypes from 'prop-types'
import {ChromePicker, ColorResult} from 'react-color'

interface IColorTag {
    color?: string
    height?: number
    width?: number
    getColor?: (color: any) => void
    customPopover?: CSSProperties
}

const popover: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    right: '-9%'
}
const cover: CSSProperties = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
}

const ColorTag: React.FC<IColorTag> = ({color = '#000', height = 23, width = 23, getColor, customPopover}) => {
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)

    const handleFontColorChange = (color: ColorResult) => {
        getColor(color)
    }

    return (
        <div>
            <div onClick={() => setDisplayColorPicker(true)}
                 style={{display: 'inlineBlock', background: color, height: height + 'px', width: width + 'px', border: '1px solid #DAE1E4', borderRadius: '3px'}}/>
            {
                displayColorPicker ? (<div style={customPopover || popover}>
                    <div style={cover} onClick={() => setDisplayColorPicker(false)} />
                    <ChromePicker color={color} onChange={handleFontColorChange}/>
                </div>) : null
            }
        </div>
    )
}

export default ColorTag

ColorTag.propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    getColor: PropTypes.func,
    customPopover: PropTypes.object
}
