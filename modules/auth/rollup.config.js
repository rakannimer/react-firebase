import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/web-entrypoint.ts",
    output: [
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: "ReactFirebaseAuth"
      },
      {
        file: "dist/index.esm.js",
        format: "esm"
      },
      {
        file: "dist/index.cjs.js",
        format: "cjs"
      }
    ],
    external: ["react", "firebase", "render-and-add-props", "immer"],
    plugins: [
      typescript({
        typescript: require("typescript"),
        abortOnError: false
      })
    ]
  },
  {
    input: "src/native-entrypoint.ts",
    output: [
      {
        file: "dist/native.esm.js",
        format: "esm"
      },
      {
        file: "dist/native.cjs.js",
        format: "cjs"
      }
    ],
    external: [
      "react",
      "react-native-firebase",
      "render-and-add-props",
      "immer"
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        abortOnError: false
      })
    ]
  }
];
