module.exports={
    HOST: 'localhost',
    USERNAME: 'root',
    PASSWORD: '',
    DATABASE: 'node_bank_api', 
    dialect:'mysql',
    
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}