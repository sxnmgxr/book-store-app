import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  // Build category breakdown from monthlySales for the pie-style list
  const topMonths = [...(data?.monthlySales || [])]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);

  return (
    <>
      {/* Stats Cards */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalBooks}</span>
            <span className="block text-gray-500">Total Books</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">${data?.totalSales}</span>
            <span className="block text-gray-500">Total Sales</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
            <span className="block text-gray-500">Trending Books</span>
          </div>
        </div>

        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className='size-6' />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalOrders}</span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>
      </section>

      {/* Charts & Tables */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">

        {/* Revenue Chart */}
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Monthly Revenue
          </div>
          <div className="p-4 flex-grow">
            <RevenueChart monthlySales={data?.monthlySales || []} />
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalOrders}</span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>

        {/* Average order value */}
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              ${data?.totalOrders ? (data?.totalSales / data?.totalOrders).toFixed(1) : 0}
            </span>
            <span className="block text-gray-500">Avg. Order Value</span>
          </div>
        </div>

        {/* Top months by revenue */}
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Top Months by Revenue</span>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
            <ul className="p-6 space-y-6">
              {topMonths.length > 0 ? topMonths.map((month, index) => {
                const [year, m] = month._id.split('-');
                const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                return (
                  <li key={index} className="flex items-center">
                    <div className="h-10 w-10 mr-3 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                      {monthNames[parseInt(m) - 1]}
                    </div>
                    <span className="text-gray-600">{monthNames[parseInt(m) - 1]} {year}</span>
                    <span className="ml-auto font-semibold">${month.totalSales}</span>
                  </li>
                );
              }) : (
                <li className="text-gray-400 text-sm">No sales data yet</li>
              )}
            </ul>
          </div>
        </div>

        {/* Orders per month breakdown */}
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Orders by Month
          </div>
          <div className="p-6 flex-grow overflow-y-auto">
            {data?.monthlySales?.length > 0 ? (
              <ul className="space-y-4">
                {data.monthlySales.map((month, index) => {
                  const [year, m] = month._id.split('-');
                  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                  const maxOrders = Math.max(...data.monthlySales.map(s => s.totalOrders));
                  const pct = Math.round((month.totalOrders / maxOrders) * 100);
                  return (
                    <li key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{monthNames[parseInt(m) - 1]} {year}</span>
                        <span className="font-semibold">{month.totalOrders} orders</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No order data yet
              </div>
            )}
          </div>
        </div>

      </section>
    </>
  );
};

export default Dashboard;