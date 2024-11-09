import os
import google.generativeai as genai
from flask import Blueprint, request, jsonify

quiz_bot = Blueprint('quiz_bot', __name__)


# Configure API key for Google Generative AI
api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)

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
  system_instruction="Assist the teacher in conducting quizzes for students. When the teacher requests questions on a specific topic, generate questions based on their requirements. Ask the teacher if he does not provide:\n\nHow many questions they need.\nThe number of multiple-choice questions (MCQs) and subjective questions.\nThe students' grade level.\nThe desired difficulty level.",
)

chat_session = model.start_chat(
  history=[
  ]
)



# Define the quiz generation endpoint
@quiz_bot.route('/', methods=['POST'])
def generate_quiz():
    # Get input from the request JSON body
    data = request.get_json()
    
    user_message = data.get('message')
    # Send message to the Generative AI model
    response = chat_session.send_message(user_message)
    
    # Return the response as JSON
    return response.text