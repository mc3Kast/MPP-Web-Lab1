const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

//mongodb+srv://mc3Kast:<password>@lab1.e50atcj.mongodb.net/test
const app = express()
const hbs = exphbs.create({
    defaultLayout:'main',
    extname: '.hbs'
})
const PORT = process.env.PORT || 3000


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://mc3Kast:1234qwer@lab1.e50atcj.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        })
        console.log('Connected to MongoDB')
        app.listen(PORT, () => console.log(`Server has been started...`))
    } catch (err) {
        console.log(err)
    }
}
//app.get('/', (req, res) => res.send('Hello World!'))

start()