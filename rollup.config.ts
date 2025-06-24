import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
// import dts from 'rollup-plugin-dts';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    terser(),
    copy({
      targets: [{ src: 'src/**/*.scss', dest: 'dist' }]
    })
  ],
  external: [
    'react',
    'react-dom',
    '@mui/material',
    '@mui/material/styles',
    '@mui/system',
    '@mui/icons-material',
    '@mui/lab',
    '@emotion/react',
    '@emotion/styled',
    'next'
  ]
};
