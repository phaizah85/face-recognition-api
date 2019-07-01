const handleSignin = (db, bcrypt) => (req, res) => {



	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		if(isValid){
			return db.select('*').from('users')
			.where('email' , '=', req.body.email)
			.then(user => {
				console.log(user);
				res.json(user[0]);
			}).catch( err => res.status(400).json('Unable to sign user'));
		} else {
			res.status(400).json("Wrong credentails");
		}
		
	})
	.catch( err => res.status(400).json("Wrong credentails"))
	
}

module.exports = {
	handleSignin
}


