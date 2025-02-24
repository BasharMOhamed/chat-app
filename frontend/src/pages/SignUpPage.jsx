import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeClosed,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();
  //   const [fullname, setFullname] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormaData] = useState({
    fullname: "",
    password: "",
    email: "",
  });

  const validateForm = () => {
    const { fullname, password, email } = formData;
    if (!fullname.trim()) return toast.error("Please enter your full name");
    if (!email.trim()) return toast.error("Please enter your email");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Please enter your password");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signUp(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div
        className="flex flex-col justify-center
    items-center p-6 sm:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          {/* First Part */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormaData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormaData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="**********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormaData({ ...formData, password: e.target.value })
                  }
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <Eye className="size-5 text-base-content/40" />
                    ) : (
                      <EyeClosed className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button className="btn btn-primary w-full" type="submit">
              {isSigningUp ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
