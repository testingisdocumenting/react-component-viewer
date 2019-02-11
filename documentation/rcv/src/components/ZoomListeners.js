class ZoomListeners {
    listeners = []

    addListener(listener) {
        this.listeners.push(listener)
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener)
    }

    notify(rendered) {
        this.listeners.forEach(l => l(rendered))
    }
}

export const zoomListeners = new ZoomListeners()