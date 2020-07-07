import typescript from '@rollup/plugin-typescript'

export default {
    input: './lib/index.ts',
    output: {
        dir: './dist/',
        format: 'es',
    },
    plugins: [typescript()],
}
