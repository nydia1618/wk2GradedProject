import mongoose from "mongoose";
import User from "./models/User.js";
import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import dotenv from "dotenv";

async function query1() {
  const user1 = await User
      .create({
        name: "Robin",
        email: "robin@example.com",
        password: "hashed_password_7",
        createdAt: "2025-06-25T10:15:00Z"
      });
      console.log(user1);
}

async function query2() {
  const user2 = await User 
      .findOne({email: "alice@example.com"});
  
  if(!user2){
    console.log("user with email: alice@example not found");
    return;
  } 
     console.log(user2);
}

async function query3() {
  const question3 = await Question
      .findOne({title: "How can I improve the performance of a react app?"});
   if(!question3)
    {console.log("There is no question with the title: How can I improve the performance of a react app?");
    return;  
    }
    console.log(question3);
}

async function query4() {
const question4 = await Question
      .find({tags:"javascript"});
        if(question4.length===0){
            console.log("There are no questions with tag: javascript");
            return;
        }
    console.log(question4);

}

async function query5() {
  const question5 = await Question  
      .find({createdAt: {$gt:"2023-04-01T00:00:00Z"}});
    if(question5.length===0)
    {
      console.log("There are no questions posted after april 1 2023");
      return;
    }
    console.log(question5);
  }

async function query6() {
  const question6 = await Question
    .find({tags:{$in: ["javascript", "react"]}});
    console.log(question6);
}

async function query7() {
  const question7 = await Question  
    .find({});
  const allTags = question7.flatMap(i => i.tags);
  const distinctTagArray = [...new Set(allTags)];
  console.log(distinctTagArray);
    
}

async function query8() {
  const question8 = await Question
      .find({ views: {$gte: 50}});
      console.log(question8);
}

async function query9() {
const answer9 = await Answer
      .find({voteCount:{$eq:0}});
      console.log(answer9);
}

async function query10() {
 const answer10 = await Answer
    .find({voteCount:{$gt:0}});
    console.log(answer10);
}

async function query11() {
  const user11 = await User
      .find({createdAt:{$gte:'2023-01-01T00:00:00Z', $lt:'2023-05-01T00:00:00Z'}});
      console.log(user11);
    }

async function query12() {
  const question12 = await Question
      .find({title: "How do I set up routing with react router v6?"});
      if (question12.length === 0) {
        console.log("There is no answer to that question");
        return;
      }
      console.log(`There are ${question12.length} answers to that question.`)
    for (const item of question12) {
      const answers12 = await Answer
          .find({questionId: item._id})
          .populate( 'author','name');
      for (const answer of answers12) {
        console.log(`this is one answer:" ${answer.answerText} ", and this is the userid "${answer.author}"`  );
      }
    }

}
async function query13() {
  const distinctAnswerAuthors = await Answer
      .distinct("author");
  //give me all the users that are not inside the complete list of users
  const notPostedUsers = await User
      .find({_id:{$nin:distinctAnswerAuthors}});
  console.log(notPostedUsers);

}

async function query14() {
  const topquestions = await Question
      .find({})
      .sort({voteCount: -1});
  console.log(topquestions[0]);
  console.log(topquestions[1]);

}

async function query15() {
  const distinctAnswerAuthors = await Answer
      .distinct("author");
  for (const author of distinctAnswerAuthors) {
    const authorCount = await Answer
        .find({author: author});
    console.log(`This user ${author} posted: ${authorCount.length} answers`);
  }
}
async function query16() {

const result = await Answer
    .aggregate([
      {
        $group:{
          _id: "$author",
          answerCount: { $sum: 1}
        }
      },
      {
        $sort: { answerCount: -1}
      },
      {
        $limit: 2
      }
    ]);
  result.forEach (user =>
        {
          console.log(`This user ${user._id} posted: ${user.answerCount} answers`);
        });

}

async function query17() {
  const question = await Question.findOneAndUpdate(
          {title: "Why is my async function returning a promise instead of the actual value?"},
                {$set: {tags: ["javascript", "async"]}},
                { new: true, }

);
console.log(question);

}

async function query18() {
  const userUpdate = await User
      .findOneAndUpdate (
          { email: "alice@example.com"},
          {$set: {name: "Alice Smith"}},
                {new: true}
      );
        console.log(userUpdate);
}

async function query19() {
  const userDelete = await User
      .findOneAndDelete(
        { email: "jhonny@example.com"}
      );
  console.log(userDelete);
}

async function query20() {
  const user = await User
      .findOne({email:"alice@example.com"});
  if (!user) {
      console.log("There is no user with that email");
      return;
  }
    const deletedAnswersFromUser = await Answer
        .deleteMany ({author: user._id});
    console.log(`Deleted ${deletedAnswersFromUser.deletedCount} answers from user: ${user.email}`);
}

async function runQueries() {
  printHeader(
    1,
    "Create a user with name Robin, email robin@example.com, password hashed_password_7, and createdAt set to 2025-06-25T10:15:00Z",
  );
  await query1();
  printHeader(2, "Fetch the user with email alice@example.com");
  await query2();
  printHeader(
    3,
    'Fetch question with the title "How can I improve the performance of a react app?"',
  );
  await query3();
  printHeader(4, 'Find all questions tagged with "javascript"');
  await query4();
  printHeader(5, "Retrieve all questions posted after April 1, 2023");
  await query5();
  printHeader(6, "Find all questions tagged with javascript or react");
  await query6();
  printHeader(7, "Find all the distinct tags used in questions");
  await query7();
  printHeader(8, "Retrieve all questions with at least 50 views");
  await query8();
  printHeader(9, "List all answers with a vote count of 0");
  await query9();
  printHeader(10, "Retrieve all answers with a voteCount greater than 0");
  await query10();
  printHeader(
    11,
    "Retrieve all users whose account was created between January 1, 2023 (inclusive) and May 1, 2023 (exclusive)",
  );
  await query11();
  printHeader(
    12,
    'Fetch the answer text and author id of all answers for the question "How do I set up routing with react router v6?"',
  );
  await query12();
  printHeader(13, "Find all users who have not posted any answers");
  await query13();
  printHeader(14, "Find the top two most upvoted questions");
  await query14();
  printHeader(
    15,
    "Retrieve the ids of all users who have posted answers, along with the number of answers they have posted",
  );
  await query15();
  printHeader(16, "Identify the top two users who posted the most answers");
  await query16();
  printHeader(
    17,
    "Update the tags of the question 'Why is my async function returning a promise instead of the actual value?' to ['javascript', 'async']",
  );
  await query17();
  printHeader(
    18,
    "Update the name of the user with email 'alice@example.com' to 'Alice Smith'",
  );
  await query18();
  printHeader(19, "Delete the user with email 'jhonny@example.com'");
  await query19();
  printHeader(
    20,
    "Delete all answers of the user with email 'alice@example.com'",
  );
  await query20();
}

const printHeader = (num, title) => {
  console.log("\n" + "─".repeat(60));
  console.log(`Q${num}. ${title}`);
  console.log("─".repeat(60));
};

async function main() {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully to database");
    await runQueries();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

main();
