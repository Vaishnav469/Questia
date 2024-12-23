import os
import google.generativeai as genai
from flask import Blueprint, request, jsonify
import json

quiz_bot = Blueprint('quiz_bot', __name__)

API_KEY = os.environ.get('GEMINI_API_KEY')

# Configure API key for Google Generative AI
genai.configure(api_key=API_KEY)

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  system_instruction="""
  Assist the teacher in conducting quizzes for students. When the teacher requests questions on a specific topic, generate questions based on their requirements. Ask the teacher if he does not provide:
  - How many questions they need.
  - The number of multiple-choice questions (MCQs) and subjective questions.
  - The students' grade level.
  - The desired difficulty level.
  Return the questions in a JSON format, with each question having a 'question' key, 'options' key (for mcqs),'answer' key (for mcqs) where the answer should be the same string as the option, 'type' key where the value is either 'mcq' or 'subjective', 'grade' key, 'difficulty' key and 'topic' key. For mcqs, provide the options as a list of strings under the 'options' key.
  
  Additionally, provide constructive feedback for students' answers. When given a JSON file with a list of questions, correct answers (if applicable), and students' answers, analyze each question and provide feedback. For correct answers, explain why the answer is correct. For incorrect answers, offer constructive feedback on where the student went wrong and how to improve. For subjective questions, analyze the student's response and provide feedback accordingly.
  
  Return the feedback in the same JSON format, adding a 'feedback' field to each question. DO NOT FORGET TO COMPLETE THE JSON FORMAT INCLUDING } AND ] IN THE END OTHERWISE THE SYSTEM FAILS.
  """,
)

chat_session = model.start_chat(
  history=[
  ]
)



# Define the quiz generation endpoint
@quiz_bot.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    # Get input from the request JSON body
    data = request.get_json()
    
    user_message = data.get('message')
    # Send message to the Generative AI model
    response = chat_session.send_message(user_message)
    
    # Return the response as JSON
    return jsonify({'response': response.text})

@quiz_bot.route('/provide_feedback', methods=['POST']) 
def provide_feedback(): 
  data = request.get_json() 
  questions = data.get('questions') 

  feedback_message = f""" 
  Here is a JSON file containing quiz questions, correct answers (if applicable), and students' answers. For each question, analyze the student's response and provide feedback, adding a 'feedback' key to each question. 
  
  {questions} 
  """

  response = chat_session.send_message(feedback_message)
  updated_questions_json = response.text
  print(updated_questions_json)

  try: 
    updated_questions = json.loads(updated_questions_json) 
  except json.JSONDecodeError: 
    return jsonify({'error': 'Invalid JSON response from AI'}), 500

  return jsonify({'questions': updated_questions})
