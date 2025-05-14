import os
import json
import google.generativeai as genai
from pdfminer.high_level import extract_text

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyDID353ct6wTjLA_zUXXO9PgC2i3scuEWA" 
genai.configure(api_key=GEMINI_API_KEY)

# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") 
# if GEMINI_API_KEY:
#     genai.configure(api_key=GEMINI_API_KEY)
#     print("Gemini API configured successfully")
# else:
#     print("ERROR: No API key found. Please set the GEMINI_API_KEY environment variable.")

def analyze_resume(filepath):
    """Analyzes the resume text and returns an ATS score and improvement suggestions."""
    try:
        text = extract_text(filepath).strip()
        if not text:
            return None, ["The resume appears to be empty. Ensure the text is selectable."]

       
        prompt = f"""
        You are an ATS (Applicant Tracking System) evaluator.
        Analyze the following resume text and return a JSON object with:
        1. "ats_score": A numerical score (0-100).
        2. "improvement_points": A list of 6 improvements with "title" and "description".
        
        Resume Text:
        {text}
        """
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)

        if not response or not response.text.strip():
            return None, ["Could not process the resume. Try again."]

        raw_response = response.text.strip()
        # print(" Raw AI Response:", raw_response)

        #  Remove ```json and ``` from the response if present
        if raw_response.startswith("```json"):
            raw_response = raw_response[7:]  # Remove "```json"
        if raw_response.endswith("```"):
            raw_response = raw_response[:-3]  # Remove trailing "```"

        #  Parse AI JSON response safely
        try:
            parsed_response = json.loads(raw_response)
            ats_score = parsed_response.get("ats_score")
            improvement_points = parsed_response.get("improvement_points", [])

            if ats_score is None or not isinstance(improvement_points, list):
                return None, ["Invalid response from AI. Try re-uploading resume."]
            
            return ats_score, improvement_points

        except json.JSONDecodeError as e:
            print(f"JSON Parsing Error: {str(e)}")
            return None, ["Error parsing AI response. Please try again."]

    except Exception as e:
        print(f"ERROR in analyze_resume: {str(e)}")
        return None, [f"Backend error: {str(e)}"]