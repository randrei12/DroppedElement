import { IF_Elements } from "../interfaces/configuration"
import { Content, FontSize, Height, Src, Width } from "./config/styles";

const config: IF_Elements = {
    text: {
        html: 'span',
        styles: [
            FontSize(16, 'px')
        ],
        extras: [
            Content('Text')
        ],
        alignment: ['content', 'fontSize'],
        canHaveChildren: false
    },
    button: {
        html: 'button',
        styles: [
            FontSize(16, 'px')
        ],
        extras: [],
        alignment: ['content', 'fontSize'],
        canHaveChildren: false
    },
    image: {
        html: 'img',
        styles: [
            Width(50, 'px'), 
            Height(50, 'px')
        ],
        extras: [
            Src('https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png')
        ],
        alignment: ['src', 'width', 'height'],
        canHaveChildren: false,
    },
    group: {
        html: 'div',
        styles: [
            Width(100, '%'), 
            Height(100, '%')
        ],
        extras: [],
        alignment: [],
        canHaveChildren: true,
    },
    screen: {
        html: 'div',
        styles: [],
        extras: [],
        alignment: [],
        canHaveChildren: true,
    }
}

export default config;