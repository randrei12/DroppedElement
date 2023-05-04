import config from "../design/configuration";
import { IF_SerializedElement } from "../interfaces/DroppedElement";

export default function DroppedElement({ target } : { target: IF_SerializedElement }) {
    const Tag = config[target.type].html as keyof JSX.IntrinsicElements;

    console.log(target);
    

    let content: string | number | false = false;
    let styles: { [key: string]: string } = {};
    let attributes: { [key: string]: string | number } = {};

    target.styles.forEach(style => {
        switch (style.type) {
            case 'content':
                content = style.value;
                break;
            case 'style':
                styles[style.name] = `${style.value}${style.unit}`;
                break;
            case 'attribute':
                attributes[style.name] = style.value;
        }
    });

    return (
        <Tag style={styles} {...attributes}>
            { target.children.map(child => (
                <DroppedElement key={child.id} target={child} />
            )) }
            { target.children.length === 0 && content }
        </Tag>
    );
    
}