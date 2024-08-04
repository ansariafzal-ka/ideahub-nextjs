import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="px-6 py-3 border-b">
      <Link href="/">
        <h1 className="text-lg font-bold">IdeaHub</h1>
      </Link>
    </nav>
  );
};

export default NavBar;
