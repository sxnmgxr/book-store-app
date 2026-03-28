import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const Recommened = () => {
    const { data: books = [] } = useFetchAllBooksQuery();
    const dispatch = useDispatch();

    const handleAddToCart = (book) => {
        dispatch(addToCart(book))
    }

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Trending Now</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 && books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <div className="rounded-lg transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">

                                    {/* Image */}
                                    <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                                        <Link to={`/books/${book._id}`}>
                                            <img
                                                src={getImgUrl(book?.coverImage)}
                                                alt={book?.title}
                                                className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                                            />
                                        </Link>
                                    </div>

                                    {/* Book Info */}
                                    <div>
                                        <Link to={`/books/${book._id}`}>
                                            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
                                                {book?.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 mb-5">
                                            {book?.description?.length > 80
                                                ? `${book.description.slice(0, 80)}...`
                                                : book?.description}
                                        </p>
                                        <p className="font-medium mb-5">
                                            NPR {book?.newPrice}
                                            <span className="line-through font-normal ml-2">
                                                NPR {book?.oldPrice}
                                            </span>
                                        </p>
                                        <button
                                            onClick={() => handleAddToCart(book)}
                                            className="btn-primary px-6 space-x-1 flex items-center gap-1"
                                        >
                                            <FiShoppingCart />
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default Recommened