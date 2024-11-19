import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
   showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps) {
   return (
      <Flex
         align={'center'}
      >
         {showProfileData && (
            <Box mr={'4'} textAlign={'right'}>
               <Text>Gabriel Nobrel</Text>
               <Text color={'gray.300'} fontSize={'small'}>gabriel_nobresantos@hotmail.com</Text>
            </Box>
         )}

         <Avatar size={'md'} name="Gabriel Nobrel" src="https://github.com/gabrielnobrel.png" />
      </Flex>
   )
}