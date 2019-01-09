let bcrypt = require('bcryptjs');


module.exports = function (pool) {
// Validate email and password
    async function login (email, password) {

        let findUser = await pool.query('SELECT * FROM customer WHERE email=$1',[email]);

        if (findUser.rowCount === 0) {
       
            return {
                success: false,
                data:  'Email or Password is Incorrect'
            };
        }

        const {user_password} = findUser.rows[0];



        if (!decryptPass(password, user_password)) {
            return 'Email or Password is Incorrect';
        }

        return {
            success: true,
              data: findUser.rows
         }
    }  


    async function createCustomer (fullname, email, password) {

        let alreadyExist = await findEmail(email);
        if (alreadyExist) {
            return  {
                success :false,
                data:  'email already exist'
            }
        }  
        
        const hash = encryptPass(password);

        await pool.query(`INSERT INTO customer (fullname,email,password)
          VALUES ($1,$2,$3)`, [fullname, email, hash])



    }

    const findEmail = async (email) => {
        let emailFound = await pool.query('SELECT * FROM customer WHERE email=$1', [email]);
        if (emailFound.rowCount == 0) {
            return false;
        } 
        return true;
    }


    const encryptPass = (password) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash
    }

    const decryptPass = (password,hash) => {
        let correctPass = bcrypt.compareSync(password, hash); 
          return correctPass;
       }


    let getCustomer = async () => {
        let result = await pool.query("select * from customer");
        return result.rows
    }


    return {
        login,
        createCustomer,
        findEmail,
        encryptPass,
        decryptPass,
        getCustomer
    }


   
}