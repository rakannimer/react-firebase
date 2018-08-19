export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "ReactGoogleCharts"
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
  external: ["firebase", "react"]
  // plugins: [
  //   typescript({
  //     typescript: require("typescript"),
  //     abortOnError: false
  //   })
  // ]
};
