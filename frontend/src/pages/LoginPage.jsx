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
    const inputData = type === "signup" ? signupdetail : logindetail;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);

    if (type === "signup") {
      setsignupdetail({ name: "", email: "", password: "" });
    } else {
      setlogindetail({ email: "", password: "" });
    }
  };

  useEffect(() => {
    if (registerSuccess && registerData?.userDetail) {
      toast.success(registerData.message || "Signup successfully");
      navigate("/");
    }

    if (loginSuccess && loginData?.userDetail) {
      toast.success(loginData.message || "Login successfully");
      navigate("/");
    }

    if (registerError)
      toast.error(registerError.data?.message || "Signup failed");
    if (loginError) toast.error(loginError.data?.message || "Login failed");
  }, [
    registerSuccess,
    loginSuccess,
    registerData,
    loginData,
    registerError,
    loginError,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gray-50 dark:bg-[#1a1a1a]">
      <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
        {/* Tabs */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* ✅ Signup */}
        <TabsContent value="signup">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click "Signup" when you're done.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Eg. Deepali"
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
                  value={signupdetail.email}
                  onChange={(e) =>
                    setsignupdetail({ ...signupdetail, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Eg. deepali@1234"
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
                className="w-full"
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

        {/* ✅ Login */}
        <TabsContent value="login">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Log in to your account after signing up.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Eg. deepali@gmail.com"
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
                  placeholder="Eg. deepali@1234"
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
                className="w-full"
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
  );
};

export default Login;
