import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"

interface ActiveLinkProps extends LinkProps {
   children: ReactElement;
   shouldMatchExactHref?: boolean
}

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
   const { asPath } = useRouter()

   let isActive = false

   // Verificar se a rota que o usuário está é o mesmo do fornecido no código
   // if (asPath === rest.href || asPath === rest.as) {
   //    isActive = true
   // }

   // Verificar se a rota que o usuário está é o parecido com o fornecido no código
   if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
      isActive = true
   }

   // Verificar se o shouldMatchExactHref é true e se o aspath começa com href
   if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
      isActive = true
   }

   return (
      <Link {...rest}>
         {cloneElement(children, {
            color: isActive ? 'pink.400' : 'gray.50'
         })}
      </Link>
   )
}