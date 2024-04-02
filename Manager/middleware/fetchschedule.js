const fetchschedule = (req, res, next) => {
    //Get the user the from  jwt token and add id to req object
    const schedule = req.header('schedule');
    
    try {
        if (!schedule) {
            res.send("no due date");
          }
      
      req.schedule = schedule ;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using correct token" })
    }
   
  }
  
  module.exports = fetchschedule;