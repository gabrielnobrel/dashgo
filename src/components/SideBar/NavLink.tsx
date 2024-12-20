import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
   icon: ElementType;
   children: string;
   href: string
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
   return (
      <ActiveLink legacyBehavior href={href} passHref>
         <ChakraLink display={'flex'} alignItems={'center'} alignContent={'center'} {...rest}>
            <Icon as={icon} fontSize={'20'} />
            <Text ml={'4'} fontWeight={'medium'}>{children}</Text>
         </ChakraLink>
      </ActiveLink>
   )
}