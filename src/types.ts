/**
 * Night Interface Brightness
 *
 * Basically, theme. But cooler name.
 */
export type Nib = 'light' | 'dark'

/**
 * Wraps a type with a required Nib type.
 * To be used in styled-components.
 */
export type WithNib<T> = T & { nib: Nib }
