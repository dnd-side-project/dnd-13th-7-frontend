import * as React from 'react'

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Mirrors the behavior of @radix-ui/react-visually-hidden without adding a dependency.
 */
export default function VisuallyHidden({
  as: Comp = 'span',
  style,
  children,
  ...props
}: React.ComponentProps<'span'> & { as?: React.ElementType }) {
  return (
    <Comp
      style={{
        position: 'absolute',
        border: 0,
        width: 1,
        height: 1,
        margin: -1,
        padding: 0,
        whiteSpace: 'nowrap',
        clipPath: 'inset(50%)',
        clip: 'rect(0 0 0 0)',
        overflow: 'hidden',
        ...(style as React.CSSProperties),
      }}
      {...props}
    >
      {children}
    </Comp>
  )
}
