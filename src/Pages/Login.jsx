
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import eyeop from "../assets/eyeOpen.svg";
import eyecl from "../assets/eyeClose.svg";
import gmail from "../assets/gmail.svg";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext, useState } from "react";
import Button from "../Design/Button";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        toast.success("Welcome back!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Invalid email or password");
      });
  };

  const handleGoogle = () => {
    googleSignIn()
      .then(() => {
        toast.success("Signed in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-3 text-[#00a1b7]">
            Welcome Back!
          </h1>
          <p className="text-base text-gray-600">
            Log in to to share surplus food with the community to reduce waste.
          </p>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            {/** email field (controlled) */}
            <div className="form-control">
              <label className="label">
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="password"
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
              <label className="label text-sm">
                <Link
                  to="/forgetpassword"
                  state={{ email }}
                  className="text-[#00a1b7] hover:underline"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="form-control mt-3">
              <Button type="submit">Login</Button>
            </div>

            <div className="divider">OR</div>
            <button
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline btn-sky-500 flex items-center justify-center gap-2"
            >
              <img src={gmail} alt="Gmail logo" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-sm mt-2">
              New here?{" "}
              <Link to="/register" className="link text-[#00a1b7]">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
