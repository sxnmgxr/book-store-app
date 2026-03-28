import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';

const UserDashboard = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);
  const { data: allBooks = [] } = useFetchAllBooksQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [previewPhoto, setPreviewPhoto] = useState(currentUser?.photoURL || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

  const bookMap = allBooks.reduce((acc, book) => {
    acc[book._id] = book;
    return acc;
  }, {});

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewPhoto(reader.result);
      setPhotoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile(name, photoURL);
      setSaveMsg('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setSaveMsg('Failed to update profile.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  const handleCancel = () => {
    setName(currentUser?.displayName || '');
    setPhotoURL(currentUser?.photoURL || '');
    setPreviewPhoto(currentUser?.photoURL || '');
    setIsEditing(false);
  };

  const totalSpent = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalItems = orders.reduce((sum, o) => sum + o.productIds.length, 0);
  const avgOrder = orders.length ? (totalSpent / orders.length).toFixed(2) : 0;

  const monthlyData = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[month] = (acc[month] || 0) + order.totalPrice;
    return acc;
  }, {});

  if (isLoading) return <div className="flex justify-center py-20 text-gray-500 text-lg">Loading...</div>;
  if (isError) return <div className="flex justify-center py-20 text-red-500 text-lg">Error getting orders</div>;

  return (
    <div className="min-h-screen py-6">
      <div className="space-y-6">

        {/* Profile Card */}
        <div className="bg-white shadow rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2 text-base bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-8 items-center">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 border-4 border-yellow-400">
                {previewPhoto ? (
                  <img src={previewPhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {(currentUser?.displayName || currentUser?.email || 'U')[0].toUpperCase()}
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-base">
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                  📷
                </label>
              )}
            </div>

            {/* Info */}
            <div className="flex-grow w-full space-y-3">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1 font-medium">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1 font-medium">
                      Photo URL <span className="text-gray-400 text-xs">(or upload above)</span>
                    </label>
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => { setPhotoURL(e.target.value); setPreviewPhoto(e.target.value); }}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={handleSave} disabled={saving}
                      className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-white text-base font-semibold rounded-lg transition disabled:opacity-50">
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={handleCancel}
                      className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-base font-semibold rounded-lg transition">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-gray-800">{currentUser?.displayName || 'No name set'}</p>
                  <p className="text-base text-gray-500">{currentUser?.email}</p>
                  <p className="text-sm text-gray-400">
                    Joined: {currentUser?.metadata?.creationTime
                      ? new Date(currentUser.metadata.creationTime).toLocaleDateString() : 'N/A'}
                  </p>
                </>
              )}
            </div>
          </div>

          {saveMsg && (
            <p className={`mt-4 text-base font-medium ${saveMsg.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {saveMsg}
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: orders.length, bg: 'bg-yellow-50', text: 'text-yellow-700' },
            { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, bg: 'bg-green-50', text: 'text-green-700' },
            { label: 'Total Books', value: totalItems, bg: 'bg-blue-50', text: 'text-blue-700' },
            { label: 'Avg. Order', value: `$${avgOrder}`, bg: 'bg-purple-50', text: 'text-purple-700' },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-5 ${stat.bg}`}>
              <p className={`text-sm font-medium ${stat.text} opacity-70`}>{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { key: 'orders', label: '📦 Order History' },
              { key: 'chart', label: '📊 Spending' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 text-base font-semibold transition ${
                  activeTab === tab.key
                    ? 'border-b-2 border-yellow-400 text-yellow-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-8">
              {orders.length > 0 ? (
                <ul className="space-y-5">
                  {orders.map((order) => (
                    <li key={order._id} className="border border-gray-100 rounded-xl p-6 space-y-4 hover:shadow-sm transition">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-700">
                            Order <span className="font-mono text-sm text-gray-400">#{order._id.slice(-8).toUpperCase()}</span>
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5">
                            {new Date(order?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <span className="text-base bg-yellow-100 text-yellow-700 font-bold px-4 py-1.5 rounded-full">
                          ${order.totalPrice}
                        </span>
                      </div>

                      <div className="border-t border-gray-50 pt-4 space-y-2">
                        <p className="text-sm font-semibold text-gray-500 mb-3">Books in this order:</p>
                        {order.productIds.map((productId) => {
                          const book = bookMap[productId];
                          return (
                            <div key={productId} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                              {book ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-base font-medium text-gray-700">{book.title}</span>
                                  <span className="text-sm text-gray-400">— ${book.newPrice}</span>
                                </div>
                              ) : (
                                <span className="text-sm font-mono text-gray-400">{productId}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-5xl mb-3">📭</p>
                  <p className="text-lg">No orders yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Chart Tab */}
          {activeTab === 'chart' && (
            <div className="p-8">
              {Object.keys(monthlyData).length > 0 ? (
                <div className="space-y-5">
                  <p className="text-base text-gray-500 font-medium">Monthly spending overview</p>
                  {Object.entries(monthlyData).map(([month, amount]) => {
                    const max = Math.max(...Object.values(monthlyData));
                    const pct = Math.round((amount / max) * 100);
                    return (
                      <div key={month}>
                        <div className="flex justify-between text-base mb-1.5">
                          <span className="text-gray-600 font-medium">{month}</span>
                          <span className="font-bold text-gray-800">${amount.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-5">
                          <div
                            className="bg-yellow-400 h-5 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400">
                  <p className="text-5xl mb-3">📊</p>
                  <p className="text-lg">No spending data yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;