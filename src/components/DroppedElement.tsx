import config from "../design/configuration";
import { IF_SerializedElement } from "../interfaces/DroppedElement";

export default function DroppedElement({ target } : { target: IF_SerializedElement }) {
    const Tag = config[target.type].html as keyof JSX.IntrinsicElements;

    let content: string | number | false = false;
    let styles: { [key: string]: string } = {};

    target.styles.forEach(style => {
        switch (style.type) {
            case 'content':
                content = style.value;
                break;
            case 'style':
                styles[style.name] = `${style.value}${style.unit}`;
                break;
        }
    })

    return (
        <Tag style={styles}>
            { target.children.map(child => (
                <DroppedElement key={child.id} target={child} />
            )) }
            { target.children.length === 0 && content }
        </Tag>
    );
    
}