import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { login } from "../../utils/authManage";
import { useDispatch } from "react-redux";
import { login as AuthLogin } from "@/store/authSlice";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const navigate = useNavigate()
    const handelLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (username != "admin") {
            toast({
                variant: "destructive",
                title: "Only admin can login",
            });
            setLoading(false);
            return
        }
        const response = await login(username, password);
        if (response.success && response.data.user.isAdmin) {
            dispatch(AuthLogin({ userData: response.data.user }));
            toast({
                variant: "success",
                title: "Admin logged in successfully",
            });
            navigate('/')
        } else {
            toast({
                variant: "destructive",
                title: response.message,
            });
        }
        setLoading(false);
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handelLogin} className="flex flex-col gap-4 w-1/3 border-2 p-10 rounded-2xl">
                <h1 className="text-2xl text-center text-slate-600 font-bold">
                    Login To SignMate Admin
                </h1>
                <Input
                    type="text"
                    placeholder="Enter Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="secondary" type="submit" >
                    {loading ? <Loader height={4} width={4} /> : "Login"}
                </Button>
            </form>
        </div>
    );
}

export default Login;
