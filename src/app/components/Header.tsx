import { getSignInUrl, getUser, signOut } from "@workos-inc/authkit-nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import {
  FaHome,
  FaFileAlt,
  FaAddressCard,
  FaAddressBook,
  FaBriefcase,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/app/components/Sheet";
import ThemeToggle from "./ThemeToggle";

export default async function Header() {
  const { user } = await getUser();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="container flex items-center justify-between mx-auto my-4">
        <Link href="/">
          <Image
            className="h-12 w-auto object-contain transition-transform duration-300 transform hover:scale-105 hover:shadow-lg hover:rotate-3d border border-gray-300 rounded-lg"
            src="/assets/hiringnexus.png"
            alt="Logo"
            width={300}
            height={48}
          />
        </Link>
        <nav className="flex gap-4 items-center">
          {!user && (
            <Link
              className="flex items-center gap-1 rounded-md bg-blue-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 hidden"
              href={signInUrl}
            >
              <FaSignInAlt className="text-lg" />
              <span className="hidden sm:block">Sign In</span>
            </Link>
          )}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-1 rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
              >
                <FaSignOutAlt className="text-lg" />
                Logout
              </button>
            </form>
          )}
          <Link
            className="hidden sm:flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white "
            href="/"
          >
            <FaHome className="text-lg" />
          </Link>

          <Link
            className="hidden sm:flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
            href="/new-listing"
          >
            <FaBriefcase className="text-lg" />
          </Link>
          <Link
            className="hidden sm:flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
            href="/resume"
          >
            <FaFileAlt className="text-lg" />
          </Link>
          <ThemeToggle />
          <Sidebar />
        </nav>
      </div>
    </header>
  );
}

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <FontAwesomeIcon
          icon={faBars}
          className="bg-blue-600 rounded py-1 px-2 sm:py-2 sm:px-4 text-white flex items-center"
        />
      </SheetTrigger>
      <SheetContent className="w-[250px] sm:w-[540px] bg-white dark:bg-gray-900 dark:text-white">
        <SheetHeader>
          <SheetTitle className="font-bold text-2xl">HiringNexus</SheetTitle>
          <hr />
          <SheetDescription>
            <ul className="flex flex-col gap-3 text-lg font-semibold mt-4">
              <li>
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white "
                    href="/"
                  >
                    <FaHome className="text-lg" />
                    Home
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
                    href="/new-listing"
                  >
                    <FaBriefcase className="text-lg" />
                    New Listing
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
                    href="/resume"
                  >
                    <FaFileAlt className="text-lg" />
                    Resume
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
                  >
                    <FaAddressBook />
                    Contact
                  </Link>
                </SheetClose>
              </li>
              <li>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex items-center gap-1 rounded-md py-1 px-2 sm:py-2 sm:px-4 bg-blue-600 text-white"
                  >
                    <FaAddressCard />
                    About
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
