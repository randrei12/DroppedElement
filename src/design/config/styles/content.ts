import { Extra } from "ts/interfaces/configuration";

export default function Content(initialValue: string | number): Extra {
    return {
        name: 'content',
        type: 'content',
        units: ['none'],
        initialValue
    }
}