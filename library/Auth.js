const bcrypt = require('bcrypt');

const Hashing = async(value)=>{
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(value,salt);
        return hash;
    } catch (error) {
        return error;
    }
}

const hashCompare = async(password,hashvalue)=>{
    try {
       return await bcrypt.compare(password,hashvalue);
    } catch (error) {
        return error;
    }
}

module.exports = {Hashing,hashCompare};
