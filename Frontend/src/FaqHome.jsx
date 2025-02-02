import React, { useState, useEffect } from 'react';

const FaqHome = () => {
  const [faqs, setFaqs] = useState([]);
  const [langs, setLangs] = useState("en");

  // Fetch FAQs from the backend
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`https://faq-management-system-backend.onrender.com/api/faqs/?lang=${langs}`);
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFAQs();
  }, [langs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedLang = e.target.language.value;
    setLangs(selectedLang);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>FAQs</h1>
      
      {/* Language Selector */}
      <form onSubmit={handleSubmit} style={styles.languageForm}>
        <label htmlFor="lang" style={styles.languageLabel}>Choose Language:</label>
        <select 
          name="language" 
          id="lang" 
          style={styles.languageSelect}
          defaultValue={langs}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
        <button 
          type="submit" 
          style={styles.languageButton}
        >
          Apply
        </button>
      </form>

      {/* FAQs List */}
      <div style={styles.faqsContainer}>
        {faqs.map((faq, i) => (
          <div key={i} style={styles.faqCard}>
            <h3 style={styles.faqQuestion}>{faq.question}</h3>
            <div 
              style={styles.faqAnswer}
              dangerouslySetInnerHTML={{ __html: faq.answer }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '30px',
    fontWeight: '600'
  },
  languageForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
    gap: '10px'
  },
  languageLabel: {
    fontSize: '1.1rem',
    color: '#34495e',
    fontWeight: '500'
  },
  languageSelect: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
    fontSize: '1rem',
    width: '150px'
  },
  languageButton: {
    padding: '8px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  faqsContainer: {
    marginTop: '20px'
  },
  faqCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '25px',
    marginBottom: '20px',
    transition: 'transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)'
    }
  },
  faqQuestion: {
    color: '#2c3e50',
    fontSize: '1.4rem',
    marginBottom: '15px',
    fontWeight: '600'
  },
  faqAnswer: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    },
    '& ul, & ol': {
      paddingLeft: '20px'
    },
    '& a': {
      color: '#3498db',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline'
      }
    }
  }
};

export default FaqHome;