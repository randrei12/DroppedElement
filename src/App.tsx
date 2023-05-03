import data from './data.json';
import DroppedElement from './components/DroppedElement';

export default function App() {
    console.log(data);
    

    return (
        <DroppedElement target={data[0]} />
    );
}