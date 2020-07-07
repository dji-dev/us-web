/**
 * Small factory function to create an SVG viewbox for {@param width} and
 * {@param height}.
 */
export function createSVGViewBox(width: number, height: number): string {
    return `0 0 ${width} ${height}`
}
