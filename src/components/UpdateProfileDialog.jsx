import React, {useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    fullname:user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber ||"",
    bio:user?.profile?.bio || "",
    skills:user?.profile?.skills?.map(skill =>skill) || "",
    file:user?.profile?.resume,
  });

  const ChangeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const ChangeFileHandler = (e)=>{
    const file = e.target.files?.[0];
    setInput({...input,file})
  }

  const submitHandler =async (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if(input.file){
      formData.append("file", input.file);
    }
    try {
      setLoading(true)
      const res =await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        timeout: 120000 ,
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      })
      if(res.data.success){
        dispatch(setUser(res?.data.user));
        toast.success(res?.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message)
    }finally{
      setLoading(false)
    }
    setOpen(false)
    console.log(input);
    
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Update your personal information and upload resume.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name" className="text-right px-10">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullname"
                  value={input.fullname}
                  onChange={ChangeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="email" className="text-right px-10">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={ChangeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="number" className="text-right px-10">
                  Number
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={ChangeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="bio" className="text-right px-10">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  

                  onChange={ChangeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="skills" className="text-right px-10">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={ChangeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="file" className="text-right px-10">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  onChange={ChangeFileHandler}
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                ></Input>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
