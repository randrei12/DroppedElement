import { Style, Unit } from "ts/interfaces/configuration";

export default function Height(initialValue: string | number, initialUnit?: Unit): Style {
    return {
        name: 'height',
        type: 'style',
        value: 'number',
        units: ['px', '%'],
        initialValue,
        ...(initialUnit && { initialUnit })
    }
}