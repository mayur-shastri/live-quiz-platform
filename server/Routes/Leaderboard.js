const express = require('express');
const QuizSession = require('../Models/QuizSession');
const mongoose = require('mongoose');
const User = require('../Models/User');
const Slide = require('../Models/Slide');
const router = express.Router();
const catchAsync = require('../Utilities/catchAsync');

const generateRandomColor = ()=>{
  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i=0; i<6; i++){
    color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}

router.get('/:quiz_session_id/leaderboard', catchAsync(async (req, res) => {
    const { quiz_session_id } = req.params;
    const quizSessionObjectId = new mongoose.Types.ObjectId(quiz_session_id);
  
        const aggregationResult = await QuizSession.aggregate([
          { $match: { _id: quizSessionObjectId } },
          { $unwind: "$responses" },
          { $addFields: {
            "responses.slideId": { $toObjectId: "$responses.slideId" }
          }},
          { $lookup: {
            from: "slides",
            localField: "responses.slideId",
            foreignField: "_id",
            as: "slide"
          }},
          { $unwind: "$slide" },
          { $addFields: {
            "slide.numCorrectOptions": {
              $size: {
                $filter: {
                  input: "$slide.options",
                  as: "option",
                  cond: { $eq: [ "$$option.correct", true ] }
                }
              }
            }
          }},
          { $unwind: "$slide.options" },
          { $addFields: {
            "responses.isCorrect": {
              $switch: {
                branches: [
                  { case: { $and: [ { $eq: [ "$responses.questionType", "Single Correct MCQ" ] }, { $eq: [ "$slide.options.correct", true ] }, { $eq: [ "$slide.options.id", "$responses.optionId" ] } ] }, then: 1 },
                  { case: { $and: [ { $eq: [ "$responses.questionType", "Multiple Correct MCQ" ] }, { $eq: [ "$slide.options.correct", true ] }, { $in: [ "$slide.options.id", "$responses.optionIds" ] } ] }, then: { $divide: [1, "$slide.numCorrectOptions"] } },
                  { case: { $eq: [ "$responses.questionType", "Descriptive Answer" ] }, then: 0 }
                ],
                default: 0
              }
            }
          }},
          { $group: {
            _id: "$responses.userId",
            correctAnswers: { $sum: "$responses.isCorrect" },
          }}
        ]);

        const totalAnswers = await QuizSession.aggregate([
          {$match: {_id: quizSessionObjectId}},
          {$unwind: "$responses"},
          {$group: {
            _id: "$responses.userId",
            totalAnswers: { $sum: 1 }
          }}
        ]);
        
        for(let result of aggregationResult){
          const userId = result._id;
          const user = await User.findById(userId);
          result.username = user.username;
          for(let total of totalAnswers){
            if(total._id === userId){
              result.totalAnswers = total.totalAnswers;
              break;
            }
          }
          const points = result.correctAnswers * 100;
          result.points = points;
          result.accuracy = (result.correctAnswers/result.totalAnswers)*100;
          result.color = generateRandomColor();
        }

        res.send(aggregationResult);
}));

router.get('/:quiz_session_id/:slide_id/results', catchAsync(async (req,res)=>{
        const {quiz_session_id, slide_id} = req.params;
        const quizSessionObjectId = new mongoose.Types.ObjectId(quiz_session_id);
        const slide = await Slide.findById(slide_id);
        let aggregatedResults;
        if(slide.selectedSlideType === "Single Correct MCQ"){
            aggregatedResults = await QuizSession.aggregate([
                {$match: {_id: quizSessionObjectId}},
                {$unwind: "$responses"},
                {$match: {"responses.slideId" : slide_id, "responses.questionType": "Single Correct MCQ"}},
                {$unwind: "$responses.optionId"},
                {
                    $group: {
                        _id: "$responses.optionId",
                        count: {$sum: 1},
                    }
                }
            ]);
        } else if(slide.selectedSlideType === "Multiple Correct MCQ"){
            aggregatedResults = await QuizSession.aggregate([
                {$match: {_id: quizSessionObjectId}},
                {$unwind: "$responses"},
                {$match: {"responses.slideId" : slide_id, "responses.questionType": "Multiple Correct MCQ"}},
                {$unwind: "$responses.optionIds"},
                {
                    $group: {
                        _id: "$responses.optionIds",
                        count: {$sum: 1}
                    }
                }
            ]);
        } else{
            res.send("This question type does not have options.");
            return;
        }
        res.send(aggregatedResults);
}));

module.exports = router;