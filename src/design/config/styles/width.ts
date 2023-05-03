import { Style, Unit } from "ts/interfaces/configuration";

export default function Width(initialValue: string | number, initialUnit?: Unit): Style {
    return {
        name: 'width',
        type: 'style',
        value: 'number',
        units: ['px', '%'],
        initialValue,
        ...(initialUnit && { initialUnit })
    }
}