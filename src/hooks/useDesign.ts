import { useContext } from "react";
import { context } from "../context/design";


export default function useDesign() {
    const { elements, setElements } = useContext(context);

    function addElement(element: any) {
        setElements([...elements, element]);
    }

    function removeElement(element: any) {
        setElements(elements.filter(e => e !== element));
    }
    
    return { elements, addElement, removeElement };
}