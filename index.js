const express = require('express') //importa o express
const uuid = require('uuid')
const app = express() // guarda a função em uma variavel app
const port = 3000
app.use(express.json()) //aqui a gente configura em qual tipo de arquivos queremos a resposta

//cria uma rota que reporta uma response hello node
app.get('/abc', (request, response) =>{
    const name = request.query.name  //aqui da pra fazer assim: const {name, age} = resquest.query
    const age = request.query.age
    return response.json({name: name, age: age}) //ou poderia ser name, age se for igauis os nomes
})    


//ROUTE PARAMS: /users/-->:id'<-- O MAIS IMPORTANTE DAQUI E O END USADO NO INSOMINA É 7 DE EXEMPLO
app.get('/tese/:id', (request, response) =>{
    const { id } = request.params
    console.log(id)
    return response.json({id})
})    

app.get('/bodyparams', (request, response) =>{
    const { name, age} = request.body 
    return response.json({name, age, message: "lesgo girls!"})
})  

app.listen(port, ()=>{ //avisar em qual porta a applicatioin vai rodar
    console.log("My sever started 😍🥶 on the port: " +port)
}) 


// pra mudar o nome da rota tem q para o servidor e colocar novamente ´-ra rodar crtl c sai

//essa tal que query no insomia: localhost:3000/abc?name=camille&age=20





//-------------projetinho teste 


const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})


app.post('/users', (request, response) => {
    const {name,age} = request.body

     const user = {id:uuid.v4(), name, age}

    users.push(user)
    return response.status(201).json(user)
})


app.put('/users/:id', (resquest, response) =>{
    const {id} = resquest.params
    const {name, age} = resquest.body

    const updateUser = {id, name, age}

    //da pra usar: filter, find, findIndex
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "user not found"})
    }

    
    users[index] = updateUser
    return response.json(updateUser)
})


app.delete('/users/:id', (resquest, response) =>{
    const {id} = resquest.params

    const index = users.findIndex(index => index.id === id)

    if(index < 0){
        return response.status(404).json({message: "user not found"})
    }

    users.splice(index,1) //item do item zero e deleta uma posição ou seja só o indice 0
    return response.status(204).json()

})