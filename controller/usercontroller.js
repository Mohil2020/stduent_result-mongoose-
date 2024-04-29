var schoolmodel = require('../model/schoolmodel');
var stdmodel = require('../model/stdmodel');
var studentmodel = require('../model/studentmodel');
var staffmodel = require('../model/staffmodel');
var resultmodel = require('../model/resultmodel');

exports.school_regi = async (req, res) => {

    var data = await schoolmodel.find({ email: req.body.email, password: req.body.password });

    if (data.length != 1) {
        var data = await schoolmodel.create(req.body);
        res.status(200).json({
            status: "School Registered"
        });
    }
    else {
        res.status(200).json({
            status: "School Already Registered"
        })
    }

}
let school;
exports.school_log = async (req, res) => {
    var data = await schoolmodel.find({ email: req.body.email, password: req.body.password });
    if (data.length == 1) {
        res.status(200).json({
            status: "Login Success"
        })
        school = "login"
    }
    else {
        res.status(200).json({
            status: "Login Failed"
        })
    }
}

exports.addstd = async (req, res) => {
    if (school == "login") {
        var data = await stdmodel
            .find({ std: req.body.std, div: req.body.div });
        if (data.length == 0) {
            var data = await stdmodel.create(req.body);
            res.status(200).json({
                status: "Standard Added"
            });
        } else {
            res.status(200).json({
                status: "Standard Already Added"
            });
        }
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.addstu = async (req, res) => {
    if (school == "login") {
        var data = await studentmodel.find({ std: req.body.std, div: req.body.div, roll: req.body.roll });
        if (data.length == 0) {
            var data = await studentmodel.create(req.body);
            res.status(200).json({
                status: "Student Added"
            });
        } else {
            res.status(200).json({
                status: "Student Already Added"
            });
        }
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.addstaff = async (req, res) => {
    if (school == "login") {
        var data = await staffmodel.find({ name: req.body.name, email: req.body.email, std: req.body.std, div: req.body.div });
        if (data.length == 0) {
            var data = await staffmodel.create(req.body);
            res.status(200).json({
                status: "Staff Added"
            });
        } else {
            res.status(200).json({
                status: "Staff Already Added"
            });
        }
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.viewstu = async (req, res) => {
    if (school == "login") {
        var data = await studentmodel.find();
        res.status(200).json({
            data: data
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}
exports.viewstd = async (req, res) => {
    if (school == "login") {
        var data = await stdmodel.find().sort({ std: 1 });
        res.status(200).json({
            data: data
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.viewstaff = async (req, res) => {
    if (school == "login") {
        var data = await staffmodel.find();
        res.status(200).json({
            data: data
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.deletestaff = async (req, res) => {
    var id = req.params.id;
    if (school == "login") {
        var data = await staffmodel.findByIdAndDelete(id);
        res.status(200).json({
            status: "Staff Deleted"
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.updatestaff = async (req, res) => {
    if (school == "login") {
        var id = req.params.id;
        var data = await staffmodel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: "Staff Updated"
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.allresult=async(req,res)=>{
    if(school=="login"){
        var data=await resultmodel.find();
        res.status(200).json({
            data:data
        })
    }
    else{
        res.status(200).json({
            status:"Login First"
        })
    }
}
exports.resultstd = async (req, res) => {
    if (school == "login") {
        var data = await resultmodel.find().sort({ std: 1 });
        res.status(200).json({
            data: data
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}
exports.topresult = async (req, res) => {
    if (school == "login") {
        var data = await resultmodel.find({std:req.body.std,div:req.body.div}).sort({ per: -1 }).limit(3); 
        res.status(200).json({
            data: data
        })
    }
    else{
        res.status(200).json({
            status:"Login First"
        })
    }
}

var staff;
exports.staff_log = async (req, res) => {
    var data = await staffmodel.find({ email: req.body.email, password: req.body.password });
    if (data.length == 1) {
        res.status(200).json({
            status: "Login Success"
        })
        staff = req.body.email
    }
    else {
        res.status(200).json({
            status: "Login Failed"
        })
    }
}

exports.staffstu = async (req, res) => {
    if (staff != undefined) {
        var data = await staffmodel.find({ email: staff });
        var studata = await studentmodel.find({ std: data[0].std, div: data[0].div })
        res.status(200).json({
            data: studata
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.addresult = async (req, res) => {
    if (staff != undefined) {
        var data = await staffmodel.find({ email: staff });
        var studata = await studentmodel.find({ std: data[0].std, div: data[0].div, roll: req.body.roll });
        if (studata.length == 1) {
            var resultdata = await resultmodel.find({ std: data[0].std, div: data[0].div, roll: req.body.roll });
            if (resultdata.length == 0) {
                var total = parseFloat(req.body.sub1) + parseFloat(req.body.sub2) + parseFloat(req.body.sub3) + parseFloat(req.body.sub4) + parseFloat(req.body.sub5);
                var min = Math.min(req.body.sub1, req.body.sub2, req.body.sub3, req.body.sub4, req.body.sub5);
                var max = Math.max(req.body.sub1, req.body.sub2, req.body.sub3, req.body.sub4, req.body.sub5);
                if (req.body.sub1 > 35 && req.body.sub2 > 35 && req.body.sub3 > 35 && req.body.sub4 > 35 && req.body.sub5 > 35) {
                    var per = parseFloat((total / 500) * 100);
                }
                else {
                    var per = "0";
                }
                var grade;
                if (req.body.sub1 > 35 && req.body.sub2 > 35 && req.body.sub3 > 35 && req.body.sub4 > 35 && req.body.sub5 > 35) {
                    if (per >= 90) {
                        grade = "A+"
                    }
                    else if (per >= 80) {
                        grade = "A"
                    }
                    else if (per >= 70) {
                        grade = "B"
                    }
                    else if (per >= 60) {
                        grade = "C"
                    }
                    else if (per >= 50) {
                        grade = "D"
                    }
                    else {
                        grade = "F"
                    }
                }
                else {
                    grade = "***"
                }

                var temp = 0;
                if (req.body.sub1 > 35) {
                    temp = temp + 1;
                }

                if (req.body.sub2 > 35) {
                    temp = temp + 1;
                }

                if (req.body.sub3 > 35) {
                    temp = temp + 1;
                }

                if (req.body.sub4 > 35) {
                    temp = temp + 1;
                }

                if (req.body.sub5 > 35) {
                    temp = temp + 1;
                }

                var result;
                if (temp == 5) {
                    result = "Pass";
                } else if (temp == 4 || temp == 3) {
                    result = "ATKT";
                } else {
                    result = "Fail";
                }

                req.body.name = studata[0].name;
                req.body.std = data[0].std;
                req.body.div = data[0].div;
                req.body.total = total;
                req.body.min = min;
                req.body.max = max;
                req.body.per = per;
                req.body.grade = grade;
                req.body.result = result;
                var data = await resultmodel.create(req.body);
                res.status(200).json({
                    status: "Result Added"
                })
            }
            else {
                res.status(200).json({
                    status: "Result Already Added"
                })
            }

        }
        else {
            res.status(200).json({
                status: "Student Not Found"
            })
        }


    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}

exports.viewresult = async (req, res) => {
    if (staff != undefined) {
        var data = await staffmodel.find({ email: staff });
        var resultdata = await resultmodel.find({ std: data[0].std, div: data[0].div });
        if (resultdata.length >= 1) {
            res.status(200).json({
                data: resultdata
            })
        }
        else {
            res.status(200).json({
                status: "No Result Found"
            })
        }
    }
}

exports.resultstu = async (req, res) => {
    var no = req.params.no;
    if (staff != undefined) {
        var data = await staffmodel.find({ email: staff });
        var resultdata = await resultmodel.find({ std: data[0].std, div: data[0].div, roll: no });
        if (resultdata.length == 1) {
            res.status(200).json({
                data: resultdata
            })
        }
        else {
            res.status(200).json({
                status: "No Result Found"
            })
        }

    }
    else {
        res.status(200).json({
            status: "Login First"
        });
    }
}
exports.deleteresult = async (req, res) => {
    var id = req.params.id;
    if (staff != undefined) {
        var data = await resultmodel.findByIdAndDelete(id);
        res.status(200).json({
            status: "Result Deleted"
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        })
    }
}

exports.updateresult = async (req, res) => {
    var id = req.params.id;
    if (staff != undefined) {
        var data = await staffmodel.find({ email: staff });
        var studata = await studentmodel.find({ std: data[0].std, div: data[0].div, roll: req.body.roll });
        var total = parseFloat(req.body.sub1) + parseFloat(req.body.sub2) + parseFloat(req.body.sub3) + parseFloat(req.body.sub4) + parseFloat(req.body.sub5);
        var min = Math.min(req.body.sub1, req.body.sub2, req.body.sub3, req.body.sub4, req.body.sub5);
        var max = Math.max(req.body.sub1, req.body.sub2, req.body.sub3, req.body.sub4, req.body.sub5);
        if (req.body.sub1 > 35 && req.body.sub2 > 35 && req.body.sub3 > 35 && req.body.sub4 > 35 && req.body.sub5 > 35) {
            var per = parseFloat((total / 500) * 100);
        }
        else {
            var per = "0";
        }
        var grade;
        if (req.body.sub1 > 35 && req.body.sub2 > 35 && req.body.sub3 > 35 && req.body.sub4 > 35 && req.body.sub5 > 35) {
            if (per >= 90) {
                grade = "A+"
            }
            else if (per >= 80) {
                grade = "A"
            }
            else if (per >= 70) {
                grade = "B"
            }
            else if (per >= 60) {
                grade = "C"
            }
            else if (per >= 50) {
                grade = "D"
            }
            else {
                grade = "F"
            }
        }
        else {
            grade = "***"
        }

        var temp = 0;
        if (req.body.sub1 > 35) {
            temp = temp + 1;
        }

        if (req.body.sub2 > 35) {
            temp = temp + 1;
        }

        if (req.body.sub3 > 35) {
            temp = temp + 1;
        }

        if (req.body.sub4 > 35) {
            temp = temp + 1;
        }

        if (req.body.sub5 > 35) {
            temp = temp + 1;
        }

        var result;
        if (temp == 5) {
            result = "Pass";
        } else if (temp == 4 || temp == 3) {
            result = "ATKT";
        } else {
            result = "Fail";
        }

        req.body.name = studata[0].name;
        req.body.std = data[0].std;
        req.body.div = data[0].div;
        req.body.total = total;
        req.body.min = min;
        req.body.max = max;
        req.body.per = per;
        req.body.grade = grade;
        req.body.result = result;
        var data = await resultmodel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: "Result Updated "
        })
    }
    else {
        res.status(200).json({
            status: "Login First"
        })
    }
}

exports.student_log=async(req,res)=>{

    var data = await resultmodel.find({ std: req.body.std, div: req.body.div, roll: req.body.roll });
    if(data.length==1){
        res.status(200).json({
            data:data
        })
    }
    else{
        res.status(200).json({
            status:"No Result Found"
        })
    }

}
