import axios from "axios";

const get = async()=>{
    return await new Promise(async(resolve, reject)=>{
        await axios.get('/').then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const create = async(payload)=>{
    return await new Promise(async(resolve, reject)=>{
        await axios.post('/',  payload).then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            console.log(error);
            return reject(error);
        });
    });
}

const find = async(payload)=>{
    return await new Promise(async(resolve, reject)=>{
        await axios.get(`/${payload}`).then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const update = async(id, payload)=>{
    return await new Promise(async(resolve, reject)=>{
        await axios.put(`/${id}`,  payload).then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const destroy = async(payload)=>{
    return await new Promise(async(resolve, reject)=>{
        await axios.delete(`/${payload}`).then((res)=>{
            return resolve(res.data);
        }).catch((error)=>{
            return reject(error);
        });
    });
}

const StudentAction = {
    get,
    create,
    find,
    update,
    destroy
}

export default StudentAction;