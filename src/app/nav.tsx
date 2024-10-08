"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLocalStorage } from "@uidotdev/usehooks";
import { LogOut, Moon, PawPrint, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AuthUser } from "@/lib/definitions";

import { logout } from "./api/auth";

export default function Navbar() {
  const router = useRouter();
  const { toast } = useToast();
  const [authUser, setAuthUser] = useLocalStorage<AuthUser>("authUser");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!mounted) {
    return null;
  }

  const toggleDarkMode = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav className="w-full bg-white bg-opacity-70 shadow-sm backdrop-blur-lg transition-all duration-300 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center"
              prefetch={false}
            >
              <PawPrint className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                Fetch
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {authUser && (
              <Button
                size="icon"
                variant="outline"
                className="ml-4 transition-all duration-300 hover:bg-blue-600 hover:text-white dark:text-white dark:hover:bg-blue-400"
                onClick={async () => {
                  setAuthUser(undefined);
                  await logout();
                  toast({
                    title: "Have a Pawesome day!",
                    description:
                      "The pups will be here waiting for you! 🐶 Come back soon for more tail wags and cuddles!",
                    duration: 5000,
                  });
                  router.push("/login");
                }}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
