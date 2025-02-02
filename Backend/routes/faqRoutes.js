import express from 'express';
import FAQ  from '../models/faqs.js';
import { translateText } from '../utils/translate.js';

const router = express.Router();


// GET FAQs (with language support)
router.get('/', async (req, res) => {
  try {
    const { lang } = req.query;
   
    const faqs = await FAQ.find();

    const response = faqs.map(faq => {
     
      if (lang && lang != "en") {
        const translation = faq.translations.find(t => t.lang === lang);
        if(translation?.question){
          return {
            _id:faq.id,
            question: translation?.question,
            answer: translation?.answer,
          };
        } else {
          return{
            "Error":"Select Another Language"
          }
        }
      }
    
   
     return { _id:faq.id,question: faq.question_en, answer: faq.answer_en };
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

});

// POST a new FAQ (auto-translate)
router.post('/', async (req, res) => {
  const { question_en, answer_en } = req.body;

  try {
    
     const translations = [];
     const TARGET_LANGS=['hi','bn'];
    for (const lang of TARGET_LANGS) {
      const [question, answer] = await Promise.all([
        translateText(question_en, lang),
        translateText(answer_en, lang),
      ]);
       
      if (question && answer) {
        translations.push({ lang, question, answer });
      }
    }
   

   
    const newFAQ = new FAQ({ question_en, answer_en, translations });
    await newFAQ.save();

    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create FAQ' });
  }

});

// // PUT (Update an FAQ)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question_en, answer_en } = req.body;

  try {
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    faq.question_en = question_en || faq.question_en;
    faq.answer_en = answer_en || faq.answer_en;

  
    if (question_en || answer_en) {
      const languages = ['hi', 'bn'];
      faq.translations = [];

      for (const lang of languages) {
        const questionTranslated = await translateText(question_en || faq.question_en, lang);
        const answerTranslated = await translateText(answer_en || faq.answer_en, lang);

        faq.translations.push({
          lang,
          question: questionTranslated,
          answer: answerTranslated,
        });
      }
    }

    await faq.save();
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE an FAQ
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;