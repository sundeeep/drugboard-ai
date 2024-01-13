
import AppWriteAuth from "@/appwrite/auth.service";
import Image from "next/image";

const Home = () => {
  const appwrite = new AppWriteAuth();
  const handleSignIn = () => {
    appwrite.SignInWithGoogle();
  }

  return (
    <div className="bg-[#0F172A] lg:h-screen lg:w-screen">
      <aside className="flex flex-col justify-between">
        {/* Logo */}
        <div className="">
          <Image
            src="/drugboardLogo.png"
            alt="Drugboard.ai Logo"
            width="250"
            height="100"
          />
        </div>

        <button onClick={handleSignIn}>Sign In With Google</button>

        {/* Navbar */}
        <nav>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
        {/* Logout Button */}
      </aside>

      <div>
        {/* Header */}
        <header className="flex justify-between"></header>

        {/* Main Section */}
      </div>
    </div>
  );

};

export default Home;
