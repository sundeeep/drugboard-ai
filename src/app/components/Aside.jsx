
const Aside = () => {
    
    return (
        <aside className="flex flex-col justify-between items-start">
            {/* Logo */}
            <div className="">
            <img
                src="https://res.cloudinary.com/dj4yzosa6/image/upload/v1691598075/drugboard.ai/logo_new_final_with_tagline_dccivd.png"
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