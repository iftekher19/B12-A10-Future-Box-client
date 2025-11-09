import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import eyeop from "../assets/eyeOpen.svg";
import eyecl from "../assets/eyeClose.svg";
import gmail from "../assets/gmail.svg";
import Button from "../Design/Button";

const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])/.test(password))
      return setError("Must contain an uppercase letter.");
    if (!/(?=.*[a-z])/.test(password))
      return setError("Must contain a lowercase letter.");
    if (password.length < 6)
      return setError("Must be at least 6 characters long.");

    createUser(email, password, name, photo)
      .then(() => {
        toast.success("Account created!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Registration failed!");
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Welcome!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#00a1b7]">
            Create Your Account
          </h1>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span>Name</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Email</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="input input-bordered w-full"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? eyeop : eyecl}
                    alt="toggle password visibility"
                    className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
                  />
                </span>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit">Register</Button>

            <div className="divider my-4 text-gray-400">OR</div>

            <button
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline btn-sky-500 flex items-center justify-center gap-2"
            >
              <img src={gmail} alt="Gmail logo" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-sm mt-2 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#00a1b7] hover:text-[#066d7a] font-medium underline-offset-2 hover:underline transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
