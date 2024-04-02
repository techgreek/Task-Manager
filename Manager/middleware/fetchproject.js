const fetchproject = (req, res, next) => {
    //Get the user the from  jwt token and add id to req object
    const projectId = req.header('projectId');
    if (!projectId) {
      res.status(401).send({ error: "Please authenticate using correct ProjectId" });
    }
    try {
      
      req.project = projectId ;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using correct token" })
    }
   
  }
  
  module.exports = fetchproject;