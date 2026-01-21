const contact = require ('../model/contact')

exports.createContact = async (req,res) => {
    try {
        if(!req.body.name)
           return res.status(400).json({ message : "name is required"})
        if(!req.body.email)
            return res.status(400).json({ message : "email is required"})
        if(!req.body.phonenumber)
            return res.status(400).json({ message : "phonenumber is required"})
        if(!req.body.message)
            return res.status(400).json({ message : "message is required"})

        const existingcontact = await contact.findone({ email : req.body.email })
        if(existingcontact){
            return res.status(400).json({ message : " this email id is already exists"})
        }

        const contacts = await new contact ({
            name : req.body.name,
            email : req.body.email,
            phonenumber : req.body.phonenumber,
            message : req.body.message
        })
        await contacts.save();
        return res.status(200).json({ 
            message : "contact created successfully",
            contacts : contacts
        })
    }
    catch (error) {
        return res.status(500).json({ message : error.message})
    }
}

exports.getallcontacts = async (req,res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; 
        const page = parseInt(req.query.page) || 1; 
        const skip = (page - 1) * limit;

        const contacts = await contact.find({}) 
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)

        return res.status(200).json({ contacts})
    }
    catch (error) {
        return res.status(500).json({ message : error.message })
    }
}

exports.dummydetails = async (req,res) => {
    try {
        const dummydetails = [
            {
                name : "hariram",
                email : "hariraman692@gmail.com",
                phonenumber : "98788888888",
                message : "this is dummy message"
            }
        ]
        return res.status(200).json({ dummydetails})
    }
    catch (error) {
        return res.status(500).json({ message : error.message})
    }
}