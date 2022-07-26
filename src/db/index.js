import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("address.db")

export const init = () => {
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, coords TEXT NOT NULL)",
                [],
                () => res(),
                (_, err) => rej(err)
            )
        })
    })

    return promise
}

export const insertAddress = (title, image, address, coords) => {
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO address (title, image, address, coords) VALUES (?, ?, ?, ?)",
                [title, image, address, JSON.stringify(coords)],
                (_, result) => {
                    console.log(result)
                    res(result)
                },
                (_, err) => rej(err)
            )
        })
    })
    return promise
}

export const fetchAddress = () => {
    const promise = new Promise((res, rej) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM address",
                [],
                (_, result) => res(result),
                (_, err) => rej(err)
            )
        })
    })
    return promise
}
