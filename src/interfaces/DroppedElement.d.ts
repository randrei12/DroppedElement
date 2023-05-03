import { HTMLUniversalElement } from "ts/types/HTMLUniversalElement";

export interface StyleState {
    name: string;
    value: string | number;
    unit: string;
    type: string;
}

export interface IF_SerializedElement {
    name: string,
    type: string,
    id: string,
    styles: StyleState[],
    children: IF_SerializedElement[],
}

export interface IF_TreeElement {
    id: string,
    children?: IF_TreeElement[],
    parent: string | null,
    canHaveChildren: boolean
}

export interface IF_DroppedElement extends IF_SerializedElement {
    focused: boolean,
    parent: IF_DroppedElement | undefined,
    html: () => HTMLUniversalElement,
    focus: () => void,
    unfocus: () => void,
    styles: {
        set: (newStyles: StyleState[]) => void,
        get: (name: string) => StyleState | undefined,
        delete: (name: string) => void
    },
    children: {
        assign: (element: IF_DroppedElement) => void,
        unassign: (element: IF_DroppedElement) => void,
        list: () => IF_DroppedElement[]
    }
    export: () => IF_SerializedElement,
    tree: () => IF_TreeElement,
    remove: () => void,
}