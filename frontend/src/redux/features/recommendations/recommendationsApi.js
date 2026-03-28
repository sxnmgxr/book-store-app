import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recommendationsApi = createApi({
  reducerPath: 'recommendationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL || 'https://book-store-app-zemp.onrender.com'}/api/` }),
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: (email) => `recommendations/${email}`,
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationsApi;