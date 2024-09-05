import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  allProducts,
  fetchSingleProduct,
  updateProductDetails,
} from "../app/features/product/productSlice";

export default function Edit() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProduct = async () => {
    const response = await dispatch(fetchSingleProduct(id)).unwrap();
    console.log(response);
    setProduct(response);
    reset(response);
    console.log(product);
  };
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("sellingPrice", data.sellingPrice);
    formData.append("countInStock", data.countInStock);
    formData.append("category", data.category);

    console.log(data);
    console.log(formData);
    if (data.img && data.img.length > 0) {
      for (let i = 0; i < data.img.length; i++) {
        formData.append("img", data.img[i]);
      }
    } else if (product.image && product.image.length > 0) {
      formData.append("image", JSON.stringify(product.image));
    }
    const updatedProduct = await dispatch(
      updateProductDetails({ id: id, data: formData })
    );
    console.log(updatedProduct);
    navigate(`/products/${id}`);
  };
  useEffect(() => {
    getProduct();
  }, [dispatch, id]);
  return (
    <form
      className="lg:w-[60%] m-auto p-4 flex flex-col justify-center items-center  "
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <h2 className="w-4/5 py-4 text-xl">Edit Product</h2>
      <div className="w-4/5">
        <label htmlFor="img" className="py-4">
          Upload Image
        </label>
        <input
          type="file"
          id="img"
          multiple
          {...register("img", {
            // required: { value: true, message: "Please Upload Images" },
          })}
          className="w-full  mt-2 "
        />
        {errors.img && <p className="text-red-700">{errors.img.message}</p>}
      </div>
      <div className="w-4/5  mt-2">
        <label htmlFor="name">Enter Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          className="w-full rounded-lg mt-2"
          id="name"
          {...register("name", {
            required: { value: true, message: "Enter Product Name" },
          })}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
      </div>
      <div className="w-4/5  mt-2">
        <label htmlFor="description">Enter Description</label>
        <textarea
          placeholder="Enter Description"
          id="description"
          className="w-full rounded-lg  mt-2"
          rows={4}
          {...register("description", {
            required: { value: true, message: "Enter product Description" },
          })}
        />
        {errors.description && (
          <p className="text-red-700">{errors.description.message}</p>
        )}
      </div>
      <div className="  sm:flex gap-6 w-4/5  mt-2 ">
        <div className="sm:w-1/2">
          <div>
            <label htmlFor="price">Enter Product Price</label>
          </div>

          <input
            type="number"
            placeholder="Enter Product Price"
            id="price"
            className="w-full rounded-lg   mt-2"
            {...register("price", {
              required: { value: true, message: "Enter Product Price" },
            })}
          />
          {errors.price && (
            <p className="text-red-700">{errors.price.message}</p>
          )}
        </div>
        <div className="sm:w-1/2">
          <div>
            <label htmlFor="price">Enter Selling Price</label>
          </div>
          <input
            type="number"
            placeholder="Enter Sellling Price"
            id="price"
            className="w-full rounded-lg   mt-2"
            {...register("sellingPrice", {
              required: { value: true, message: "Enter Selling Price" },
            })}
          />
          {errors.sellingPrice && (
            <p className="text-red-700">{errors.sellingPrice.message}</p>
          )}
        </div>
        <div className="sm:w-1/2">
          <div>
            <label htmlFor="stock">Enter Product Stock Count</label>
          </div>

          <input
            type="number"
            placeholder="Enter Product Stock Count"
            id="stock"
            className="w-full rounded-lg   mt-2"
            {...register("countInStock", {
              required: { value: true, message: "Enter Product Stock Count" },
            })}
          />
          {errors.countInStock && (
            <p className="text-red-700">{errors.countInStock.message}</p>
          )}
        </div>
      </div>
      <div className="w-4/5 mt-2">
        <label htmlFor="category">Enter Product Category</label>
        <input
          type="text"
          placeholder="Electronics,Washing Machine ..."
          className="w-full rounded-lg"
          {...register("category", {
            required: { value: true, message: "Enter Product Category" },
          })}
        />
        {errors.category && (
          <p className="text-red-700">{errors.category.message}</p>
        )}
      </div>
      <div className="w-4/5 mt-4">
        <button
          disabled={isSubmitting}
          className={`bg-green-300 p-2 w-1/2 rounded-lg hover:bg-blue-400"`}
        >
          {isSubmitting ? "Submitting.." : "Add"}
        </button>
      </div>
    </form>
  );
}
