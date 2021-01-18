export interface SnapState {
    [index: number]: SnapType
}

export interface SnapType {
    text: string,
    disabled: boolean,
    image: string,
    id: number,
    requiresInputs: number[]
}