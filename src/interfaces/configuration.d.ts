export type Unit = 'none' | 'px' | '%';
export type Value = 'number' | 'text';

export type Style = {
    name: string,
    type: string,
    value?: Value,
    units: Unit[],
    initialValue: number | string,
    initialUnit?: Unit
}

export type Extra = {
    name: string,
    type: string,
    units: Unit[],
    value?: Value,
    initialValue: number | string,
    initialUnit?: Unit
}

export type Element = {
    html: string,
    styles: Style[],
    extras: Extra[],
    alignment: string[],
    canHaveChildren: boolean
}

export type IF_Elements = {
    [key: string]: Element
};