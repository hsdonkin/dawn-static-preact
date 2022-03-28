const fs = require("fs");
import * as React from "react";
import * as Server from "react-dom/server";

let Greet = () => <h1>Hello, world!</h1>;
const greet = Server.renderToString(<Greet />);
// console.log(`${process.cwd()}/sections/main-product.liquid`);
fs.writeFileSync(`./sections/main-product.liquid`, greet, () => {});
console.log("wrote file");
