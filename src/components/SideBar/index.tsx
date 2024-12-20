import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react"
import { useSidebarDrawer } from "@/contexts/SideBarDrawerContext"
import { SidebarNav } from "./SidebarNav"

export function SideBar() {
   const { isOpen, onClose } = useSidebarDrawer()

   const isDrawerSidebar = useBreakpointValue({
      base: true,
      lg: false
   })

   if (isDrawerSidebar) {
      return (
         <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
               <DrawerContent bg="gray.800" p={4}>
                  {/* Botão de fechar */}
                  <DrawerCloseButton mt="6" />
                  <DrawerHeader>Navegação</DrawerHeader>
                  <DrawerBody>
                     <SidebarNav />
                  </DrawerBody>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      )
   }

   return (
      <Box as="aside" w="64" mr="8">
         <SidebarNav />
      </Box>
   )
}