import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: './lib/index.ts',
    output: {
        dir: './dist/',
        format: 'es',
    },
    plugins: [commonjs(), typescript()],
}
