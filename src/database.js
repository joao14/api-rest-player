import mongoose from "mongoose"

export async function connect() {
    const database = "storedb"
    const uri = `mongodb://127.0.0.1/${database}`

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB is connected :)")
    }).catch(err => {
        console.log("Wrong :(")
        console.log(err)
    })

}

