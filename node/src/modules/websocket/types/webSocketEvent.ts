export const emitWebSocketEvent = (data: string) => {
    const event = new CustomEvent("web-socket", { detail: data });
    document.dispatchEvent(event);
}

declare global {
    interface DocumentEventMap {
        "web-socket": CustomEvent<string>;
    }
}
