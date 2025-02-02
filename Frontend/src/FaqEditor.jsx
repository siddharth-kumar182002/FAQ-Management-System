import React, { useState, useEffect } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import { FormatPainter } from 'ckeditor5-premium-features';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';


const KEY=import.meta.env.VITE_KEY
const FaqEditor = () => {
  const [faqs, setFaqs] = useState([]);
  const [langs, setLangs] = useState("en");
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Fetch FAQs from backend
  const fetchFAQs = async () => {
    try {
      const response = await fetch(`/api/faqs/?lang=${langs}`);
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [editingId, langs]);

  // Add New FAQ
  const handleAddFAQ = async () => {
    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_en: newQuestion,
          answer_en: newAnswer,
        }),
      });

      if (response.ok) {
        await fetchFAQs();
        setIsAdding(false);
        setNewQuestion('');
        setNewAnswer('');
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  // Edit existing FAQ
  const handleEdit = (faq) => {
    setEditingId(faq._id);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
  };

  // Update existing FAQ
  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_en: editedQuestion,
          answer_en: editedAnswer,
        }),
      });

      if (response.ok) {
        await fetchFAQs();
        setEditingId(null);
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchFAQs(); // Refresh the FAQs list
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>FAQs Management</h1>
      
      {/* Language Selector */}
      <form onSubmit={(e) => { e.preventDefault(); setLangs(e.target.language.value); }} 
            style={{ marginBottom: '20px' }}>
        <label htmlFor="lang" style={{ marginRight: '10px' }}>Select Language:</label>
        <select 
          name="language" 
          id="lang" 
          defaultValue={langs}
          style={{ padding: '5px', marginRight: '10px' }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
        <button 
          type="submit" 
          style={{ 
            padding: '5px 15px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px'
          }}
        >
          Apply
        </button>
      </form>

      {/* Add New FAQ Button */}
      {!isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          style={{
            marginBottom: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Add New FAQ
        </button>
      )}

      {/* Add New FAQ Form */}
      {isAdding && (
        <div style={{ 
          marginBottom: '30px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px'
        }}>
          <h3>Add New FAQ</h3>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question in English"
            style={{
              width: '100%',
              marginBottom: '15px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <CKEditor
            editor={ClassicEditor}
            config={{
              licenseKey: KEY,
              plugins: [Essentials, Paragraph, Bold, Italic],
              toolbar: ['undo', 'redo', '|', 'bold', 'italic']
            }}
            data={newAnswer}
            onChange={(event, editor) => setNewAnswer(editor.getData())}
          />
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={handleAddFAQ}
              style={{
                marginRight: '10px',
                padding: '8px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Save
            </button>
            <button 
              onClick={() => setIsAdding(false)}
              style={{
                padding: '8px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FAQs List */}
      {faqs.map((faq) => (
        <div 
          key={faq._id} 
          style={{ 
            marginBottom: '20px', 
            padding: '20px', 
            border: '1px solid #eee', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}
        >
          {editingId === faq._id ? (
            <div>
              <input
                type="text"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
                style={{
                  width: '100%',
                  marginBottom: '15px',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
              <CKEditor
                editor={ClassicEditor}
                config={{
                  licenseKey: KEY,
                  plugins: [Essentials, Paragraph, Bold, Italic],
                  toolbar: ['undo', 'redo', '|', 'bold', 'italic']
                }}
                data={editedAnswer}
                onChange={(event, editor) => setEditedAnswer(editor.getData())}
              />
              <div style={{ marginTop: '15px' }}>
                <button 
                  onClick={() => handleSave(faq._id)}
                  style={{
                    marginRight: '10px',
                    padding: '8px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Save
                </button>
                <button 
                  onClick={() => setEditingId(null)}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: '10px', color: '#333' }}>{faq.question}</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: faq.answer }} 
                style={{ lineHeight: '1.6', color: '#666' }}
              />
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => handleEdit(faq)}
                  style={{
                    marginRight: '10px',
                    padding: '6px 15px',
                    backgroundColor: '#ffc107',
                    color: '#333',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(faq._id)}
                  style={{
                    padding: '6px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqEditor;