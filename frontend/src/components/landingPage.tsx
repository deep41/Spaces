import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

enum FormType {
  SignIn = "signIn",
  SignUp = "signUp",
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const LandingPage = () => {
  const [formType, setFormType] = useState<FormType>(FormType.SignIn);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      navigate("/home");
    }
  }, []);

  const onSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("Sign In successful:", data);
        navigate("/home");
      } else {
        console.error("Sign In failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sign Up successful:", data);
      } else {
        console.error("Sign Up failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex-1 flex items-center justify-center p-20 text-left">
          <div>
            <h1 className="text-7xl font-bold pb-5">SPACES</h1>
            <h2 className="text-xl text-gray-500">
              Discover a world where community connections flourish and your
              neighborhood comes alive. Our platform is designed to bring
              communities closer, offering a space for locals to share,
              collaborate, and celebrate the unique spirit of their area. Join
              us in nurturing a more connected and vibrant community.
            </h2>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96 p-10 bg-white border-2 border-black rounded-lg h-[450px]">
            <div className="mb-4">
              <button
                className={`text-2xl font-bold mb-4 ${
                  formType === FormType.SignIn
                    ? "text-blue-500"
                    : "text-black/55"
                }`}
                onClick={() => setFormType(FormType.SignIn)}
              >
                Sign In
              </button>
              <button
                className={`text-2xl font-bold mb-4 ml-6 ${
                  formType === FormType.SignUp
                    ? "text-blue-500"
                    : "text-black/55"
                }`}
                onClick={() => setFormType(FormType.SignUp)}
              >
                Sign Up
              </button>
            </div>
            <form onSubmit={formType === FormType.SignIn ? onSignIn : onSignUp}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              {formType === FormType.SignUp && (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                {formType === FormType.SignIn ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
