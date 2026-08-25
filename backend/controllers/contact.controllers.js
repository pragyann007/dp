import { Contact } from "../models/contact.models.js";

export const contactform = async(req,res)=>{

    try {
        const {name,email,phone,grade,age,message}= req.body ; 
    
        if(!name||!email||!phone||!grade||!age){
    
            return res.status(404).json({message:"Some of the fields are empty .."})
        }
    
        const contactform = await Contact.create({
            name,
            email,
            phone,
            grade,
            age,
            message
        }
    )
    
    return res.status(200).json({message:"Contact form saved sucessfully !"},contactform);
    
    
    
    } catch (error) {

        return res.status(400).json({
            message:"Error in contact form ",
            error
        })
        
    }
}

export const getForm = async (req,res)=>{

   try {
     const user = await Contact.find();
 
     return res.status(200).json({message:"All user recieved and sent ",user});
 
     
 
   } catch (error) {

    return res.status(400).json({message:"Error while getting all form data",error})
    
   }
}

export const deleteForm = async(req,res)=>{
    const formId = req.params.id ; 

    const deleteform = await Contact.findByIdAndDelete(formId)

    return res.status(200).json({message:"Deleted form sucessfully ", deleteForm})
    
}
