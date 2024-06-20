
export interface ItemProps {
    saveItem: (updatedItem: Record<string, string>) => Promise<void>,
    titleKey: string,
    disabledKeys?: string[],
}