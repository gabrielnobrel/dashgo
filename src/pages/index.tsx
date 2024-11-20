import { Flex, Button, Stack } from "@chakra-ui/react"
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup' // biblioteca de validação do form
import { yupResolver } from '@hookform/resolvers/yup' // API integrador com o react hook form
import { Input } from "@/components/Form/input"

type SignInFormData = {
   email: string;
   password: string
}

// Schema de validação com o yup
const signInFormSchema = yup.object().shape({
   email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
   password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
   // Pegando informações do useForm 
   const { register, handleSubmit, formState } = useForm({
      // Populando o formState.errors
      resolver: yupResolver(signInFormSchema)
   })

   const { errors } = formState
   console.log(errors)


   // Tempo para capturar as informações do input
   const handleSignin: SubmitHandler<SignInFormData> = async (values) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // console.log(values)
   }

   return (
      <Flex
         w='100vw'
         h='100vh'
         alignItems='center'
         justify='center'>
         <Flex
            as='form'
            width='100%'
            maxWidth={360}
            bg={'gray.800'}
            p='8'
            borderRadius={8}
            flexDirection={"column"}
            onSubmit={handleSubmit(handleSignin)}
         >
            {/* Dar espaçamento entre os inputs */}
            <Stack spacing={'4'}>
               <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
               <Input name="password" type="password" label="Senha" error={errors.password} {...register('password')} />
            </Stack>

            <Button
               type="submit"
               mt='6'
               colorScheme="pink"
               size={'lg'}>Entrar</Button>
         </Flex>
      </Flex >
   )
}