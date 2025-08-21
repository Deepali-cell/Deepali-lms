import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/feautures/AppApis/AppApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [signupdetail, setsignupdetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logindetail, setlogindetail] = useState({
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const handleSubmit = async (type) => {
    const inputData = type == "signup" ? signupdetail : logindetail;
    const action = type == "signup" ? registerUser : loginUser;
    await action(inputData);

    if (type === "signup") {
      setsignupdetail({ name: "", email: "", password: "" });
    } else {
      setlogindetail({ email: "", password: "" });
    }
  };
  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData.message || "signup successfully");
    }
    if (loginSuccess && loginData) {
      toast.success(loginData.message || "login successfully");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError.data.message || "signup failed");
    }
    if (loginError) {
      toast.error(loginError.data.message || "login failed");
    }
  }, [
    loginLoading,
    registerLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click "Signup" when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Eg. deepali"
                    name="name"
                    value={signupdetail.name}
                    onChange={(e) =>
                      setsignupdetail({ ...signupdetail, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Eg. deepali@gmail.com"
                    name="email"
                    value={signupdetail.email}
                    onChange={(e) =>
                      setsignupdetail({
                        ...signupdetail,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Eg. deepali@3553256"
                    name="password"
                    value={signupdetail.password}
                    onChange={(e) =>
                      setsignupdetail({
                        ...signupdetail,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerLoading}
                  onClick={() => handleSubmit("signup")}
                >
                  {registerLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Log in to your account after signing up
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Eg. deepali@gmail.com"
                    name="email"
                    value={logindetail.email}
                    onChange={(e) =>
                      setlogindetail({ ...logindetail, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Eg. deepali@3553256"
                    name="password"
                    value={logindetail.password}
                    onChange={(e) =>
                      setlogindetail({
                        ...logindetail,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginLoading}
                  onClick={() => handleSubmit("login")}
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Login;
