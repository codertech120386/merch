import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/graphql' }),
  endpoints: (builder) => ({
    getSKUs: builder.query<any[], { search: string, sortKey: string | null, sortOrder: string }>({
      query: ({ search, sortKey, sortOrder }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query GetSKUs($search: String, $sortKey: String, $sortOrder: String) {
              skus(search: $search, sortKey: $sortKey, sortOrder: $sortOrder) {
                id
                name
                sales
                returnPercent
                contentScore
              }
            }
          `,
          variables: {
            search,
            sortKey,
            sortOrder,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (res: any) => res.data.skus
    }),
    getSKUById: builder.query<any, string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({ query: `{ skuById(skuId: "${id}") { id name sales returnPercent contentScore notes { content createdAt userRole } } }` }),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (res: any) => res.data.skuById
    }),
    addNote: builder.mutation<any, { newNote: boolean, skuId: string, content: string, userRole: string }>({
      query: ({ skuId, content, userRole, newNote }) => ({
        url: '',
        method: 'POST',
        body: JSON.stringify({ query: `mutation { addNote(newNote: ${newNote}, skuId: "${skuId}", content: "${content}", userRole: "${userRole}") { id } }` }),
        headers: { 'Content-Type': 'application/json' },
      }),
      transformResponse: (res: any) => res.data.addNote
    }),
  })
})
export const { useGetSKUsQuery, useGetSKUByIdQuery, useAddNoteMutation } = api;