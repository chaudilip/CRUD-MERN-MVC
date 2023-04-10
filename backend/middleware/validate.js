const Student = require("../Models/studentModel");

function validateData(req,res,next){
    const{name,email,address,phoneNo} = req.body;
    if(!name || !email || !phoneNo || !address){
        return res.status(400).json({error:"Name , Email and phoneNo are required"});
    }
    next();
}

const updateData = async(req,res,next)=>{
    const studentId = req.params.id;
    try{
        const updateStudent = await Student.findByIdAndUpdate(studentId,req.body,{new:true});
        if(!updateStudent){
            return res.status(404).send({
                message:"User not found with id " + studentId
            });
        }
        req.student = updateStudent;
        next();
    }catch(err){
        return res.status(500).send({
            message:"Error updating student with id " + err
        });
    }   
}

const deleteData = async (req, res, next) => {
    const studentId = req.params.id;
    try {
      const deleteStudent = await Student.findOneAndDelete({_id: studentId});
      if (!deleteStudent) {
        return res.status(404).send({
          message: `Student with ID ${studentId} not found.`
        });
      }
      req.student = deleteStudent;
      next();
    } catch (err) {
      res.status(500).send({
        message: `Error while deleting the data of student ID ${studentId}: ${err}`
      });
    }
  };


const selectStudents = async(req,res,next)=>{
    try{
        const selectStudent = await Student.find();
        req.selectStudents = selectStudent;
        next();
    }
    catch(err){
        res.status(500).send({
            message:`Internal Server Error ${err}`
        })
    }
}

//SELECT FOR ONLY ONE STUDENT

const selectStudent = async(req,res,next)=>{
    const studentId = req.params.id;
    try{
        const selectStudent = await Student.findById(studentId);
        req.student =selectStudent;
        next();
    }
    catch(err){
        res.status(500).send({
            message:`Internal Server Error ${err}`
        })
    }
}

module.exports = {
    validateData,
    updateData,
    deleteData,
    selectStudents,
    selectStudent
};