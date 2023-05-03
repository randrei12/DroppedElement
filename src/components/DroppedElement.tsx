import config from "../design/configuration";
import { IF_SerializedElement } from "../interfaces/DroppedElement";

export default function DroppedElement({ target } : { target: IF_SerializedElement }) {
    const Tag = config[target.type].html as keyof JSX.IntrinsicElements;

    return (
        <Tag>
            { target.children.map(child => (
                <DroppedElement key={child.id} target={child} />
            )) }
        </Tag>
    );
    
}