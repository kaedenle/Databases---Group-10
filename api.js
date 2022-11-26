require('express');
require('mysql2');
exports.setApp = function ( app, client )
{
//------------------------------------------------------------FUNCTIONS------------------------------------------------------------
    const get_user = async (req, res, next) =>
    {
        //IN - userName

        //error messages
        if(!req.body.userName)
        {
            var ret = {error: "ERROR: Invalid userName field"} 
            res.status(200).json(ret);
            return
        }

        //query
        var search = [req.body.userName];
        const [result] = await client.query('SELECT * FROM Users WHERE userName = ?', search);

        //validation check
        if(result.length == 0){
            var ret = {error: "ERROR: Username not found"} 
            res.status(200).json(ret);
            return
        }

        //assumes there's only one of each username, returns one made first if multiple
        res.locals.user = {info: result[0]};
        req.body.userID = result[0].userID
        next();
        return
    }

    const get_survey = async (req, res, next) =>
    {
        //IN - Title, userID
        var title = req.body.title;
        var userID = req.body.userID;

        //error messages
        if(!req.body.title)
        {
            var ret = {error: "ERROR: Invalid survey field provided"} 
            res.status(200).json(ret);
            return
        }
        if(!req.body.userID)
        {
            var ret = {error: "ERROR: Invalid userID field provided"} 
            res.status(200).json(ret);
            return
        }

        //query
        var search = [title, userID];
        const [result] = await client.query('SELECT * FROM Surveys WHERE title = ? and creatorID = ?', search);

        //validation check
        if(result.length == 0){
            var ret = {error: "ERROR: Invalid survey provided"} 
            res.status(200).json(ret);
            return
        }
        //assumes there's only one of each survey, returns one made first if multiple
        res.locals.survey = {info: result[0]};
        req.body.surveyID = result[0].surveyID;
        next()
        return
    }
//------------------------------------------------------------USER ENDPOINTS------------------------------------------------------------
    app.post('/get_user', get_user, async (req, res, next) =>
    {
        var ret = res.locals.user;   
        res.status(200).json(ret);
    });

    app.post('/login', async (req, res, next) =>
    {
        //IN - userName, password

        //error messages
        if(!req.body.userName)
        {
            var ret = {error: "ERROR: Invalid userName field provided"} 
            res.status(200).json(ret);
            return
        }
        if(!req.body.password)
        {
            var ret = {error: "ERROR: Invalid password field provided"} 
            res.status(200).json(ret);
            return
        }

        //query
        var search = [req.body.userName, req.body.password];
        const [result] = await client.query('SELECT * FROM Users WHERE userName = ? AND password = ?', search);
        if(result.length == 0){
            //err = "ERROR: Invalid credentials"
            var ret = {error: "ERROR: Invalid credentials"} 
            res.status(200).json(ret);
            return
        }

        //assumes there's only one of each username, returns one made first if multiple
        var ret = {userID: result[0].userID};
        res.status(200).json(ret);
    });
//------------------------------------------------------------SURVEY ENDPOINTS------------------------------------------------------------
    app.post('/get_survey', get_user, get_survey, async (req, res, next) => {
        //IN - title, userName
        var search = [req.body.surveyID];
        //var serach = [title, userID]
        const [result] = await client.query('SELECT * FROM Questions WHERE surveyID = ?', search);

        var ret = res.locals.survey;
        ret.questions = result
        res.status(200).json(ret);
    });

//------------------------------------------------------------QUESTION ENDPOINTS------------------------------------------------------------
    /*app.post('/get_question', async (req, res, next) =>
    {
        //IN - questionID
        var id = "";

        if(String(req.body.questionID))
            id = req.body.questIONID

        var search = [id];
        const [result] = await client.query('SELECT * FROM Questions WHERE questionID = ?', search);
        if(result.length == 0){
            var ret = {error: "ERROR: Invalid id provided"} 
            res.status(200).json(ret);
            return
        }
        //assumes there's only one of each question, returns one made first if multiple
        var ret = {info: result[0]};
        res.status(200).json(ret);
    });*/

    app.post('/get_question_list', get_user, get_survey, async (req, res, next) =>
    {
        //IN - title, useName

        //get from get_survey
        var search = [req.body.surveyID];
        //var serach = [title, userID]
        const [result] = await client.query('SELECT * FROM Questions WHERE surveyID = ?', search);
        //const [result] = await client.query('SELECT * FROM Surveys WHERE title = ? AND userID = ?', search);
        /*if(result.length == 0){
            var ret = {error: "ERROR: No questions in this survey"} 
            res.status(200).json(ret);
            return
        }*/
        //returns all questions
        var ret = {info: result};
        res.status(200).json(ret);
    });
//------------------------------------------------------------RESULTS ENDPOINTS------------------------------------------------------------
    app.post('/get_results', async (req, res, next) =>
    {
        //IN - questionID

        //error messages
        if(!req.body.questionID)
        {
            var ret = {error: "ERROR: Invalid survey field provided"} 
            res.status(200).json(ret);
            return
        }

        //query
        var search = [req.body.questionID];
        const [result] = await client.query('SELECT * FROM Questions WHERE questionID = ?', search);
        
        //get table needed from type
        var type = result[0].type;
        var type_str = "";
        switch(type){
            case 1:
                type_str = "Type1_answers"
                break;
            case 2:
                type_str = "Type2_answers"
                break;
            default:
                var ret = {error: "ERROR: Invalid type provided"} 
                res.status(200).json(ret);
                return
        }

        //query the answer table
        search = [req.body.questionID]
        const [result_] = await client.query('SELECT * FROM ' + type_str + ' WHERE questionID = ?', search);

        //validation check
        if(result_.length == 0){
            var ret = {error: "ERROR: No questions found"} 
            res.status(200).json(ret);
            return
        }

        var ret = {info: result_[0]};
        res.status(200).json(ret);
    });
    /*
    app.get('/', async (req, res, next) =>
    {
        res.render("hello");
    });'*/

}