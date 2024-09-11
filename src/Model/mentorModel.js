import { dbName,client } from "./index.js";

const find = async () => {
    await client.connect()
    try{
        const db = client.db(dbName);
        return await db.collection("mentor").find().toArray();
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

const findByFilter = async(filter) => {
    await client.connect()
    try{
        const db = client.db(dbName);
        const mentors = await db.collection("mentor").findOne(filter)
        return mentors
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

const insertOne = async(data) => {
    await client.connect()
    try{
        const db = client.db(dbName);
        const mentor = await db.collection("mentor").insertOne(data);
        return mentor
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

const updateOne = async(filter, update) => {
    await client.connect()
    try{
        const db = client.db(dbName);
        return await db.collection("mentor").updateOne(filter, update);
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

// const editById = async(id, data) => {
//     await client.connect()
//     try{
//         const db = client.db(dbName);
//         return await db.collection("mentor").updateOne(id, {$set: data});
//     }
//     catch(err){
//         throw err;
//     }
//     finally{
//         await client.close();
//     }
// }


export default {
    find,
    insertOne,
    findByFilter,
    updateOne,
}