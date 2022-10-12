import "dotenv/config";
const fs = require("fs");
import * as React from "react";
import * as Server from "react-dom/server";
import { shopifyClient } from "./shopify";
import { getAllProductsQuery } from "./shopify/queries";
import { flattenConnection } from "./shopify/utility";

(async function () {
  const Product = ({ title }) => <h1>{title}</h1>;

  const { data } = await shopifyClient.query({
    query: getAllProductsQuery,
  });
  const products = flattenConnection(data.products);
  products.forEach((product) => {
    const ProductMarkup = Server.renderToString(
      <Product title={product.title} />
    );

    fs.writeFileSync(
      `./snippets/main-product-${product.handle}.liquid`,
      ProductMarkup,
      () => {}
    );

    const render = `
{% if product.handle == '${product.handle}' %}
    {% render 'main-product-${product.handle}' %}
{% endif %}
    `;

    fs.appendFile("./sections/main-product.liquid", render, () => {});
  });
})();
