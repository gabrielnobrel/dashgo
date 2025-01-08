import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup' // biblioteca de validação do form
import { yupResolver } from '@hookform/resolvers/yup' // API integrador com o react hook form
import { Input } from "@/components/Form/input"

import { Header } from "@/components/Header"
import { SideBar } from "@/components/SideBar"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/service/api"

type CreateUserFormData = {
   name: string;
   email: string;
   password: string;
   password_confirmation: string;
}

// Schema de validação com o yup
const createUserFormSchema = yup.object().shape({
   name: yup.string().required('Nome obrigatório'),
   email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
   password: yup.string().required('Senha obrigatória').min(6, 'Mínimo 6 caracteres'),
   password_confirmation: yup.string().oneOf([
      null, yup.ref('password')
   ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
   const createUser = useMutation<any, Error, CreateUserFormData>(
      mutationFn: async (user: CreateUserFormData) => {
         const response = await api.post('users', {
            user: {
               ...user,
               created_at: new Date(),
            },
         });

         return response.data.user;
      },
   )

   const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(createUserFormSchema) })

   const { errors } = formState

   const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
      // await new Promise(resolve => setTimeout(resolve, 2000))

      // console.log(values)
      await createUser.mutateAsync(values)
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

            <Box
               as="form"
               flex={'1'}
               borderRadius={8}
               bg={'gray.800'}
               p={['6',
                  '8']}
               onSubmit={handleSubmit(handleCreateUser)}>
               <Heading size={'lg'} fontWeight={'normal'}>Criar Usuário</Heading>

               <Divider my={'6'} borderColor={'gray.700'} />

               <VStack spacing={'8'}>
                  <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
                     <Input name="name" type='name' label="Nome Completo" error={errors.name} {...register('name')} />
                     <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
                  </SimpleGrid>

                  <SimpleGrid minChildWidth={'240px'} spacing={['6', '8']} w={'100%'}>
                     <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
                     <Input name="password_confirmation" type="password" label="Confirmação da Senha" error={errors.password_confirmation} {...register('password_confirmation')} />
                  </SimpleGrid>
               </VStack>

               <Flex mt={'8'} justify={'flex-end'}>
                  <HStack spacing={'4'}>
                     <Link href={'/users'} passHref>
                        <Button colorScheme="whiteAlpha">Cancelar</Button>
                     </Link>
                     <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitted}>Salvar</Button>
                  </HStack>
               </Flex>
            </Box>
         </Flex>
      </Box>
   )
}