import { signIn } from "next-auth/react";
import { Button } from "@heroui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
    const onPress = (provider: "google" | "github") => {
        signIn(provider, {
            redirectTo: "/members",
        });
    };

    return (
        <div className="flex items-center w-full gap-2">
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onPress={() => onPress("google")}
            >
                <FcGoogle size={20} />
            </Button>
            <Button
                size="lg"
                fullWidth
                variant="bordered"
                onPress={() => onPress("github")}
            >
                <FaGithub size={20} />
            </Button>
        </div>
    );
}
