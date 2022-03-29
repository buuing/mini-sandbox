import path from 'path'
import ts from 'rollup-plugin-typescript2'
// import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
// import del from 'rollup-plugin-delete'
import pkg from './package.json'
import styles from 'rollup-plugin-styles'
export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `${pkg.unpkg}`,
        format: 'umd',
        name: 'MiniSandbox',
        sourcemap: false,
        plugins: [terser()],
      },
      {
        file: `${pkg.module}`,
        format: 'umd',
        name: 'MiniSandbox',
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [
      styles(),
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.js', '.ts'],
        declaration: true,
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  // docsify plugin
  {
    input: 'src/plugins/docsify-plugin.ts',
    output: [
      {
        file: 'dist/docsify-plugin.js',
        format: 'umd',
        name: 'SandboxDocsifyPlugin',
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.js', '.ts'],
        declaration: true,
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  // vue loader
  {
    input: 'src/loaders/vue-loader.ts',
    output: [
      {
        file: 'dist/vue-loader.js',
        format: 'umd',
        name: 'SandboxVueLoader',
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.js', '.ts'],
        declaration: true,
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
  // react loader
  {
    input: 'src/loaders/react-loader.ts',
    output: [
      {
        file: 'dist/react-loader.js',
        format: 'umd',
        name: 'SandboxReactLoader',
        sourcemap: false,
        plugins: [terser()],
      },
    ],
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, './tsconfig.json'),
        extensions: ['.js', '.ts'],
        declaration: true,
      }),
      json(),
      babel({ exclude: 'node_modules/**' }),
      resolve(),
      commonjs(),
    ],
  },
]
