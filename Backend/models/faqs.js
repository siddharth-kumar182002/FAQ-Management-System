import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
    enum: ['hi', 'bn'], // Add other languages as needed
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const faqSchema = new mongoose.Schema({
  question_en: {
    type: String,
    required: true,
  },
  answer_en: {
    type: String,
    required: true,
  },
  translations: [translationSchema], // Array of translations
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;