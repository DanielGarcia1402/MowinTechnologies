const config = {

    // port 
    port: process.env.PORT || 3000,
    
    // database
    db: 'mongodb://localhost/angular',

    // test enviroment
    test_env: 'test',
    test_db: 'mongodb://localhost/sirep3-test',
    test_port: 3001

};

export default config;