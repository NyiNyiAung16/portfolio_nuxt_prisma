export default interface SetToast {
    title: string,
    description?: string,
    duration ?: number,
    type ?: "background" | "foreground" | undefined,
    variant ?: "default" | "destructive" | null | undefined
}