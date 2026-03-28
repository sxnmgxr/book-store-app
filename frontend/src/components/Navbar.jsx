import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";

import avatarImg from "../assets/avatar.png"
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useFetchAllBooksQuery } from "../redux/features/books/booksApi";
import { addToCart } from "../redux/features/cart/cartSlice";
import { getImgUrl } from "../utils/getImgUrl";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
]

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef(null)

    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const { currentUser, logout } = useAuth()
    const { data: books = [] } = useFetchAllBooksQuery();

    const token = localStorage.getItem('token');

    const handleLogOut = () => {
        logout()
    }

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleAddToCart = (book) => {
        dispatch(addToCart(book))
        setShowResults(false)
        setSearchQuery("")
        setIsDropdownOpen(false)
    }

    const handleBookClick = () => {
        setShowResults(false)
        setSearchQuery("")
        setIsDropdownOpen(false)
    }

    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40" ref={searchRef}>
                        <IoSearchOutline className="absolute inline-block left-3 inset-y-2 z-10" />
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setShowResults(true)
                            }}
                            onFocus={() => { if (searchQuery) setShowResults(true) }}
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />

                        {/* Search Results Dropdown */}
                        {showResults && searchQuery && (
                            <div className="absolute top-10 left-0 w-[340px] bg-white shadow-xl rounded-md z-50 max-h-96 overflow-y-auto border border-gray-100">
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map(book => (
                                        <div
                                            key={book._id}
                                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b last:border-b-0"
                                        >
                                            {/* Book Image */}
                                            <Link
                                                to={`/books/${book._id}`}
                                                onClick={handleBookClick}
                                                className="flex-shrink-0"
                                            >
                                                <img
                                                    src={getImgUrl(book?.coverImage)}
                                                    alt={book.title}
                                                    className="w-10 h-14 object-cover rounded"
                                                />
                                            </Link>

                                            {/* Book Info */}
                                            <div className="flex-1 min-w-0">
                                                <Link
                                                    to={`/books/${book._id}`}
                                                    onClick={handleBookClick}
                                                >
                                                    <p className="font-semibold text-sm text-gray-800 truncate hover:text-blue-600">
                                                        {book.title}
                                                    </p>
                                                </Link>
                                                <p className="text-xs text-gray-500 truncate">{book.category}</p>
                                                <p className="text-sm font-medium text-gray-800 mt-1">
                                                    $ {book.newPrice}
                                                    <span className="line-through text-gray-400 text-xs ml-2">
                                                        $ {book.oldPrice}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <button
                                                onClick={() => handleAddToCart(book)}
                                                className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1"
                                            >
                                                <FiShoppingCart className="size-3" />
                                                <span>Add</span>
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                        No books found for "<strong>{searchQuery}</strong>"
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </> : token ? <Link to="/dashboard" className='border-b-2 border-primary'>Dashboard</Link> : (
                                <Link to="/login"><HiOutlineUser className="size-6" /></Link>
                            )
                        }
                    </div>

                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {cartItems.length > 0
                            ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
                            : <span className="text-sm font-semibold sm:ml-1">0</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;