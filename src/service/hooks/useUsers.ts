import { useQuery } from '@tanstack/react-query'
import { api } from "@/service/api"

type User = {
   id: string,
   name: string,
   email: string,
   createdAt: string
}

type GetUsersResponse = {
   totalCount: number;
   users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
   const { data, headers } = await api.get('/users', {
      params: {
         page
      }
   })
   // const data = await response.json()

   const totalCount = Number(headers['x-total-count'])

   const users = data.users.map(user => {
      return {
         id: user.id,
         name: user.name,
         email: user.email,
         createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
         })
      }
   })

   return { users, totalCount }
}

export function useUsers(page: number) {
   return useQuery({
      queryKey: ['users', page],
      queryFn: () => getUsers(page),
      staleTime: 1000 * 60 * 10 // 10 minutos
   })
}