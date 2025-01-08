import NextLink from "next/link"
import { Link } from "@chakra-ui/react"
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

import { Header } from "@/components/Header"
import { SideBar } from "@/components/SideBar"
import { Pagination } from "@/components/Pagination"
import { useUsers } from "@/service/hooks/useUsers"
import { useState } from "react"
import { QueryClient } from "@tanstack/react-query"
import { queryClient } from "@/service/queryClient"
import { api } from "@/service/api"

export default function UserList() {
   const [page, setPage] = useState(1)
   const { data, isLoading, isFetching, error } = useUsers(page)

   const isWideVersion = useBreakpointValue({
      base: false,
      lg: true
   })

   async function handlePrefetchUser(userId: string) {
      const queryKey = ['user', userId]
      const queryFn = async () => {
         const response = await api.get(`users/${userId}`)
         return response.data
      }

      await queryClient.prefetchQuery({ queryKey, queryFn, staleTime: 1000 * 60 * 10 });
   }

   return (
      <Box>
         <Header />

         <Flex
            w={'100%'}
            my={'6'}
            maxWidth={1480}
            mx={'auto'}
            px={'6'}
         >
            <SideBar />

            <Box flex={'1'} borderRadius={8} bg={'gray.800'} p={'8'} >
               <Flex mb={'8'} justify={"space-between"} align={'center'}>
                  <Heading size={'lg'} fontWeight={'normal'}>Usuários
                     {!isLoading && isFetching && <Spinner size={'sm'} color="gray.500" ml={'4'} />}
                  </Heading>

                  <NextLink href={'/users/create'} passHref>
                     <Button
                        size={'sm'}
                        fontSize={'small'}
                        colorScheme="pink"
                        leftIcon={<Icon
                           as={RiAddLine}
                           fontSize={'20'}
                        />}
                     >
                        Criar novo
                     </Button>
                  </NextLink>
               </Flex>

               {isLoading ? (
                  <Flex justify={'center'}>
                     <Spinner />
                  </Flex>
               ) : error ? (
                  <Flex justify={'center'}>
                     <Text>Falha ao obter dados dos usuários</Text>
                  </Flex>
               ) : (
                  <>
                     <Table colorScheme="whiteAlpha">
                        {/* Cabeçalho da Tabela */}
                        <Thead>
                           <Tr>
                              <Th px={['4', '4', '6']} color={'gray.300'} width={'8'}>
                                 <Checkbox colorScheme="pink" />
                              </Th>
                              <Th>Usuário</Th>
                              {isWideVersion &&
                                 <Th>Data de cadastro</Th>
                              }
                              {isWideVersion &&
                                 <Th width={'8'} ></Th>
                              }
                           </Tr>
                        </Thead>

                        {/* Corpo da Tabela */}
                        <Tbody>
                           {data?.users.map(user => {
                              return (
                                 <Tr>
                                    <Td px={['4', '4', '6']}>
                                       <Checkbox colorScheme="pink" />
                                    </Td>

                                    <Td px={'6'}>
                                       <Box>
                                          <Link
                                             color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                             <Text fontWeight={'bold'}>{user.name}</Text>
                                          </Link>
                                          <Text fontSize={'small'} color={'gray.300'}>{user.email}</Text>
                                       </Box>
                                    </Td>
                                    {isWideVersion &&
                                       <Td>{user.createdAt}</Td>}
                                    {isWideVersion &&
                                       <Td>
                                          <Button
                                             as={'a'}
                                             size={'sm'}
                                             fontSize={'small'}
                                             colorScheme="purple"
                                             leftIcon={<Icon
                                                as={RiPencilLine}
                                                fontSize={'16'}
                                             />}
                                          >
                                             Editar
                                          </Button>
                                       </Td>
                                    }
                                 </Tr>
                              )
                           })}

                        </Tbody>
                     </Table>

                     <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} />
                  </>

               )}

            </Box>
         </Flex>
      </Box>
   )
}