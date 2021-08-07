function createRematchName(oldName: string): string {
    const rematchRegex = / - rematch [0-9]+$/

    const rematchParts = rematchRegex.exec(oldName)
    if (! rematchParts) {
        return oldName + " - rematch 1"
    }

    const rematchPart = rematchParts[0]
    const originalName = oldName.split(rematchPart)[0]
    const newRematchNumber = parseInt(rematchPart.slice(11)) + 1
    return originalName + ' - rematch ' + newRematchNumber
}

export default createRematchName;
