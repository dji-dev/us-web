import { createSVGViewBox } from '../svg'

it('createSVGViewBox', () => {
    expect(createSVGViewBox(10, 20)).toBe('0 0 10 20')
})
