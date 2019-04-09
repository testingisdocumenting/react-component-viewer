export function labelToKey(label: string) {
    return label.toLowerCase().replace(/\s+/g, '_');
}