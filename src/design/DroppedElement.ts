import ElementsState from 'context/project/elements';
import { startCase } from 'lodash';
import { IF_DroppedElement, IF_SerializedElement, StyleState } from "ts/interfaces/DroppedElement";
import { HTMLUniversalElement } from 'ts/types/HTMLUniversalElement';
import config from './configuration';
import focus from 'utils/focus';
import ActiveState from 'context/project/design/active';

type ConstructorProps = {
    type: string,
    name?: string,
    id?: string,
    styles?: any[],
    element?: HTMLUniversalElement,
    children?: IF_SerializedElement[]
}

interface DroppedElement extends IF_DroppedElement {};

class DroppedElement {
    constructor({ type, name, id, styles, element, children = [] }: ConstructorProps) {
        const { elements,  addElement, removeElement, getElementById } = ElementsState.getState();
        
        this.type = type;
        this.name = name || `${startCase(type)}${elements.filter(e => e.type === type).length + 1}`;
        this.id = id || crypto.randomUUID();
        let _styles = styles || [];
        const _children: IF_DroppedElement[] = [];

        if (!getElementById(this.id)) addElement(this); 
        
        const { html, canHaveChildren } = config[type];
        const _element = element || document.createElement(html);
        
        this.html = () => _element;
        
        this.focus = () => {
            this.focused = true;
            focus(this);
            _element.classList.add('focus');
        }
        
        this.unfocus = () => {
            this.focused = false;
            _element.classList.remove('focus');
        }

        this.styles = {
            set: (newStyles) => {
                newStyles.forEach(style => {
                    applyStyle(style, _element);
                    const existingStyle = _styles.find(e => e.name === style.name);
                    if (existingStyle) Object.assign(existingStyle, style);
                    else _styles.push(style);
                });
            },
            get: (name) => _styles.find(e => e.name === name),
            delete: (name) => {
                _styles = _styles.filter(e => e.name !== name);
            }
        }

        this.children = {
            assign: element => {
                _children.push(element);
                element.parent = this;
                _element.appendChild(element.html());
            },
            unassign: element => {
                _children.splice(_children.findIndex(e => e === element), 1);
                element.parent = undefined;
                _element.removeChild(element.html());
            },
            list: () => _children
        }

        this.export = () => ({
            name: this.name,
            type: this.type,
            id: this.id,
            styles: _styles,
            children: _children.map(child => child.export())
        });

        // used for creating the LayoutLoader seen on the left side
        this.tree = () => ({
            id: this.id,
            parent: this.parent?.id || null,
            canHaveChildren,
            children: _children.map(child => child.tree())
            // ...(canHaveChildren && { children: _children.map(child => child.tree()) })
        })

        this.remove = () => {
            if (this.type === 'screen') return; // TODO: actually remove the screen when multiple screens are implemented
            const { active } = ActiveState.getState();
            _children.forEach(child => child.remove());
            if (this.parent) this.parent.children.unassign(this);
            removeElement(this);
            if (active === this) (this.parent || elements[0]).focus();

            Object.keys(this).forEach(key => delete this[key as keyof object]);
        }

        children.forEach(child => {
            let element = new DroppedElement(child);
            this.children.assign(element);
        });

        _styles.forEach(style => {
            applyStyle(style, _element);
        })
        
        _element.onclick = e => {
            if (e.composedPath()[0] !== _element) return;
            this.focus();
        }  
        this.focus();
    }
}

function applyStyle(style: StyleState, element: HTMLUniversalElement) {
    if (style.type === 'style') element.style[style.name as keyof object] = `${style.value}${style.unit}`;
    else if (style.type === 'content') element.innerText = style.value as string;
    else if (style.type === 'attribute') element.setAttribute(style.name, style.value as string);
}

export default DroppedElement;