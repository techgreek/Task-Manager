const fetchschedule = (req, res, next) => {
    //Get the user the from  jwt token and add id to req object
    // const schedule = req.header('schedule');
    
    try {
        
          const d1=new Date();
          let i;
              
          d1.setDate(d1.getDate() + 7)
          // console.log(d1.toDateString())
      req.schedule = d1.toDateString() ;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using correct token" })
    }
   
  }
  
  module.exports = fetchschedule;