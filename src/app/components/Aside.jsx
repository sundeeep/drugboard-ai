import Link from "next/link";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AppWriteAuth from "@/appwrite/auth.service";

const Aside = () => {
    const auth = new AppWriteAuth();

    const logOut = async () => {
        await auth.logOut();
    }
    
    return (
        <aside className="flex flex-col h-full justify-between items-stretch w-[16%]">
            {/* Logo */}
            <Link href="/" replace>
            <img
                src="https://res.cloudinary.com/dj4yzosa6/image/upload/v1691598075/drugboard.ai/logo_new_final_with_tagline_dccivd.png"
                alt="Drugboard.ai Logo"
                className="rounded-lg cursor-pointer object-contain w-full h-full"
            />
            </Link>

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
                <button onClick={logOut} className="flex justify-center items-center gap-[16px] py-[8px] px-[16px] border-dashed border-2 border-[#DC2626]/60 hover:border-[#DC2626] text-[16px] font-semibold text-[#DC2626]/60 hover:text-[#DC2626] rounded-lg">
            <p>Logout</p>
            <LogoutRoundedIcon className="text-[20px]" />
            </button>
        </aside>
    );
}

export default Aside;