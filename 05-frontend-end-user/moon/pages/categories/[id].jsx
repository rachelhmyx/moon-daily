import React from "react";
import { axiosClient } from "../../libraries/axiosClient";

export default function CategoryId({ category, subCategories }) {
  // console.log("category", category);
  return (
    <>
      {/* <div>{category.name}</div> */}
      <div>
        {subCategories.map((c, id) => {
          console.log("c", c);
          console.log("id", id);
          return (
            <div>
              {c.name}

              <div>
                {c.products.map((product, index) => {
                  return <div>{product.name}</div>;
                })}
              </div>
            </div>
          );
        })}
        {/* {category &&
          category.products.map((product, index) => {
            return <div>{product.name}</div>;
          })} */}
      </div>
      ;
    </>
  );
}

export async function getStaticPaths() {
  const categories = await axiosClient.get("/categories");
  const paths = categories.map((category) => ({
    params: { id: category._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
  console.log("id", id);

  // const product = await axiosClient(`/products/${params.id}`);
  const category = await axiosClient(`/categories/${id}`);
  const subCategories = await axiosClient.get("/categories/:id/number-products");

  // console.log("category", category);
  // console.log("params", params);
  return {
    props: {
      subCategories,
      category,
    },
  };
}
