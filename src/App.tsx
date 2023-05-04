import data from './data.json';
import DroppedElement from './components/DroppedElement';
import useDesign from './hooks/useDesign';

export default function App() {
    const { elements, removeElement } = useDesign();

    function handleDelete() {
        let index = Math.floor(Math.random() * elements.length);
        removeElement(elements[index]);
        console.log(elements);
        
    }

    return (
        <>
            <DroppedElement target={data[0]} />
            <button onClick={handleDelete}>Delete random</button>
        </>

    );
}