import { dbName,client } from "./index.js";

const find = async () => {
    await client.connect()
    try{
        const db = client.db(dbName);
        return await db.collection("student").find().toArray();
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
        const student = await db.collection("student").insertOne(data);
        return student
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
        return await db.collection("student").findOne(filter);
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

const findOne = async(data) => {
    await client.connect()
    try{
        const db = client.db(dbName);
        return await db.collection("student").findOne(data);
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
        return await db.collection("student").updateOne(filter, update);
    }
    catch(err){
        throw err;
    }
    finally{
        await client.close();
    }
}

export default {
    find,
    insertOne,
    findByFilter,
    findOne,
    updateOne
}