import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetRecommendationsQuery } from '../redux/features/recommendations/recommendationsApi';
import { useNavigate } from 'react-router-dom';
import { getImgUrl } from '../utils/getImgUrl';

const RecommendedBooks = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const { data: books = [], isLoading } = useGetRecommendationsQuery(
    currentUser?.email,
    { skip: !currentUser?.email }
  );

  if (!currentUser || isLoading || books.length === 0) return null;

  const displayedBooks = showAll ? books : books.slice(0, 4);

  return (
    <div className="py-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-semibold">Recommended for You</h2>
          <p className="text-sm text-gray-400 mt-1">Based on your order history</p>
        </div>
        {books.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
          >
            {showAll ? 'Show Less ←' : 'View All →'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {displayedBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/books/${book._id}`)}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="w-full h-40 overflow-hidden bg-gray-50">
              <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800 truncate">{book.title}</p>
              <p className="text-xs text-gray-400 capitalize truncate mt-0.5 mb-2">{book.category}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-yellow-500">NPR {book.newPrice}</p>
                {book.oldPrice && (
                  <p className="text-xs text-gray-400 line-through">NPR {book.oldPrice}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;
