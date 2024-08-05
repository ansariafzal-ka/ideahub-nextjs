import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="px-6 py-3 border-b sticky top-0 left-0 bg-background z-30">
      <Link href="/">
        <h1 className="text-lg font-bold">IdeaHub</h1>
      </Link>
    </nav>
  );
};

export default NavBar;
