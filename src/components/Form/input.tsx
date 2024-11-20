import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react"
import { FieldError } from 'react-hook-form'
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
   name: string;
   label?: string;
   error?: FieldError
}

// Tipagem do parâmetro ref e da props
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
   return (
      <FormControl isInvalid={!!error}>
         {/* Verifica se a label está presente */}
         {!!label &&
            <FormLabel htmlFor={name}>{label}</FormLabel>
         }
         <ChakraInput
            name={name}
            id={name}
            type="email"
            focusBorderColor="pink.500"
            bgColor={'gray.900'}
            variant={'filled'}
            _hover={{
               bgColor: 'gray.900'
            }}
            size={'lg'}
            ref={ref}
            {...rest} />
         {/* Mensagme de error */}
         {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
   )
}

export const Input = forwardRef(InputBase)