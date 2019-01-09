module.exports = function (service) {


    async function Handlelogin (req, res, next) {

        try {

            const {email, password} = req.body;
            console.log(req.body)
    
            await service.login(email, password)
            
            if(logIn.success == false) {
    
            return res.json({
                status: 'error',
                data: signin
            })

        }       

        res.render("login")
    }
        
        catch (err) {
            console.log(err)
          return res.json({
            status: 'error',
            message: 'opps sommething happened'
          });
        }
    }


    async function register (req, res, next) {
    
        const { name, email, password, password2} = req.body;
        console.log(req.body)

            // validation
            let errors = [];

            if (name  === "" || email === "" || password === "" || password2 === "") {
            errors.push({ msg: 'Please enter all fields' });
            }

            if (await service.findEmail(email)) {
                errors.push({msg: "User already Exists"})
            }

            if (password != password2) {
            errors.push({ msg: 'Passwords do not match' });
            }

            if (password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
            }

            if (errors.length > 0) {
            console.log(errors)
            res.render('userReg', {
                errors,
                name,
                email,
                password,
                password2
            })
        }
        else {
            await service.createCustomer(name, email, password)
                res.redirect("/login")
            }
        }




    return {
        Handlelogin,
        register
    }
}
            
    
   