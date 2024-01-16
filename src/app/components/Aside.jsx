
import Image from "next/image";

const Aside = () => {
    
    return (
        <aside className="flex flex-col justify-between items-start">
            {/* Logo */} 
            <div className="">
                <Image
                    src="/drugboardLogo.png"
                    alt="Drugboard.ai Logo"
                    width="250"
                    height="100"
                />
            </div>

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
    );
}

export default Aside;