/*
    In present mode, allow creator to enable and disable broadcast of a question while presenting, 
    and set a timer for the question during the presentation. Once the timer runs out, the broadcast of question
    is disabled and the presenter can move on to the next question. The presenter can also disable the timer.
    The presenter can also disable the broadcast of the question before the timer runs out. 

    When the presenter arrives at a question slide, the broadcast of the question is disabled by default.
*/

/*
    Basic Steps:
    1) Create websocket connection
    2) Create room -> A room is created when the presenter clicks on the "Present" button on the "Edit Quiz" page.
    3) Join room -> A participant joins the room when they click on the "Join" button on the "Join Quiz" page using the room code.
    4) Present logic
    5) logic to broadcast the state of the quiz to the participants

    Thoughts:
    1)Room code doesn't need to be reset after the quiz ends. Each quiz can have an isPresenting flag.
    2)The presenter can end the quiz at any point. The quiz can also end automatically when the last question is reached.
    
    Things to consider:
    1) What model to use? Server Authoritative or Client Authoritative or Hybrid?
    2) What data to send to the participants?
    3) Should the participants and presenter be distinguished using just a role property?
       This could introduce risks if the role property is manipulated by the client to gain
       presenter privileges.
       What other ways are there to distinguish between the presenter and the participants?
    
       4) How will the client make requests to the ws server? 
       1) Native WebsocketAPI built into browser?
       2) Axios requests to the ws server?
       3) Axios requests to the express server which then makes requests to the ws server?
       4) a ws server made using socket.io and client sends requests using socket.io-client?
       5) if the server is made using websocket library, then what are the options for the client?

       Ans: Use Native WebsocketAPI built into browser and websocket library for the server with express-ws.
*/