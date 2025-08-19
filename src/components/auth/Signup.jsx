import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const {loading} = useSelector(store=>store.auth)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    console.log([...formData.entries()]);
    try {
      dispatch(setloading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message || "Account Created Successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something is missing");
    }
    finally{
      dispatch(setloading(false))
    }
    console.log(input);
  };

  return (
    <div>
     
      <div className="flex items-center justify-center max-w-7xl mx-auto mt-20">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 ">Sign Up</h1>
          <div className="my-5">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={ChangeEventHandler}
              placeholder="Krishna"
            />
          </div>
          <div className="my-5">
            <Label>Email Id</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={ChangeEventHandler}
              placeholder="Krishnasingh12sep@gmail.com"
            />
          </div>
          <div className="my-5">
            <Label>Phone Number</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={ChangeEventHandler}
              placeholder="9999999999"
            />
          </div>
          <div className="my-5">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={ChangeEventHandler}
              placeholder="**********"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2 ">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={ChangeEventHandler}
                  id="r1"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={ChangeEventHandler}
                  id="r2"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={ChangeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button> : <Button type="submit" className="w-full my-4">
            Signup
          </Button>
          }
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
