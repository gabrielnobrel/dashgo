import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpoint, useBreakpointValue } from "@chakra-ui/react"
import { Header } from "@/components/Header"
import { SideBar } from "@/components/SideBar"
import { RiAddLine, RiPencilLine } from "react-icons/ri"
import { Pagination } from "@/components/Pagination"
import Link from "next/link"

export default function UserList() {
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
                  <Heading size={'lg'} fontWeight={'normal'}>Usuários</Heading>

                  <Link href={'/users/create'} passHref>
                     <Button
                        as={'a'}
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
                     <Tr>
                        <Td px={['4', '4', '6']}>
                           <Checkbox colorScheme="pink" />
                        </Td>

                        <Td px={'6'}>
                           <Box>
                              <Text fontWeight={'bold'}>Gabriel Nobrel</Text>
                              <Text fontSize={'small'}>gabriel_nobresantos@hotmail.com</Text>
                           </Box>
                        </Td>
                        {isWideVersion &&
                           <Td>04 de Abril de 2024</Td>}
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
                  </Tbody>
               </Table>

               <Pagination />

            </Box>
         </Flex>
      </Box>
   )
}