require('express');
require('mysql2');
const uuid = require('uuid')
exports.setApp = function ( app, client )
{
    
//------------------------------------------------------------FUNCTIONS------------------------------------------------------------
    const filter_surveyID = async (req, res, next) => 
    {
        req.body.surveyID = null;
        next()
        return
    }
    const filter_questionID = async (req, res, next) => 
    {
        req.body.questionID = null;
        next()
        return
    }
    const get_user = async (req, res, next) =>
    {
        //IN - userName OR userID
        //returns all user info in res.locals.user AND userID in req.body.userID

        //skip if surveyID is present for get_survey
        if(req.body.surveyID)
        {
            next();
            return;
        }

        //skip if question is present for create_answer (need to get one question)
        if(req.body.questionID)
        {
            next();
            return;
        }

        //error messages
        if(!req.body.userName && !req.body.userID)
        {
            var ret = {error: "ERROR: Empty field(s) in user"} 
            res.status(200).json(ret);
            return
        }

        //query
        var [result] = [];
        if(!req.body.userID)
            [result] = await client.query('SELECT * FROM Users WHERE userName = ?', [req.body.userName]);
        else
            [result] = await client.query('SELECT * FROM Users WHERE userID = ?', [req.body.userID]);

        //validation check
        if(result.length == 0){
            var ret = {error: "ERROR: Username not found"} 
            res.status(200).json(ret);
            return
        }

        //assumes there's only one of each username, returns one made first if multiple
        res.locals.user = result[0];
        req.body.userID = result[0].userID
        next();
        return
    }

    const get_survey = async (req, res, next) =>
    {
        //IN - (title AND userID) OR surveyID
        //returns all survey info in res.locals.survey AND surveyID in req.body.surveyID
        var title = req.body.title;
        var userID = req.body.userID;

        //skip if question is present for create_question
        if(req.body.questionID)
        {
            next();
            return;
        }

        //error messages
        if((!req.body.title || (!req.body.userID && !req.body.userName)) && !req.body.surveyID)
        {
            var ret = {error: "ERROR: Invalid empty field(s) in survey"}
            res.status(200).json(ret);
            return
        }

        //query
        var [result] = [];
        if(!req.body.surveyID)
            [result] = await client.query('SELECT * FROM Surveys WHERE title = ? and creatorID = ?', [title, userID]);
        else
            [result] = await client.query('SELECT * FROM Surveys WHERE surveyID = ?', [req.body.surveyID]);
        

        //validation check
        if(result.length == 0){
            var ret = {error: "ERROR: Invalid survey provided"} 
            res.status(200).json(ret);
            return
        }
        //assumes there's only one of each survey, returns one made first if multiple
        res.locals.survey = result[0];
        req.body.surveyID = result[0].surveyID;
        next()
        return
    }

    const get_question = async(req, res, next)=>
    {
        //IN - (surveyID AND question) OR questionID
        var question = req.body.question;
        var surveyID = req.body.surveyID;

        //error messages
        if(!req.body.question && !req.body.questionID)
        {
            var ret = {error: "ERROR: Invalid empty field(s) in question"}
            res.status(200).json(ret);
            return
        }

        //query
        var [result] = [];
        if(!req.body.questionID)
            [result] = await client.query('SELECT * FROM Questions WHERE question = ? AND surveyID = ?', [req.body.question, req.body.surveyID]);
        else
            [result] = await client.query('SELECT * FROM Questions WHERE questionID = ?', [req.body.questionID]);

        //validation check
        if(result.length == 0){
            var ret = {error: "ERROR: Question not found"} 
            res.status(200).json(ret);
            return
        }

        //assumes there's only one of each username, returns one made first if multiple
        res.locals.question = result[0];
        req.body.questionID = result[0].questionID
        next();
        return

    }
    
//------------------------------------------------------------USER ENDPOINTS------------------------------------------------------------
//----------GET USER----------
    app.post('/get_user', filter_surveyID, filter_questionID, get_user, async (req, res, next) =>
    {
        var ret = res.locals.user;   
        res.status(200).json(ret);
    });
//----------LOGIN----------
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
        var ret = {userID: result[0].userID, firstName: result[0].firstName, lastName: result[0].lastName, email: result[0].email, username: result[0].username};
        res.status(200).json(ret);
    });

//----------REGISTER----------
    app.post('/register', async (req, res, next) =>
    {
        //IN - firstName, lastName, userName, email, password
        const emailRE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //error messages (field validation)
        if(!req.body.firstName || !req.body.lastName || !req.body.userName || !req.body.email || !req.body.password)
        {
            var ret = {error: "ERROR: Empty field(s)"} 
            res.status(200).json(ret);
            return
        }
        if(!emailRE.test(req.body.email))
        {
            var ret = {error: "ERROR: Invalid email format provided"} 
            res.status(200).json(ret);
            return
        }

        //repeat username and email are enforced by the database

        //query
        var id = uuid.v1();
        var search = [req.body.firstName, req.body.lastName, req.body.userName, req.body.email, id, req.body.password];
        try
        {
            await client.query("INSERT INTO Users (firstName, lastName, userName, email, userID, password)" +
            "VALUES (?, ?, ?, ?, ?, ?);", search);
        }
        catch(e)
        {
            var ret = {error: "ERROR: " + e.sqlMessage} 
            res.status(200).json(ret);
            return
        }

        var ret = {userName: req.body.userName, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, userID: req.body.id};
        res.status(200).json(ret);
    });
//------------------------------------------------------------SURVEY ENDPOINTS------------------------------------------------------------
//----------GET SURVEY----------
    app.post('/get_survey', filter_questionID, get_user, get_survey, async (req, res, next) => {
        //IN - title, userName
        var search = [req.body.surveyID];
        //var serach = [title, userID]
        const [result] = await client.query('SELECT * FROM Questions WHERE surveyID = ?', search);

        //get email list
        var result_email;
        try{
             [result_email] = await client.query("SELECT email FROM Can_access WHERE surveyID = ?", [req.body.surveyID])
        }
        catch(e){
            res.status(200).json({error:"ERROR " + e})
            return;
        }

        //deload emails into array
        let list = [];
        for(let i = 0; i < result_email.length; i++){
            list.push(result_email[i].email)
        }

        var ret = res.locals.survey;
        ret.emailList = list;
        ret.questions = result
        res.status(200).json(ret);
    });
//----------LIST USER SURVEY----------
    //get list of surveys user has created
    app.post('/list_user_survey', filter_questionID, filter_surveyID, get_user, async (req, res, next) => {
        //IN - userName, page (optional = 0), per_page (optional = 10)

        var sql = 'SELECT * FROM Surveys WHERE creatorID = ?';
        //default values
        var page = req.body.page
        if(!page)
            page = 0

        var per_page = req.body.per_page
        if(!per_page)
            per_page = 10

        sql += ' LIMIT ?, ?';

        //query
        var search = [req.body.userID, page * per_page, per_page];
        const [result] = await client.query(sql, search);
        if(result.length === 0){
            var ret = {error: "ERROR: User has no created surveys"} 
            res.status(200).json(ret);
            return
        }

        var ret = {info: result};
        res.status(200).json(ret);
    });
//----------CREATE SURVEY----------
    app.post('/create_survey', filter_questionID, filter_surveyID, get_user, async (req, res, next) =>
    {
        //IN - title, (userID or userName), description (optional), period_start (optional), period_end

        //error messages (field validation)
        if(!req.body.title || !req.body.period_end || !req.body.period_start)
        {
            var ret = {error: "ERROR: Empty field(s)"} 
            res.status(200).json(ret);
            return
        }

        //check for reapeat titles by same user
        var [results] = await client.query("SELECT 1 FROM Surveys WHERE creatorID = ? AND title = ?", [req.body.userID, req.body.title]);
        if(results.length > 0)
        {
            var ret = {error: "ERROR: Repeat survey title"} 
            res.status(200).json(ret);
            return 
        }

        //current datetime in timezone in unix (UTC)
        //var currentTime = (new Date()).getTime() - ((new Date()).getTimezoneOffset() * 60 * 1000)
        var currentTime = (new Date().getTime());

        //default values
        if(!req.body.description)
            req.body.description = 'N/A';
        if(req.body.period_start === 'now')
            req.body.period_start = currentTime

        //check datetime
        req.body.period_end = new Date(req.body.period_end);
        req.body.period_start = new Date(req.body.period_start);

        //convert time to UTC
        var start_utc = new Date(req.body.period_start.toUTCString())
        var end_utc = new Date(req.body.period_end.toUTCString()) 
        console.log(req.body.period_start.toUTCString() + " " + req.body.period_end.toUTCString());

        //correct datetime for timezone
        //req.body.period_end = new Date(req.body.period_end.getTime() - (req.body.period_end.getTimezoneOffset() * 60 * 1000))
        //req.body.period_start = new Date(req.body.period_start.getTime() - (req.body.period_start.getTimezoneOffset() * 60 * 1000))
        var start_int = start_utc.getTime();
        var end_int = end_utc.getTime();
        

        if(isNaN(req.body.period_end))
        {
            var ret = {error: "ERROR: Invalid end date provided"} 
            res.status(200).json(ret);
            return
        }
        if(isNaN(req.body.period_start))
        {
            var ret = {error: "ERROR: Invalid start date provided"} 
            res.status(200).json(ret);
            return
        }
        if(req.body.period_start >= req.body.period_end)
        {
            var ret = {error: "ERROR: Invalid date range provided"} 
            res.status(200).json(ret);
            return
        }
        //check whether active
        console.log(new Date(currentTime));
        var active = 0;
        if(start_int <= currentTime && currentTime <= end_int)
            active = 1;

        //query
        var surveyID = uuid.v1();
        var search = [req.body.title, req.body.userID, req.body.description, req.body.period_start, req.body.period_end, active, surveyID];
        try
        {

            await client.query("INSERT INTO Surveys (title, " +
            "creatorID, description, period_start, period_end, active, surveyID)" +
            "VALUES (?, ?, ?, ?, ?, ?, ?);", search);
            
        }
        catch(e)
        {
            var ret = {error: "ERROR: " + e.sqlMessage} 
            res.status(200).json(ret);
            return
        }

        var ret = {title: req.body.title, userID: req.body.userID, description: req.body.description, period_start: req.body.period_start, 
            period_end: req.body.period_end, active: active, surveyID: surveyID, currentTime: new Date(currentTime)};
        res.status(200).json(ret);
    });
//----------DELETE SURVEY----------
    app.post('/delete_survey', filter_questionID, get_user, get_survey, async (req, res, next) =>{
        //IN - survey
        try{
            await client.query("DELETE FROM Surveys WHERE surveyID = ?", [req.body.surveyID])
        }
        catch(e){
            var ret = {error: "ERROR: " + e} 
            res.status(200).json(ret);
            return
        }
        var ret = {message: "Deletion successful"}
        res.status(200).json(ret);
    });
//----------LIST PARTICIPANT SURVEY----------
    //get list of surveys user is participating in
    app.post('/list_participant_survey', filter_questionID, filter_surveyID, get_user, async (req, res, next) => {
        //IN - userName, page (optional = 0), per_page (optional = 10), active (optional = true)

        //default values
        var page = req.body.page
        if(!page)
            page = 0

        var per_page = req.body.per_page
        if(!per_page)
            per_page = 10
        console.log(req.body.userID);

        const [result_ids] = await client.query('SELECT surveyID FROM Can_access WHERE userID = ? LIMIT ?, ?', [req.body.userID, page * per_page, per_page]);
        console.log(result_ids);
        //error message
        if(result_ids.length === 0){
            var ret = {error: "ERROR: User has no surveys"} 
            res.status(200).json(ret);
            return
        }

        sql = 'SELECT * FROM Surveys WHERE surveyID in (?)'
        var active = req.body.active;
        if(active == null || active === true)
            sql += ' AND active = 1';

        //query
        var surveys = [];
        //unpackage result_ids into surveys
        for(let i = 0; i < result_ids.length; i++)
            surveys.push(result_ids[i].surveyID)
        
        var search = [surveys, page * per_page, per_page];

        const [result] = await client.query(sql, search);
        console.log(result);

        var ret = {info: result};
        res.status(200).json(ret);
    });
//----------LIST PARTICIPANTS----------
    //get list of emails pariticpating in survey
    app.post('/list_participants', filter_questionID, get_user, get_survey, async (req, res, next) => {
        //IN - surveyID OR (title AND userName)
        var result_ids;
        try{
             [result_ids] = await client.query("SELECT email FROM Can_access WHERE surveyID = ?", [req.body.surveyID])
        }
        catch(e){
            res.status(200).json({error:"ERROR " + e})
            return;
        }
        //deload emails into array
        let list = [];
        for(let i = 0; i < result_ids.length; i++){
            list.push(result_ids[i].email)
        }
        var ret = {emailList: list}
        res.status(200).json(ret)
    });
//----------ADD PARTICIPANTS----------
    //get list of surveys user has created
    app.post('/add_participants', filter_questionID, get_user, get_survey, async (req, res, next) => {
        //IN - part_emails, surveyID OR (userID (creator's) and title)

        //query for the participant via their emails (unique)
        //error messages
        if(!Array.isArray(req.body.part_emails))
        {
            var ret = {error: "ERROR: mismatch type, need Array"} 
            res.status(200).json(ret);
            return
        }
        if(req.body.part_emails.length == 0)
        {
            var ret = {error: "ERROR: no emails provided"} 
            res.status(200).json(ret);
            return
        }
        const [check_repeats] = await client.query('SELECT email FROM Can_access WHERE surveyID = ? AND email in (?)', [req.body.surveyID, req.body.part_emails])

        //unload check repeats into array
        var repeats = [];
        for(let i = 0; i < check_repeats.length; i++)
            repeats.push(check_repeats[i].email)
        
        console.log("CR: ", repeats)
        let use_list = req.body.part_emails.filter(x => !repeats.includes(x));
        console.log("UL: ", use_list);

        if(use_list.length == 0)
        {
            var ret = {error: "ERROR: all emails already paritipating"} 
            res.status(200).json(ret);
            return
        }
        //get all users already participating in survey
        //difference of arrays
        //use resulting array
        const [result] = await client.query('SELECT userID, email FROM Users WHERE email in (?)', [use_list]);
        if(result.length == 0){
            var ret = {error: "ERROR: considereed email(s) not registered with system"} 
            res.status(200).json(ret);
            return
        }
        
        let found_emails = [];
        for(let i = 0; i < result.length; i++){
            var part_id = result[i].userID;
            found_emails.push(result[i].email);

            try{
                await client.query("INSERT INTO Can_access (userID, email, surveyID) VALUES (?, ?, ?);", [part_id, result[i].email, req.body.surveyID]) 
            }
            catch(e){
                var ret = {error: "ERROR: " + e}
                res.status(200).json(ret);
                return
            }
        }
        
        //use list is list of people added
        var ret = {part_userID: part_id, part_email: use_list, surveyID: req.body.surveyID, found_emails: found_emails};
        res.status(200).json(ret);
    });

//------------------------------------------------------------QUESTION ENDPOINTS------------------------------------------------------------
//----------GET QUESTION LIST----------
    app.post('/get_question_list', filter_questionID, get_user, get_survey, async (req, res, next) =>
    {
        //IN - title, (userName OR userID) OR surveyID

        //get from get_survey
        var search = [req.body.surveyID];
        const [result] = await client.query('SELECT * FROM Questions WHERE surveyID = ?', search);

        //validation
        if(result.length == 0){
            var ret = {error: "ERROR: No questions in this survey"} 
            res.status(200).json(ret);
            return
        }
        //returns all questions
        var ret = {info: result};
        res.status(200).json(ret);
    });
//----------CREATE QUESTION----------
    app.post('/create_question', filter_questionID, get_user, get_survey, async (req, res, next) => 
    {
        //IN - (userName AND title) OR surveyID, question, type

        //error messages (field validation)
        if(!req.body.question || !req.body.type)
        {
            var ret = {error: "ERROR: Empty field(s)"} 
            res.status(200).json(ret);
            return
        }
        if(req.body.type != 1 && req.body.type != 2)
        {
            var ret = {error: "ERROR: Invalid question type"} 
            res.status(200).json(ret);
            return
        }

        //no matching questions in same survey
        const [question_match] = await client.query("SELECT 1 FROM Questions WHERE surveyID = ? AND question = ?", [req.body.surveyID, req.body.question]);
        if(question_match.length > 0)
        {
            var ret = {error: "ERROR: question already exists in survey"} 
            res.status(200).json(ret);
            return
        }

        //query
        var questionID = uuid.v1();
        var search = [req.body.type, req.body.question, req.body.surveyID, questionID]
        try
        {
            await client.query("INSERT INTO Questions (type, question, surveyID, questionID)" +
            "VALUES (?, ?, ?, ?);", search);
            
        }
        catch(e)
        {
            var ret = {error: "ERROR: " + e.sqlMessage} 
            res.status(200).json(ret);
            return
        }

        var ret = {type: req.body.type, question: req.body.question, surveyID: req.body.surveyID, questionID: questionID};
        res.status(200).json(ret);
    });
//----------GET QUESTION----------
    app.post('/get_question', get_user, get_survey, get_question, async (req, res, next) =>{
        var ret = res.locals.question;   
        res.status(200).json(ret);
    });
//------------------------------------------------------------RESULTS ENDPOINTS------------------------------------------------------------
//----------GET ANSWERS----------
    app.post('/get_answers', get_user, get_survey, get_question, async (req, res, next) =>
    {
        //IN - questionID OR ((title AND username) AND question), page, per_page

        //default values of page and per_page
        var page = req.body.page * req.body.per_page;
        var per_page = req.body.per_page

        if(!page)
            page = 0
        if(!per_page)
            per_page = 10

        //query to get question type
        var search = [req.body.questionID, page, per_page];
        const [result] = await client.query('SELECT * FROM Questions WHERE questionID = ?', search);
        
        //query from the needed answers table
        var type = result[0].type;
        var [result_answers] = [];
        switch(type){
            case 1:
                [result_answers] = await client.query('SELECT * FROM Type1_answers WHERE questionID = ? LIMIT ?, ?', search);
                break;
            case 2:
                [result_answers] = await client.query('SELECT * FROM Type2_answers WHERE questionID = ? LIMIT ?, ?', search);
                break;
            default:
                var ret = {error: "ERROR: Invalid type provided"} 
                res.status(200).json(ret);
                return
        }

        //validation check for answers
        if(result_answers.length == 0){
            var ret = {error: "ERROR: No questions found"} 
            res.status(200).json(ret);
            return
        }

        var ret = {result_answers};
        res.status(200).json(ret);
    });
//----------ANSWER----------
    app.post('/answer', get_user, get_survey, get_question, async (req, res, next) =>
    {
        //IN - questionID OR (question AND survey), takerID or takerName, answer
        var type = res.locals.question.type;
        //error messages (field validation)
        if((!req.body.takerID && typeof req.body.takerName === 'undefined'))
        {
            var ret = {error: "ERROR: Empty field(s)"} 
            res.status(200).json(ret);
            return
        }

        let complete = 1;
        if(typeof req.body.answer === 'undefined'){
            complete = 0;
            req.body.answer = null
        }
            
            
        //get taker's ID from name if applicable
        var takerID = req.body.takerID;
        var [result_name] = [];
        if(!req.body.takerID)
        {
            [result_name] = await client.query('SELECT userID FROM Users WHERE userName = ?', [req.body.takerName]);
            takerID = result_name[0].userID;
        }

        //type 1 or 2 question
        var sql = " ";
        if(type == 1)
            sql = "Type1_answers"
        else if(type == 2)
            sql = "Type2_answers"
        //var query = "SELECT 1 FROM " + sql + " WHERE userID = ?"

        //get surveyID from questionID if doesn't exist
        if(!req.body.surveyID)
        {
            [result_name] = await client.query("SELECT surveyID FROM Questions WHERE questionID = ?", [req.body.questionID]);
            req.body.surveyID = result_name[0].surveyID
        }

        //if user has already answered question, update instead of insert
        [result_name] = await client.query("SELECT 1 FROM " + sql + " WHERE userID = ? AND questionID = ?", [takerID, req.body.questionID]);
        var flag = false;
        if(result_name.length > 0)
        {
            try
            {
                await client.query("UPDATE " + sql + " SET answer = ?, complete = ? WHERE userID = ? AND questionID = ?", [req.body.answer, complete, takerID, req.body.questionID])
            }
            catch(e)
            {
                var ret = {error: "ERROR: " + e} 
                res.status(200).json(ret);
                return  
            }
        }  
        //insert new answer
        else
        {
            var search = [takerID, req.body.surveyID, req.body.questionID, req.body.answer, complete];
            try
            {
                await client.query("INSERT INTO "+ sql +" (userID, surveyID, questionID, answer, complete) VALUES (?, ?, ?, ?, ?);", search);
            }
            catch(e)
            {
                var ret = {error: "ERROR: " + e} 
                res.status(200).json(ret);
                return  
            }  
            flag = true;
        }

        var ret = {userID: takerID, surveyID: req.body.surveyID, questionID: req.body.questionID, answer: req.body.answer, complete: complete, new: flag};
        res.status(200).json(ret);
    });

//----------GET STATS----------
    app.post('/get_stats', async (req, res, next) =>
    {
        //IN - questionID

        //error messages
        if(!req.body.questionID)
        {
            var ret = {error: "ERROR: Invalid question field provided"} 
            res.status(200).json(ret);
            return
        }

        //query the Survey_stats table
        search = [req.body.questionID]
        var [result_stats] = await client.query('SELECT * FROM Survey_stats WHERE questionID = ?', search);

        //for type 2 questions
        if(result_stats.length == 0){
            var ret = {error: "ERROR: No stats found"} 
            res.status(200).json(ret);
            return
        }

        var ret = {info: result_stats[0]};
        res.status(200).json(ret);
    });
    /*
    app.get('/', async (req, res, next) =>
    {
        res.render("hello");
    });'*/

}