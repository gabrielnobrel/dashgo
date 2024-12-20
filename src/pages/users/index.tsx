import Link from "next/link"
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

import { Header } from "@/components/Header"
import { SideBar } from "@/components/SideBar"
import { Pagination } from "@/components/Pagination"
import { useUsers } from "@/service/hooks/useUsers"

export default function UserList() {
   const { data, isLoading, isFetching, error } = useUsers()

   const isWideVersion = useBreakpointValue({
      base: false,
      lg: true
   })

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

                  <Link href={'/users/create'} passHref>
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
                  </Link>
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
                           {data.map(user => {
                              return (
                                 <Tr>
                                    <Td px={['4', '4', '6']}>
                                       <Checkbox colorScheme="pink" />
                                    </Td>

                                    <Td px={'6'}>
                                       <Box>
                                          <Text fontWeight={'bold'}>{user.name}</Text>
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

                     <Pagination totalCountOfRegisters={200} currentPage={5} onPageChange={() => { }} />
                  </>

               )}

            </Box>
         </Flex>
      </Box>
   )
}