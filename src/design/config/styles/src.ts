import { Extra } from "ts/interfaces/configuration";

export default function Src(initialValue: string | number): Extra {
    return {
        name: 'src',
        type: 'attribute',
        units: ['none'],
        initialValue
    }
}