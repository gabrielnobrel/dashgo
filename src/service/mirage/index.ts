import { createServer, Factory, Model } from 'miragejs'
import { faker } from '@faker-js/faker';

type User = {
   name: string;
   email: string;
   created_at: string
}

export function makeServer() {
   const server = createServer({
      // Dados que serão armazenados no banco de dados fictícios:
      models: {
         // O partial serve ´para indicar que o User pode conter alguns campos, mas não todos
         user: Model.extend<Partial<User>>({})
      },

      // Geração de dados fictícios em massa
      factories: {
         user: Factory.extend({
            name(i: number) {
               return `User ${i + 1}`
            },
            email() {
               return faker.internet.email().toLowerCase() // criando um email aleatório
            },
            createdAt() {
               return faker.date.recent({ days: 10 }) //pegando as data dos últimos de dias
            }
         })
      },

      seeds(server) {
         server.createList('user', 10) // Criando os usuários com as infomrções do factories
      },

      routes() {
         this.namespace = 'api' // utilizar o api para chamar as rotas abaixo
         this.timing = 750 // Esperar para responder

         this.get('/users')
         this.post('/users')

         this.namespace = '' // voltar ao estado original
         this.passthrough()
      }
   })

   return server
}