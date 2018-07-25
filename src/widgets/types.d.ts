import { JsxElement } from "typescript";

export type ButtonEl<K> = {
    content: JSX.Element
    value: K
    title?: string
};
