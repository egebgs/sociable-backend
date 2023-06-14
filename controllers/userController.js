//@desc Get all users
//@route GET /api/users
//@access Public

const getUsers = (req, res) => {
    res.status(200).json({message: 'Get User route'});
};

//@desc Get all users
//@route GET /api/users
//@access Public
const getUser = (req, res) => {
    res.status(200).json({message: 'Get User route for id: ' + req.params.id});
};


//@desc Create user
//@route POST /api/user
//@access
const createUser = (req, res) => {
    console.log(req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    res.status(201).json({message: 'Create user route'});
};

//@desc Update user by id
//@route PUT /api/user/:id
//@access Public
const updateUser = (req, res) => {
    res.status(200).json({message: 'Update User route for id: ' + req.params.id});
};

//@desc Delete user by id
//@route GET /api/user/:id
//@access Public
const deleteUser = (req, res) => {
    res.status(200).json({message: 'Delete User route for id: ' + req.params.id});
};


module.exports = {getUsers, createUser, updateUser, deleteUser, getUser};