import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);

    const formData = {
      fullname: {
        firstname: data?.firstname,
        lastname: data?.lastname,
      },
      email: data?.email,
      password: data?.password,
    };

    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/user/register`, formData)
      .then((res) => {
        if (res.status == 201) {
          alert("User Registered Successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error in API", err?.message);
        alert("Error : ", err);
      });
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>

            <div className="flex gap-3">
              <div className="mb-6">
                <input
                  required
                  className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                  type="text"
                  placeholder="First name"
                  {...register("firstname", { required: true, maxLength: 20 })}
                  aria-invalid={errors.firstname ? "true" : "false"}
                />
                {errors.firstname && (
                  <p class="mt-2.5 text-sm text-red-500">
                    <span class="font-medium">Required</span>
                  </p>
                )}
              </div>

              <div className="mb-6">
                <input
                  className="bg-[#eeeeee] w-full  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                  type="text"
                  placeholder="Last name"
                  {...register("lastname")}
                />
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              type="password"
              placeholder="password"
              {...register("password")}
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/user/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
